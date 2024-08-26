import '@tanstack/react-table';
import {CellContext, RowData} from "@tanstack/react-table";
import {DeepKeys} from "@tanstack/table-core/src/utils";
import {
    DeepKeysOfObjectArrayTypes,
    TypeByPath
} from "./components/interactive-tables/SplitSystemCombinationSearchTable";
import {TypeOrArrayType} from "./types";

export type ChildCellContext<ParentType, ChildType> = Omit<CellContext<ParentType>, "row"> & {
    row: Omit<CellContext<ParentType>['row'], "original"> & {
        original: ChildType,
        totalChildRows: number
    }
}


declare module '@tanstack/react-table' {
    interface ColumnMeta<
        TData extends RowData,
        TValue,
        ChildPath extends Extract<DeepKeys<TData>, DeepKeysOfObjectArrayTypes<TData>>,
        ChildType extends RowData = TypeOrArrayType<TypeByPath<TData, ChildPath & string>>
    > {
        childRow?: {
            path: ChildPath,
            cell: string | ((props: ChildCellContext<TData, ChildType>) => any)
        },
        displayName?: string,
        align?: 'left' | 'center' | 'right'
    }
}