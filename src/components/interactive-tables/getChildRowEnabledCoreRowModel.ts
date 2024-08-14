import {
    RowData,
    Table,
    Row,
    createRow,
    createCell,
    memo,
    getMemoOptions,
    CoreRow,
    RowModel,
    useReactTable, TableOptions, flexRender, getSortedRowModel, getPaginationRowModel, getFilteredRowModel
} from "@tanstack/react-table";
import {DeepKeysMaxDepth, DeepKeysOfObjectArrayTypes, TypeByPath, TypeOrArrayType} from "./SplitSystemCombinationSearchTable";
import {flattenBy} from "@tanstack/table-core/src/utils";
import {Cell} from "@tanstack/table-core/src/types";
import {getAllByPath, getByPath} from "../../helpers/getByPath";
import {Tab} from "react-bootstrap";
import * as React from "react";
import {Renderable} from "@tanstack/react-table/src";

export type ChildRowKeys<TData> = Extract<
    DeepKeysMaxDepth<TData>,
    DeepKeysOfObjectArrayTypes<TData>
> & string;

export type ChildRowType<TData> = TypeOrArrayType<
    TypeByPath<TData, ChildRowKeys<TData>>
>;

export interface ChildRowEnabledRow<TData> extends Row<TData>, ChildRowEnabledCoreRow<TData> {}

export interface ChildRowEnabledRowModel<TData> {
    rows: ChildRowEnabledRow<TData>[];
    flatRows: ChildRowEnabledRow<TData>[];
    rowsById: Record<string, ChildRowEnabledRow<TData>>;
}

export interface ChildRowEnabledCoreRow<TData extends RowData> extends CoreRow<TData> {
    childRows: ChildRowEnabledRow<ChildRowType<TData>>[];
    originalChildRows: ChildRowType<TData>[];
    parentObjectId?: string;
    getParentObjectRow: () => ChildRowEnabledRow<TData> | undefined;
    getParentObjectRows: () => ChildRowEnabledRow<TData>[];
    childDepth: number;
    totalChildRows: number;
    getLeafChildRows: () => ChildRowEnabledRow<TData>[];
    rootChildPath?: ChildRowKeys<TData>;
}

export type ChildRowEnabledTableTypes<TData extends RowData> = TData | ChildRowType<TData>;

// export const createChildRowEnabledRow = <TableType extends RowData, RowType extends RowData>(
//     table: Table<TableType | ChildRowType<TableType>>,
//     id: string,
//     original: RowType,
//     rowIndex: number,
//     depth: number,
//     subRows?: Row<RowType>[],
//     parentId?: string
// ): ChildRowEnabledRow<RowType> => {
//     let row: ChildRowEnabledCoreRow<RowType> = {
//         id,
//         index: rowIndex,
//         original,
//         depth,
//         parentId,
//         _valuesCache: {},
//         _uniqueValuesCache: {},
//         getValue: columnId => {
//             if (row._valuesCache.hasOwnProperty(columnId)) {
//                 return row._valuesCache[columnId]
//             }
//
//             const column = table.getColumn(columnId)
//
//             if (!column?.accessorFn) {
//                 return undefined
//             }
//
//             row._valuesCache[columnId] = column.accessorFn(
//                 row.original as TData,
//                 rowIndex
//             )
//
//             return row._valuesCache[columnId] as any
//         },
//         getUniqueValues: columnId => {
//             if (row._uniqueValuesCache.hasOwnProperty(columnId)) {
//                 return row._uniqueValuesCache[columnId]
//             }
//
//             const column = table.getColumn(columnId)
//
//             if (!column?.accessorFn) {
//                 return undefined
//             }
//
//             if (!column.columnDef.getUniqueValues) {
//                 row._uniqueValuesCache[columnId] = [row.getValue(columnId)]
//                 return row._uniqueValuesCache[columnId]
//             }
//
//             row._uniqueValuesCache[columnId] = column.columnDef.getUniqueValues(
//                 row.original as TData,
//                 rowIndex
//             )
//
//             return row._uniqueValuesCache[columnId] as any
//         },
//         renderValue: columnId =>
//             row.getValue(columnId) ?? table.options.renderFallbackValue,
//         subRows: subRows ?? [],
//         getLeafRows: () => flattenBy(row.subRows, d => d.subRows),
//         getParentRow: () =>
//             row.parentId ? table.getRow(row.parentId, true) : undefined,
//         getParentRows: () => {
//             let parentRows: Row<TData>[] = []
//             let currentRow = row
//             while (true) {
//                 const parentRow = currentRow.getParentRow()
//                 if (!parentRow) break
//                 parentRows.push(parentRow)
//                 currentRow = parentRow
//             }
//             return parentRows.reverse()
//         },
//         getAllCells: memo(
//             () => [table.getAllLeafColumns()],
//             leafColumns => {
//                 return leafColumns.map(column => {
//                     return createCell(table, row as Row<TData>, column, column.id)
//                 })
//             },
//             getMemoOptions(table.options, 'debugRows', 'getAllCells')
//         ),
//
//         _getAllCellsByColumnId: memo(
//             () => [row.getAllCells()],
//             allCells => {
//                 return allCells.reduce(
//                     (acc, cell) => {
//                         acc[cell.column.id] = cell
//                         return acc
//                     },
//                     {} as Record<string, Cell<TData, unknown>>
//                 )
//             },
//             getMemoOptions(table.options, 'debugRows', 'getAllCellsByColumnId')
//         ),
//     }
//
//     for (let i = 0; i < table._features.length; i++) {
//         const feature = table._features[i]
//         feature?.createRow?.(row as ChildRowEnabledRow<RowType> as Row<RowType>, table)
//     }
//
//     return row as ChildRowEnabledCoreRow<RowType>
// }

export function getChildRowEnabledCoreRowModel<TData extends RowData, TableType extends RowData = TData | ChildRowType<TData>>(): (
    table: Table<TableType>
) => () => ChildRowEnabledRowModel<TableType> {
    return table =>
        memo(
            () => [table.options.data],
            (
                data
            ): {
                rows: ChildRowEnabledRow<TableType>[]
                flatRows: ChildRowEnabledRow<TableType>[]
                rowsById: Record<string, ChildRowEnabledRow<TableType>>
            } => {
                const rowModel: ChildRowEnabledRowModel<TableType> = {
                    rows: [],
                    flatRows: [],
                    rowsById: {},
                }

                const childRowPaths = table.getAllFlatColumns()
                    .map(column => column.columnDef.meta?.childRow?.path)
                    .filter(path => path !== undefined)
                    .filter((path, index, array) => array.indexOf(path) === index)
                    .map(path => path as ChildRowKeys<TableType>)
                    .sort((a,b) => a.length - b.length);

                const accessRows = <SpecificRowType extends TableType,>(
                    originalRows: SpecificRowType[],
                    depth = 0,
                    childDepth = 0,
                    parentRow?: ChildRowEnabledRow<TableType>,
                    parentObjectRow?: ChildRowEnabledRow<TableType>,
                    childPaths?: ChildRowKeys<SpecificRowType>[],
                    rootChildPath?: ChildRowKeys<TableType>
                ): ChildRowEnabledRow<TableType>[] => {
                    const rows = [] as ChildRowEnabledRow<TableType>[]
                    const childPath = (childPaths && childPaths.length > 0) ? childPaths[0] : undefined;




                    for (let i = 0; i < originalRows.length; i++) {
                        // i === 0 && console.log(`ChildDepth-${childDepth}`, originalRows[0], childPath, childPaths, childPath?.length, childPaths?.slice(1).map(path => path.substring((childPath || "").length+1)))
                        // Make the row
                        let row = createRow(
                            table, //table: Table<TData>
                            table._getRowId(originalRows[i]!, i, parentRow), //id: string
                            originalRows[i]!, //original: TData
                            i, //rowIndex: number
                            depth, //depth: number
                            undefined, //subRows?: Row<TData>[]
                            parentRow?.id //parentId?: string
                        ) as ChildRowEnabledRow<TableType>;


                        // const originalChildRows: TypeByPath<SpecificRowType, ChildRowKeys<SpecificRowType>> = childPath ? getByPath(originalRows[i], childPath) : ([] as TypeByPath<SpecificRowType, ChildRowKeys<SpecificRowType>>);
                        let originalChildRows = [] as TypeByPath<SpecificRowType, ChildRowKeys<SpecificRowType>>;
                        if(childPath !== undefined)
                            originalChildRows = getByPath(originalRows[i], childPath);

                        if(!Array.isArray(originalChildRows)) {
                            throw new Error("Something has gone wrong. Somehow the type located by childPath is not an array. This error should never throw, but if it does, the typing for childPath must be incorrect.");
                        }

                        /*
                        * NOTE TO MONDAY SETH:
                        *
                        * Hope your weekend went well. You need to implement "childDepth" as an extension of CoreRow.
                        * When you pass on the remaining keys, they will be full because of typing. (one.two.three cant be changed to two.three)
                        * You can use the child depth to pop the leading keys off when getting child rows through originalChildRows
                        * I.e. child depth of 1, pop 1 key off  (one.two.three => two.three)
                        *      child depth of 2, pop 2 keys off (one.two.three => three)
                        *
                        * Do this for the least deep child path (childPaths[0])
                        *
                        * Don't try to type out the combos of keys for children (one.two.three | two.three | three).
                        * I (you) tried that today (Friday) and
                        * it won't work
                        * */

                        const newChildPaths = (childPath && childPaths) ? childPaths.slice(1).map(path => path.substring(childPath.length+1)) : undefined;

                        const childRows = originalChildRows.length > 0 ? accessRows(originalChildRows, 0, childDepth + 1, row, parentRow, newChildPaths, `${rootChildPath ? rootChildPath+"." : ""}${childPath}` as ChildRowKeys<TableType>) as ChildRowEnabledRow<ChildRowType<TableType>>[] : [];

                        // console.log("NEW MODEL", childPath, originalRows[i], childPaths);

                        row = {
                            ...row,
                            childRows,
                            originalChildRows,
                            childDepth,
                            totalChildRows: childRows.length > 0
                                ? childRows.map(childRow => childRow.totalChildRows)
                                    .reduce((p,c) => (p === 0 ? 1 : p)+(c === 0 ? 1 : c))
                                : 0,
                            parentObjectId: parentObjectRow ? parentObjectRow.id : undefined,
                            getParentObjectRow: () => row.parentObjectId ? table.getRow(row.parentObjectId, true) as ChildRowEnabledRow<TableType> : undefined,
                            getParentObjectRows: () => {
                                let parentRows = [];
                                let currentRow = row;
                                while (true) {
                                    const parentObjectRow = currentRow.getParentObjectRow();
                                    if(parentObjectRow === undefined) break;
                                    parentRows.push(parentObjectRow);
                                    currentRow = parentObjectRow;
                                }
                                return parentRows.reverse()
                            },
                            rootChildPath,
                            getLeafChildRows: () => {
                                const getChildRows = (r: ChildRowEnabledRow<TableType>) => {
                                    let childRows = r.childRows;
                                    childRows.forEach(childRow => {
                                        childRows = childRows.concat(getChildRows(childRow as ChildRowEnabledRow<TableType>));
                                    })
                                    return childRows;
                                };
                                return getChildRows(row) as ChildRowEnabledRow<TableType>[];
                            }
                        }

                        row.getVisibleCells = memo(
                            () => [
                                row.getLeftVisibleCells(),
                                row.getCenterVisibleCells(),
                                row.getRightVisibleCells(),
                            ],
                            (left, center, right) => [...left, ...center, ...right].map(cell => ({
                                ...cell,
                                row,
                                getContext: memo(
                                    () => [table, cell.column, row, cell],
                                    (table, column, row, cell) => ({
                                        table,
                                        column,
                                        row,
                                        cell,
                                        getValue: cell.getValue,
                                        renderValue: cell.renderValue,
                                    }),
                                    getMemoOptions(table.options, 'debugCells', 'cell.getContext')
                                )
                            })).filter(cell => cell.column.columnDef.meta?.childRow?.path === rootChildPath),
                            getMemoOptions(table.options, 'debugRows', 'getVisibleCells')
                        );

                        // Keep track of every row in a flat array
                        rowModel.flatRows.push(row)
                        // Also keep track of every row by its ID
                        rowModel.rowsById[row.id] = row
                        // Push table row into parent
                        rows.push(row)

                        // Get the original subrows
                        if (table.options.getSubRows) {
                            row.originalSubRows = table.options.getSubRows(
                                originalRows[i]!,
                                i
                            )

                            // Then recursively access them
                            if (row.originalSubRows?.length) {
                                row.subRows = accessRows(row.originalSubRows, depth + 1, childDepth, parentObjectRow, row)
                            }
                        }
                    }

                    return rows
                }

                rowModel.rows = accessRows(data, 0 , 0, undefined, undefined, childRowPaths)

                return rowModel
            },
            getMemoOptions(table.options, 'debugTable', 'getRowModel', () =>
                table._autoResetPageIndex()
            )
        )
}

export const childEnabledFlexRender = <TProps extends object>(
    Comp: Renderable<TProps> | ((props: TProps) => (React.ReactNode | JSX.Element)[]),
    props: TProps
): React.ReactNode | JSX.Element | (React.ReactNode | JSX.Element)[] => {
    if(typeof Comp === "function" && !isReactComponent<TProps>(Comp)) {
        return Comp(props);
    } else {
        return flexRender(Comp, props);
    }
}

function isReactComponent<TProps>(
    component: unknown
): component is React.ComponentType<TProps> {
    return (
        isClassComponent(component) ||
        isExoticComponent(component)
    )
}

function isClassComponent(component: any) {
    return (
        typeof component === 'function' &&
        (() => {
            const proto = Object.getPrototypeOf(component)
            return proto.prototype && proto.prototype.isReactComponent
        })()
    )
}

function isExoticComponent(component: any) {
    return (
        typeof component === 'object' &&
        typeof component.$$typeof === 'symbol' &&
        ['react.memo', 'react.forward_ref'].includes(component.$$typeof.description)
    )
}

export const useChildRowEnabledReactTable = <TData extends RowData>(options: Omit<TableOptions<TData>, "getCoreRowModel">) => {
    let table = useReactTable({
        ...options,
        getCoreRowModel: getChildRowEnabledCoreRowModel(),
    })
    table.getCoreRowModel = table.getCoreRowModel as () => ChildRowEnabledRowModel<TData>;
    table.getRowModel = table.getRowModel as () => ChildRowEnabledRowModel<TData>;
    return table;
}