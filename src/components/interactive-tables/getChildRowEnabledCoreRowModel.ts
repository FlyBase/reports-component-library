import {
    RowData,
    Table,
    Row,
    createRow,
    memo,
    getMemoOptions,
    CoreRow,
    useReactTable,
    TableOptions
} from "@tanstack/react-table";
import {DeepKeysMaxDepth, DeepKeysOfObjectArrayTypes, TypeByPath, TypeOrArrayType} from "../../types";
import {getByPath} from "../../helpers/getByPath";

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
                        // Make the row
                        let row = createRow(
                            table,
                            table._getRowId(originalRows[i]!, i, parentRow),
                            originalRows[i]!,
                            i,
                            depth,
                            undefined,
                            parentRow?.id
                        ) as ChildRowEnabledRow<TableType>;


                        let originalChildRows = [] as TypeByPath<SpecificRowType, ChildRowKeys<SpecificRowType>>;
                        if(childPath !== undefined)
                            originalChildRows = getByPath(originalRows[i], childPath);

                        if(!Array.isArray(originalChildRows)) {
                            throw new Error("Something has gone wrong. Somehow the type located by childPath is not an array. This error should never throw, but if it does, the typing for childPath must be incorrect.");
                        }

                        const newChildPaths = (childPath && childPaths) ? childPaths.slice(1).map(path => path.substring(childPath.length+1)) : undefined;

                        const childRows = originalChildRows.length > 0 ? accessRows(originalChildRows, 0, childDepth + 1, row, parentRow, newChildPaths, `${rootChildPath ? rootChildPath+"." : ""}${childPath}` as ChildRowKeys<TableType>) as ChildRowEnabledRow<ChildRowType<TableType>>[] : [];


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

export const useChildRowEnabledReactTable = <TData extends RowData>(options: Omit<TableOptions<TData>, "getCoreRowModel">) => {
    let table = useReactTable({
        ...options,
        getCoreRowModel: getChildRowEnabledCoreRowModel(),
    })
    table.getCoreRowModel = table.getCoreRowModel as () => ChildRowEnabledRowModel<TData>;
    table.getRowModel = table.getRowModel as () => ChildRowEnabledRowModel<TData>;
    return table;
}