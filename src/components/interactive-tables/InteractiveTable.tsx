import React, {CSSProperties, ReactNode} from 'react';
import {
    Cell,
    Column,
    ColumnDef,
    flexRender,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Header
} from "@tanstack/react-table";
import {
    ChildRowEnabledRow,
    useChildRowEnabledReactTable
} from "./getChildRowEnabledCoreRowModel";
import useInteractiveTableSettings from "../../hooks/useInteractiveTableSettings";
import UpArrowIcon from "../icons/UpArrowIcon";
import DownArrowIcon from "../icons/DownArrowIcon";
import MultiTextInput from "../form-elements/MultiTextInput";
import {useSortable} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    type DragEndEvent,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';


type InteractiveTableProps<DataType> = {
    id: string,
    columns: ColumnDef<DataType>[],
    data: DataType[],
};

type MultiTextInputFilterValue = {
    pills: string[],
    inputText: string,
}

const getDisplayName = <TData,>(column: Column<TData>) => {
    if(column.columnDef.meta?.displayName)
        return column.columnDef.meta.displayName;
    if(typeof column.columnDef.header === "string")
        return column.columnDef.header;
    return column.id;
}

type DraggableHeaderProps = {
  header: Header<any, unknown>
};

const DraggableHeader: React.FC<DraggableHeaderProps> = ({ header }) => {
    const { attributes, isDragging, listeners, setNodeRef, transform } =
        useSortable({
            id: header.column.id,
        })

    const style: CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: 'relative',
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition: 'width transform 0.2s ease-in-out',
        whiteSpace: 'nowrap',
        width: header.column.getSize(),
        zIndex: isDragging ? 1 : 0,
    }

    const isBottomMostHeader = header.subHeaders.length === 0;

    return (
        <th colSpan={header.colSpan}
            onClick={() => isBottomMostHeader && header.column.toggleSorting()}
            ref={setNodeRef}
            style={style}
        >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {
                isBottomMostHeader &&
                <>
                    {header.column.getIsSorted() === "desc" && <UpArrowIcon/>}
                    {header.column.getIsSorted() === "asc" && <DownArrowIcon/>}
                    <button {...attributes} {...listeners}>
                        🟰
                    </button>
                </>
            }
        </th>
    )
};

const DragAlongCell = ({cell}: { cell: Cell<any, unknown> }) => {
    const { isDragging, setNodeRef, transform } = useSortable({
        id: cell.column.id,
    })

    const style: CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: 'relative',
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition: 'width transform 0.2s ease-in-out',
        width: cell.column.getSize(),
        zIndex: isDragging ? 1 : 0,
    }

    return (
        <td style={style} ref={setNodeRef}>
            TEST
        </td>
    )
}


const InteractiveTable = <TData, >({id, columns, data}: InteractiveTableProps<TData>): ReactNode => {

    const table = useChildRowEnabledReactTable({
        columns,
        data,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        defaultColumn: {
            filterFn: (row, columnId, filterValue) => {
                filterValue = filterValue as MultiTextInputFilterValue;
                const values = [...filterValue.pills, ...(filterValue.inputText === "" ? [] : [filterValue.inputText])];

                for(let i = 0; i < values.length; i++) {
                    if(!(row.getValue(columnId) as string).includes(values[i])) {
                        return false;
                    }
                }
                return true;
            }
        }
    });

    const [state, updateState] = useInteractiveTableSettings(id, {
        columnOrder: table.getAllLeafColumns().map(c=>c.id)
    });

    table.setOptions(prev => {
        return {
            ...prev,
            state: state,
            onStateChange: newState => {
                updateState("", typeof newState === "function" ? newState(state) : newState)
            },
        };
    });

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    )

    if( JSON.stringify(state) === "{}") return null;

    // reorder columns after drag & drop
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            table.setColumnOrder(columnOrder => {
                const oldIndex = columnOrder.indexOf(active.id as string)
                const newIndex = columnOrder.indexOf(over.id as string)
                return arrayMove(columnOrder, oldIndex, newIndex) //this is just a splice util
            })
        }
    }



    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{'<'}</button>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{'>'}</button>
            {(table.getState().pagination.pageIndex * table.getState().pagination.pageSize) + 1}-{Math.min((table.getState().pagination.pageIndex * table.getState().pagination.pageSize) + 1 + table.getState().pagination.pageSize, table.getRowCount())} of {table.getRowCount()}
            <select
                value={table.getState().pagination.pageSize}
                onChange={e => {
                    table.setPageSize(Number(e.target.value))
                }}
            >
                {["All", 10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize === "All" ? table.getRowCount() : pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
            <ul>
                {table.getAllColumns().map((column) => (
                    <li key={column.id}>
                        {getDisplayName(column)}
                        <ul>
                            {column.columns.map(subColumn => (
                                <li key={subColumn.id}>
                                    <label>
                                        <input type="checkbox" checked={subColumn.getIsVisible()} onChange={_ => subColumn.toggleVisibility()}/>
                                        {getDisplayName(subColumn)}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <table>
                <style>
                    {`
                    table, th, tr, td {
                        border: solid 2px black;
                    }
                `}
                </style>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        <SortableContext
                            items={table.getState().columnOrder}
                            strategy={horizontalListSortingStrategy}
                        >
                            {headerGroup.headers.map(header => (
                                <DraggableHeader header={header} key={header.id} />
                            ))}
                        </SortableContext>
                    </tr>
                ))}
                <tr>
                    {table.getHeaderGroups()[table.getHeaderGroups().length - 1].headers.map(header => (
                        <th key={`filter-${header.id}`}>
                            <MultiTextInput id={header.column.id}
                                            placeholder="Filter..."
                                            defaultPills={header.column.getIsFiltered() ? (header.column.getFilterValue() as MultiTextInputFilterValue).pills : []}
                                            defaultInputText={header.column.getIsFiltered() ? (header.column.getFilterValue() as MultiTextInputFilterValue).inputText : ""}
                                            onValueChange={(pills, inputText) => {
                                                header.column.setFilterValue({
                                                    pills,
                                                    inputText
                                                })
                                            }}
                            />
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {
                    table.getRowModel().rows.map(row => {

                        const getCellRenders = (rowToRender: ChildRowEnabledRow<TData>) => {
                            const parentCells = rowToRender.getVisibleCells().map(cell => (
                                <React.Fragment key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.meta?.childRow?.cell
                                            ? cell.column.columnDef.meta.childRow.cell
                                            : cell.column.columnDef.cell
                                        , cell.getContext()
                                    )}
                                </React.Fragment>
                            ));
                            if (rowToRender.childRows.length === 0)
                                return [parentCells];
                            const childCells: any[][] = rowToRender.childRows.map(childRow => getCellRenders(childRow as ChildRowEnabledRow<TData>)).reduce((p, c) => c.concat(p));
                            const combinedCells = [...childCells];
                            combinedCells[0] = parentCells.concat(childCells[0]);
                            return combinedCells;
                        }

                        const rowRenders = getCellRenders(row as ChildRowEnabledRow<TData>);

                        return (
                            <React.Fragment key={row.id}>
                                {
                                    rowRenders.map((rowRender, rowIndex) => (
                                        <tr key={`${row.id}-${rowIndex}`}>
                                            {rowRender.map((cellRender, cellIndex) => (
                                                <React.Fragment key={`${row.id}-${rowIndex}-${cellIndex}`}>
                                                    {cellRender}
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    ))
                                }

                            </React.Fragment>
                        )
                    })
                }
                </tbody>
            </table>
        </DndContext>
    );
};

export default InteractiveTable;