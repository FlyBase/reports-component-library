import {AccessorFnColumnDef, ColumnHelper, createColumnHelper, RowData} from "@tanstack/react-table";
import {getAllByPath} from "../../helpers/getByPath";
import {DeepKeysMaxDepth, DeepKeysOfObjectArrayTypes, TypeByPath, TypeOrArrayType} from "../../types";
import {AccessorFn} from "@tanstack/table-core";
import {ChildCellContext} from "../../react-table";

export type ChildRowEnabledHelper<TData> =  ColumnHelper<TData> & {
    childAccessor:
        <
            ChildPath extends DeepKeysMaxDepth<TData> = Extract<DeepKeysMaxDepth<TData>, DeepKeysOfObjectArrayTypes<TData>>,
            ChildType = TypeOrArrayType<TypeByPath<TData, ChildPath & string>>,
            ChildAccessorKeyOrFunction = AccessorFn<ChildType> | DeepKeysMaxDepth<ChildType>
        >(
            childPath: ChildPath,
            childAccessorKeyOrFunction: ChildAccessorKeyOrFunction,
            childColumnDef:
                Omit<AccessorFnColumnDef<TData>, "cell" | "accessorFn" | "meta">
                & {
                cell?: string | ((props: ChildCellContext<TData, ChildType>) => any)
                meta?: Omit<AccessorFnColumnDef<TData>['meta'], "childCell" | "childRow">
            }
        ) => AccessorFnColumnDef<TData>
};


const createChildRowEnabledHelper = <TData extends RowData,>() => {
    const originalHelper = createColumnHelper<TData>();

    const newHelper: ChildRowEnabledHelper<TData> = {
        ...originalHelper,
        childAccessor:(childPath, childAccessorKeyOrFunction, childColumnDef) => {
            return ({
                ...childColumnDef,
                id: typeof childAccessorKeyOrFunction === "function" ? childPath+"."+childColumnDef.id! : childPath+"."+childAccessorKeyOrFunction,
                cell: props => null,
                accessorFn: (row: TData) => {
                    const children = getAllByPath(row, childPath);

                    /*
                    * This check is needed because, for some reason, child rows get passed to accessor functions as well,
                    * meaning we need to ignore child rows in the logic.
                    * */
                    if(!Array.isArray(children)) {
                        return "";
                    }

                    const childAccessorValues = children.map(
                        (item, index) => typeof childAccessorKeyOrFunction === "function"
                            ? childAccessorKeyOrFunction(item, index)
                            : typeof childAccessorKeyOrFunction === "string"
                                ? item[childAccessorKeyOrFunction as keyof typeof item]
                                : ""
                    )

                    return childAccessorValues.join(" ");
                },
                meta: {
                    ...childColumnDef.meta,
                    ...(childColumnDef.cell ? { childCell: childColumnDef.cell } : {}),
                    childRow: {
                        path: childPath,
                        ...(childColumnDef.cell ? { cell: childColumnDef.cell } : {})
                    }
                }
            });
        },
    };

    return newHelper;
};

export default createChildRowEnabledHelper;