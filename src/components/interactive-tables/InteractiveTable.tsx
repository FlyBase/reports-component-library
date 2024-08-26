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
    useSensors, PointerSensor,
} from '@dnd-kit/core'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import "../../styles/interactiveTable.scss";
import classNames from "classnames";
import UpDownArrowIcon from "../icons/UpDownArrowIcon";
import {tab} from "@testing-library/user-event/dist/tab";
import LeftAngleIcon from "../icons/LeftAngleIcon";
import RightAngleIcon from "../icons/RightAngleIcon";
import CaretDownIcon from "../icons/CaretDownIcon";
import DropdownButton from "../form-elements/DropdownButton";


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

    const table = header.getContext().table;
    const columnOrder = table.getState().columnOrder;
    const prevColId = columnOrder[header.index - 1];
    const nextColId = columnOrder[header.index + 1];


    let showLeftBorder = false;
    let showRightBorder = false;

    if(header.column.parent) {
        if(!prevColId) showLeftBorder = true;
        else {
            const prevCol = prevColId ? table.getColumn(prevColId) : null;
            if(!prevCol) showLeftBorder = false;
            else if(!prevCol.parent) showLeftBorder = false;
            else if(prevCol.parent.id !== header.column.parent.id) showLeftBorder = true;
        }

        if(!nextColId) showRightBorder = true;
        else {
            const nextCol = nextColId ? table.getColumn(nextColId) : null;
            if(!nextCol) showRightBorder = false;
            else if(!nextCol.parent) showRightBorder = false;
            else if(nextCol.parent.id !== header.column.parent.id) showRightBorder = true;
        }
    }




    const isBottomMostHeader = header.subHeaders.length === 0;

    const style: CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: 'relative',
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition: 'width transform 0.2s ease-in-out',
        whiteSpace: 'nowrap',
        cursor: isDragging ? "grabbing" : "pointer",
        zIndex: isDragging ? 1 : 0,
        textAlign: isBottomMostHeader ? "left" : "center",
        ...( showLeftBorder ? { borderLeft: "1px solid rgb(221, 221, 221)"} : ""),
        ...( showRightBorder ? { borderRight: "1px solid rgb(221, 221, 221)"} : ""),
        ...(
            (header.column.columnDef.meta?.align && header.column.columnDef.meta.align !== "center") ? ({
                textAlign: header.column.columnDef.meta.align
            }) : ""
        )
    }



    const indexWithinGroup = header.headerGroup.headers.map(h => h.id).indexOf(header.id);





    return (
        <th colSpan={header.colSpan}
            onClick={() => {
                isBottomMostHeader && header.column.toggleSorting()
            }}
            className={classNames({
                "border-column": indexWithinGroup === 0 || indexWithinGroup === header.headerGroup.headers.length - 1,
            })}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {
                isBottomMostHeader &&
                <>
                    {header.column.getIsSorted() === "desc" && <UpArrowIcon/>}
                    {header.column.getIsSorted() === "asc" && <DownArrowIcon/>}
                    {!header.column.getIsSorted() && <UpDownArrowIcon />}
                </>
            }
        </th>
    )
};

const DragAlongCell = ({cell}: { cell: Cell<any, unknown> }) => {
    const { isDragging, setNodeRef, transform } = useSortable({
        id: cell.column.id,
    })

    const table = cell.getContext().table;
    const columnOrder = table.getState().columnOrder;
    const prevColId = columnOrder[cell.column.getIndex() - 1];
    const nextColId = columnOrder[cell.column.getIndex() + 1];


    let showLeftBorder = false;
    let showRightBorder = false;

    if(cell.column.parent) {
        if(!prevColId) showLeftBorder = true;
        else {
            const prevCol = prevColId ? table.getColumn(prevColId) : null;
            if(!prevCol) showLeftBorder = false;
            else if(!prevCol.parent) showLeftBorder = false;
            else if(prevCol.parent.id !== cell.column.parent.id) showLeftBorder = true;
        }

        if(!nextColId) showRightBorder = true;
        else {
            const nextCol = nextColId ? table.getColumn(nextColId) : null;
            if(!nextCol) showRightBorder = false;
            else if(!nextCol.parent) showRightBorder = false;
            else if(nextCol.parent.id !== cell.column.parent.id) showRightBorder = true;
        }
    }


    const style: CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: 'relative',
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition: 'width transform 0.2s ease-in-out',
        zIndex: isDragging ? 1 : 0,
        textAlign: "left",
        ...( showLeftBorder ? { borderLeft: "1px solid rgb(221, 221, 221)"} : ""),
        ...( showRightBorder ? { borderRight: "1px solid rgb(221, 221, 221)"} : ""),
        ...(
            (cell.column.columnDef.meta?.align && cell.column.columnDef.meta.align !== "center") ? ({
                textAlign: cell.column.columnDef.meta.align
            }) : ""
        ),
        ...( (cell.row as ChildRowEnabledRow<any>).childDepth === 0 ? {
            backgroundColor: "rgb(249, 249, 249)"
        } : ""),
        ...( (cell.row as ChildRowEnabledRow<any>).childDepth === 1 ? {
            backgroundColor: "white"
        } : "")
    }

    return (
        <td style={style} ref={setNodeRef} rowSpan={(cell.row as ChildRowEnabledRow<any>).totalChildRows || 1}>
            {flexRender(
                cell.column.columnDef.meta?.childRow?.cell
                    ? cell.column.columnDef.meta.childRow.cell
                    : cell.column.columnDef.cell
                , cell.getContext()
            )}
        </td>
    )
}

const DragAlongFilterHeader = ({header}: { header: Header<any, unknown> }) => {
    const { isDragging, setNodeRef, transform } = useSortable({
        id: header.column.id,
    })

    const table = header.getContext().table;
    const columnOrder = table.getState().columnOrder;
    const prevColId = columnOrder[header.index - 1];
    const nextColId = columnOrder[header.index + 1];


    let showLeftBorder = false;
    let showRightBorder = false;

    if(header.column.parent) {
        if(!prevColId) showLeftBorder = true;
        else {
            const prevCol = prevColId ? table.getColumn(prevColId) : null;
            if(!prevCol) showLeftBorder = false;
            else if(!prevCol.parent) showLeftBorder = false;
            else if(prevCol.parent.id !== header.column.parent.id) showLeftBorder = true;
        }

        if(!nextColId) showRightBorder = true;
        else {
            const nextCol = nextColId ? table.getColumn(nextColId) : null;
            if(!nextCol) showRightBorder = false;
            else if(!nextCol.parent) showRightBorder = false;
            else if(nextCol.parent.id !== header.column.parent.id) showRightBorder = true;
        }
    }

    const style: CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: 'relative',
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition: 'width transform 0.2s ease-in-out',
        zIndex: isDragging ? 1 : 0,
        ...( showLeftBorder ? { borderLeft: "1px solid rgb(221, 221, 221)"} : ""),
        ...( showRightBorder ? { borderRight: "1px solid rgb(221, 221, 221)"} : "")
    }

    return (
        <th key={`filter-${header.id}`} style={style} ref={setNodeRef}>
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
    )
}

const MAX_PAGE_INDEX_BUTTONS = 3;


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

                for (let i = 0; i < values.length; i++) {
                    if (!(row.getValue(columnId) as string).includes(values[i])) {
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
        useSensor(KeyboardSensor, {}),
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: .5
            }
        })
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

    const currentPageIndex = table.getState().pagination.pageIndex;
    const totalIndexes = Math.min(MAX_PAGE_INDEX_BUTTONS, table.getPageCount());
    const totalIndexesEachSideOfCurrent = (totalIndexes - 1) / 2;
    let minIndex = currentPageIndex - Math.ceil(totalIndexesEachSideOfCurrent);
    let maxIndex = currentPageIndex + Math.floor(totalIndexesEachSideOfCurrent);

    if(minIndex < 0) {
        maxIndex -= minIndex;
        minIndex = 0;
    }

    const maxPageIndex = table.getPageCount() - 1;

    if(maxIndex > maxPageIndex) {
        minIndex = Math.max(minIndex - (maxIndex - maxPageIndex), 0);
        maxIndex = maxPageIndex;
    }

    const pageIndexRadioIndexes = [];
    for(let i = minIndex; i <= maxIndex; i++) {
        pageIndexRadioIndexes.push(i);
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <div className="interactive-table">
                <div className="main-toolbar">
                    <section className="export-show-hide-options">
                        <DropdownButton text="Export">
                            <ul>
                                <li>Hitlist</li>
                                <li>CSV</li>
                                <li>Excel</li>
                            </ul>
                        </DropdownButton>
                        <DropdownButton text="Show/Hide Columns">
                            <ul className="show-hide-list">
                                {table.getAllColumns().map((column) => (
                                    <li key={column.id}>
                                        <label className="parent-column">
                                            <input type="checkbox" checked={column.columns.map(subColumn => subColumn.getIsVisible()).reduce((a,b) => a || b)}
                                                   onChange={e => {
                                                       const checked = e.target.checked;
                                                       table.setColumnVisibility(old => ({
                                                           ...old,
                                                           ...Object.fromEntries(column.columns.map(column => [column.id, checked]))
                                                       }))
                                                   }}/>
                                            {getDisplayName(column)}
                                        </label>
                                        <ul className="child-columns">
                                            {column.columns.map(subColumn => (
                                                <li key={subColumn.id}>
                                                    <label>
                                                        <input type="checkbox" checked={subColumn.getIsVisible()}
                                                               onChange={_ => subColumn.toggleVisibility()}/>
                                                        {getDisplayName(subColumn)}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </DropdownButton>
                        <span className="hidden-columns">Hidden columns: {
                            table.getAllLeafColumns()
                                .filter(column => !column.getIsVisible())
                                .map(column => getDisplayName(column))
                                .join(", ")
                        }</span>
                    </section>
                    <section className="pagination-options">
                        {/*{(table.getState().pagination.pageIndex * table.getState().pagination.pageSize) + 1}-{Math.min((table.getState().pagination.pageIndex * table.getState().pagination.pageSize) + table.getState().pagination.pageSize, table.getRowCount())} of {table.getRowCount()}*/}
                        <ol className="button-bar">
                            {
                                ["Show All", 20, 100].map(pageSize => (
                                    <li key={pageSize}>
                                        <label className="radio-button">
                                            <input type="radio"
                                                   name={`${id}-pageSize-radio`}
                                                   checked={table.getState().pagination.pageSize === (Number(pageSize === "Show All" ? table.getRowCount() : pageSize))}
                                                   onChange={_ => table.setPageSize(Number(pageSize === "Show All" ? table.getRowCount() : pageSize))}
                                            />
                                            {pageSize}
                                        </label>
                                    </li>
                                ))
                            }
                        </ol>
                        <ol className="button-bar">
                            <li>
                                <button onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                >
                                    <LeftAngleIcon/>
                                </button>
                            </li>
                            {
                                pageIndexRadioIndexes.map(pageIndex => (
                                    <li key={pageIndex}>
                                        <label className="radio-button">
                                            <input type="radio"
                                                   name={`${id}-pageIndex-radio`}
                                                   checked={table.getState().pagination.pageIndex === pageIndex}
                                                   onChange={_ => table.setPageIndex(pageIndex)}
                                            />

                                            <span>
                                                {pageIndex + 1}
                                            </span>
                                        </label>
                                    </li>
                                ))
                            }
                            <li>
                                <button onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                >
                                    <RightAngleIcon />
                                </button>
                            </li>
                        </ol>

                        {/*{*/}
                        {/*    pageIndexRadioIndexes.map(pageIndex => (*/}
                        {/*        <label*/}
                        {/*            // onClick={_ => table.setPageIndex(pageIndex)}*/}
                        {/*            key={pageIndex}*/}
                        {/*        >*/}
                        {/*            <input type="radio"*/}
                        {/*                   name={`${id}-pageIndex-radio`}*/}
                        {/*                   checked={table.getState().pagination.pageIndex === pageIndex}*/}
                        {/*                   onChange={_ => table.setPageIndex(pageIndex)}*/}
                        {/*            />*/}

                        {/*            {pageIndex + 1}*/}
                        {/*        </label>*/}
                        {/*    ))*/}
                        {/*}*/}

                        {/*<select*/}
                        {/*    value={table.getState().pagination.pageSize}*/}
                        {/*    onChange={e => {*/}
                        {/*        table.setPageSize(Number(e.target.value))*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    {["All", 10, 20, 30, 40, 50].map(pageSize => (*/}
                        {/*        <option key={pageSize} value={pageSize === "All" ? table.getRowCount() : pageSize}>*/}
                        {/*            Show {pageSize}*/}
                        {/*        </option>*/}
                        {/*    ))}*/}
                        {/*</select>*/}
                    </section>
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="group-header">
                                <SortableContext
                                    items={table.getState().columnOrder}
                                    strategy={horizontalListSortingStrategy}
                                >
                                    {headerGroup.headers.map(header => (
                                        <DraggableHeader header={header} key={header.id}/>
                                    ))}
                                </SortableContext>
                            </tr>
                        ))}
                        <tr>
                            <SortableContext
                                items={table.getState().columnOrder}
                                strategy={horizontalListSortingStrategy}
                            >
                                {table.getHeaderGroups()[table.getHeaderGroups().length - 1].headers.map(header =>
                                    <DragAlongFilterHeader header={header}/>)}
                            </SortableContext>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            table.getRowModel().rows.map(row => {


                                const getSubRows = (rowToRender: ChildRowEnabledRow<TData>) => {

                                    const parentCells = rowToRender.getVisibleCells();

                                    if (rowToRender.childRows.length === 0)
                                        return [parentCells];
                                    const childCells: Cell<TData, unknown>[][] = rowToRender.childRows.map(childRow => getSubRows(childRow as ChildRowEnabledRow<TData>)).reduce((p, c) => p.concat(c));
                                    const combinedCells = [...childCells];
                                    combinedCells[0] = parentCells.concat(childCells[0]);
                                    return combinedCells.map(subRowCells => subRowCells.sort((aCell, bCell) => aCell.column.getIndex() - bCell.column.getIndex()));
                                }

                                const subRowsOfCells = getSubRows(row as ChildRowEnabledRow<TData>);

                                return (
                                    <React.Fragment key={row.id}>
                                        {
                                            subRowsOfCells.map((subRowCells, rowIndex) => (

                                                <tr key={`${row.id}-${rowIndex}`}
                                                    className={classNames({"first-of-group": rowIndex === 0})}>
                                                    <SortableContext
                                                        items={table.getState().columnOrder}
                                                        strategy={horizontalListSortingStrategy}
                                                    >
                                                        {subRowCells.map((cell, cellIndex) => (
                                                                <React.Fragment key={`${row.id}-${rowIndex}-${cellIndex}`}>
                                                                    <SortableContext
                                                                        items={table.getState().columnOrder}
                                                                        strategy={horizontalListSortingStrategy}
                                                                    >
                                                                        <DragAlongCell cell={cell} key={cell.id}/>
                                                                    </SortableContext>
                                                                </React.Fragment>
                                                            ))}
                                                        </SortableContext>
                                                    </tr>

                                            ))
                                        }

                                    </React.Fragment>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </DndContext>
    );
};

export default InteractiveTable;