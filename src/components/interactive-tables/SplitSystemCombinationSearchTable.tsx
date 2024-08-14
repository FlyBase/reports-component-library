import React from 'react';
import InteractiveTable from "./InteractiveTable";
import {
    AccessorFnColumnDef,
    ColumnDef,
    ColumnHelper,
    createColumnHelper,
    GroupColumnDef,
    RowData
} from "@tanstack/react-table";
import {AccessorFn} from "@tanstack/table-core";
import {getAllByPath} from "../../helpers/getByPath";
import {ChildCellContext} from "../../react-table";
import {ChildRowEnabledRow} from "./getChildRowEnabledCoreRowModel";
import useGAL4Search, {SSCWithExpressionTerms} from "../../hooks/useGAL4Search";
import {ExpressionSearchInput} from "../../__generated__/graphql";

type SplitSystemCombinationSearchTableProps = {
    expression: ExpressionSearchInput
};

type SplitSystemComponentAllele = {
    id: string,
    symbol: string,
    stocksCount: number | string,
    pubCount: number | string,
    insertions: {
        id: string,
        symbol: string,
    }[],
    constructs: {
        id: string,
        symbol: string,
    }[],
    insertedElementTypes: {
        id: string,
        name: string,
    }[],
    regRegions: {
        id: string,
        symbol: string,
    }[],
    encodedTools: {
        id: string,
        symbol: string,
    }[],
    encodedToolUses: {
        id: string,
        name: string,
    }[],
    taggedWith: {
        id: string,
        symbol: string,
    }[],
    taggedUses: {
        id: string,
        name: string,
    }[],
};

type SplitSystemCombination = {
    id: string,
    symbol: string,
    expressionTerms: {
        id: string,
        name: string
    }[],
    stocksCount: number | string,
    pubCount: number | string,
    alleles: SplitSystemComponentAllele[]
};

const sscColumnHelper = createColumnHelper<SplitSystemCombination>();

type ChildRowEnabledHelper<TData> =  ColumnHelper<TData> & {

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

export type TypeOrArrayType<Type> = Type extends (infer ArrayType)[] ? ArrayType : Type;

const createChildRowEnabledHelper = <TData extends RowData,>() => {
    const originalHelper = createColumnHelper<TData>();

    const newHelper: ChildRowEnabledHelper<TData> = {
        ...originalHelper,
        childAccessor:(childPath, childAccessorKeyOrFunction, childColumnDef) => {
            return ({
                ...childColumnDef,
                id: typeof childAccessorKeyOrFunction === "function" ? childPath+"."+childColumnDef.id! : childPath+"."+childAccessorKeyOrFunction,
                cell: props => {
                    // const childRows = (props.row as ChildRowEnabledRow<TData>).getLeafChildRows().filter(childRow => childRow.rootChildPath === childPath);
                    //
                    //
                    //
                    // return childRows.map(childRow => {
                    //     const childCell = childRow.getVisibleCells().filter(cell => cell.column.id === props.column.id)[0];
                    //
                    //     console.log("CHILD ACC", props.cell.id, childCell.id)
                    //     // console.log(childCell, childCell.column.columnDef.meta.childRow.cell, childCell.getContext())
                    //     return flexRender(
                    //         childColumnDef.cell || (
                    //             typeof childAccessorKeyOrFunction === "function"
                    //                 ? childAccessorKeyOrFunction(childRow)
                    //                 : childAccessorKeyOrFunction
                    //         ),
                    //         childCell.getContext()
                    //     );
                    // });
                    return null;
                },
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


const childRowEnabledHelper = createChildRowEnabledHelper<SplitSystemCombination>();

const DEFAULT_COLUMNS_3: ColumnDef<SplitSystemCombination>[] = [
    childRowEnabledHelper.group({
        header: "Split System Combination",
        columns: [
            childRowEnabledHelper.accessor(row => `${row.id} ${row.symbol}`, {
                id: "symbol",
                header: "Symbol",
                cell: props => (
                    <td rowSpan={props.row.getLeafRows().filter(leafRow => leafRow.subRows.length === 0).length}>
                        <a href={`/reports/${props.row.original.id}`}>{props.row.original.symbol}</a>
                    </td>
                )

            })
        ]
    }),
    childRowEnabledHelper.group({
        header: "Component Alleles",
        columns: [
            childRowEnabledHelper.childAccessor("alleles", row => `${row.id} ${row.symbol}`, {
                id: "alleleSymbol",
                header: "Symbol",
                cell: props => (
                    <td rowSpan={props.row.totalChildRows === 0 ? 1 : props.row.totalChildRows}>
                        <a href={`/reports/${props.row.original.id}`}>{props.row.original.symbol}</a>
                    </td>
                )
            })
        ]
    })
];

export type TypeByPath<Type, Path extends string> =
    unknown extends Type
        ? string
        : Type extends any[]
            ? TypeByPath<Type[number], Path>
            : Path extends `${infer ParentPath}.${infer ChildPath}`
                ? ParentPath extends keyof Type
                    ? TypeByPath<Type[ParentPath], ChildPath>
                    : never
                : Path extends keyof Type
                    ? Type[Path]
                    : never

export type IsArrayOfObjectsType<Type> =
    Type extends (infer ArrayType)[]
        ? ArrayType extends (infer SubArrayType)[]
            ? IsArrayOfObjectsType<SubArrayType>
            : ArrayType extends object
                ? true
                : false
        : false

export type OnlyArrayOfObjects<Type> =
    Type extends (infer ArrayType)[]
        ? OnlyArrayOfObjects<ArrayType>
        : {
            [Key in keyof Type as (IsArrayOfObjectsType<Type[Key]> extends true ? Key : never)]: Type[Key]
        };

export type OnlyNonArrayOfObjects<Type> =
    Type extends (infer ArrayType)[]
        ? OnlyNonArrayOfObjects<ArrayType>
        : {
            [Key in keyof Type as (IsArrayOfObjectsType<Type[Key]> extends false ? Key : never)]: Type[Key]
        };

export type DeepKeysMaxDepth<T, MaxDepth extends number = 10, TDepth extends any[] = []> =
    TDepth['length'] extends MaxDepth
        ? never
        : unknown extends T
            ? string
            : T extends any[]
                ? DeepKeysMaxDepth<T[number], MaxDepth, [...TDepth, any]>
                : T extends object
                    ? (keyof T & string) | DeepKeysMaxDepthPrefix<T, keyof T, MaxDepth, TDepth>
                    : never;

export type DeepKeysMaxDepthPrefix<
    T,
    TPrefix,
    MaxDepth extends number,
    TDepth extends any[],
> = TPrefix extends keyof T & (number | string)
    ? `${TPrefix}.${DeepKeysMaxDepth<T[TPrefix], MaxDepth, [...TDepth, any]> & string}`
    : never;

export type DeepKeysOfNonObjectArrayTypes<T, TDepth extends any[] = []> =
    TDepth['length'] extends 5
        ? never
        : unknown extends T
            ? string
            : T extends any[]
                ? DeepKeysOfNonObjectArrayTypes<T[number], [...TDepth, any]>
                : T extends object
                    ? (keyof OnlyNonArrayOfObjects<T> & string) | DeepKeysOfNonObjectArrayTypesPrefix<T, keyof T, TDepth>
                    : never;

export type DeepKeysOfObjectArrayTypes<T, TDepth extends any[] = []> =
    TDepth['length'] extends 5
    ? never
    : unknown extends T
        ? string
        : T extends any[]
            ? DeepKeysOfObjectArrayTypes<T[number], [...TDepth, any]>
            : T extends object
                ? (keyof OnlyArrayOfObjects<T> & string) | DeepKeysOfObjectArrayTypesPrefix<T, keyof T, TDepth>
                : never;

export type DeepKeysOfNonObjectArrayTypesPrefix<
    T,
    TPrefix,
    TDepth extends any[],
> = TPrefix extends keyof T & (number | string)
    ? `${TPrefix}.${DeepKeysOfNonObjectArrayTypes<T[TPrefix], [...TDepth, any]> & string}`
    : never;

export type DeepKeysOfObjectArrayTypesPrefix<
    T,
    TPrefix,
    TDepth extends any[],
> = TPrefix extends keyof T & (number | string)
    ? `${TPrefix}.${DeepKeysOfObjectArrayTypes<T[TPrefix], [...TDepth, any]> & string}`
    : never;


const applyToRowDepth = <TColumnDef extends ColumnDef<any> = ColumnDef<any>,>(depth: number, columnDef: TColumnDef): TColumnDef => {

    let columnDefGroup;
    if(Object.hasOwn(columnDef, 'columns')) {
        columnDefGroup = columnDef as GroupColumnDef<any>;
    }

    return {
        ...columnDef,
        ...(
            columnDef.cell ? {
                cell: props => props.row.depth === depth ? typeof columnDef.cell === "string" ? columnDef.cell : columnDef.cell!(props) : null
            } : {}
        ),
        ...(
            columnDefGroup ? {
                columns: columnDefGroup.columns!.map(column => applyToRowDepth(depth, column))
            } : {}
        )
    }
};
const DEFAULT_COLUMNS_2: ColumnDef<SplitSystemCombination>[] = [
    applyToRowDepth(0, sscColumnHelper.group({
        header: "Split System Combination",
        columns: [
            sscColumnHelper.accessor(row => `${row.id} ${row.symbol}`, {
                id: "symbol",
                header: "Symbol",
                cell: props => (
                    <td rowSpan={props.row.getLeafRows().filter(leafRow => leafRow.subRows.length === 0).length}>
                        <a href={`/reports/${props.row.original.id}`}>{props.row.original.symbol}</a>
                    </td>
                )

            })
        ]
    })),
    applyToRowDepth(1, sscColumnHelper.group({
        header: "Component Alleles",
        columns: [
            sscColumnHelper.accessor(row => row.alleles?.map(allele => `${allele.id} ${allele.symbol}`).join(' ') || null, {
                id: "alleleSymbol",
                header: "Symbol",
                cell: props => (
                    <td>
                        <a href={`/reports/${props.row.original.id}`}>{props.row.original.symbol}</a>
                    </td>
                )
            }),
        ]
    }))
];
const DEFAULT_COLUMNS: ColumnDef<SplitSystemCombination>[] = [
    sscColumnHelper.group({
        header: "Split System Combination",
        columns: [
            sscColumnHelper.accessor(row => row.alleles ? `${row.id} ${row.symbol}` : null, {
                id: "symbol",
                header: "Symbol",
                cell: props => {
                    console.log(props.row.id, props.row.depth)
                    switch (props.row.depth) {
                        case 0: return <td rowSpan={props.row.getLeafRows().filter(leafRow => leafRow.subRows.length === 0).length}><a href={`/reports/${props.row.original.id}`}>{props.row.original.symbol}</a></td>;
                        default: return null;
                    }
                },
            }),
            // sscColumnHelper.accessor(row => row.alleles ? row.expressionTerms.map(term => `${term.id} ${term.name}`).join(" ") : null, {
            //     id: "expressionTerms",
            //     header: "Expression terms",
            //     cell: props => {
            //
            //         if(!props.row.original.alleles) return null;
            //         return (
            //         <ul>
            //             {props.row.original.expressionTerms.map(term => (
            //                 <li key={`ssc-expression-terms-${props.row.id}-${term.id}`}>
            //                     <a href={`/reports/${term.id}`}>{term.name}</a>
            //                 </li>
            //             ))}
            //         </ul>
            //     )}
            // }),
            // sscColumnHelper.accessor('stocksCount', {
            //     header: "# Stocks",
            //     cell: props => {
            //         if(!props.row.subRows) return null;
            //         return <a href={`/hitlist/${props.row.original.id}/to/FBst`}>{props.row.original.stocksCount}</a>;
            //     }
            // }),
            // sscColumnHelper.accessor('pubCount', {
            //     header: "# Refs",
            //     cell: props => {
            //         if(!props.row.subRows) return null;
            //         return <a href={`/hitlist/${props.row.original.id}/to/FBrf`}>{props.row.original.pubCount}</a>;
            //     }
            // })
        ]
    }),
    sscColumnHelper.group({
        header: "Component Alleles",
        columns: [
            sscColumnHelper.accessor(row => row.alleles?.map(allele => `${allele.id} ${allele.symbol}`).join(' ') || null, {
                id: "alleleSymbol",
                header: "Symbol",
                cell: props => {
                    switch (props.row.depth) {
                        case 1: return <td><a href={`/reports/${props.row.original.id}`}>{props.row.original.symbol}</a></td>;
                        default: return null;
                    }
                }
                // cell: props => props.row && props.row.original.alleles.map(allele => <td><a href={`/reports/${allele.id}`}>{allele.symbol}</a></td>),
                // meta: {
                //     childColumnDef: alleleColumnHelper.accessor('symbol', {
                //         cell: props => (
                //             <a href={`/reports/${props.row.original.id}`}>{props.getValue()}</a>
                //         )
                //     })
                // }
            }),
            // sscColumnHelper.accessor("alleles.symbol", {
            //     // id: "alleleSymbolTwo",
            //     header: "SymbolTwo",
            //     cell: props => {
            //         console.log("OptionTWO", props);
            //         return null;
            //     }
            // })
        ]
    })
];

const EXAMPLE_DATA: SplitSystemCombination[] = [
    {
        id: "FBex12345",
        symbol: "EX[UNION]AMPLE",
        expressionTerms: [{
            id: "FBex12345",
            name: "Expression Term 1"
        }],
        stocksCount: 456,
        pubCount: 123,
        alleles: [{
            id: "FBex12345",
            symbol: "EXPL-Al 1",
            stocksCount: 123,
            pubCount: 321,
            insertions: [{ id: "FBex12345", symbol: "INS-EX 1"}],
            constructs: [{ id: "FBex12345", symbol: "CON-EX 1"}],
            taggedWith: [{ id: "FBex12345", symbol: "TAG-EX 1"}],
            taggedUses: [{ id: "FBex12345", name: "Tag Use Example 1"}],
            insertedElementTypes: [{ id: "FBex12345", name: "Inserted Element 1"}],
            regRegions: [{ id: "FBex12345", symbol: "REGREG-EX 1"}],
            encodedTools: [{ id: "FBex12345", symbol: "ENC-EX 1"}],
            encodedToolUses: [{ id: "FBex12345", name: "Encoded Tool Use 1"}]
        },{
            id: "FBex12345",
            symbol: "EXPL-Al 2",
            stocksCount: 123,
            pubCount: 321,
            insertions: [{ id: "FBex12345", symbol: "INS-EX 2"}],
            constructs: [{ id: "FBex12345", symbol: "CON-EX 2"}],
            taggedWith: [{ id: "FBex12345", symbol: "TAG-EX 2"}],
            taggedUses: [{ id: "FBex12345", name: "Tag Use Example 2"}],
            insertedElementTypes: [{ id: "FBex12345", name: "Inserted Element 2"}],
            regRegions: [{ id: "FBex12345", symbol: "REGREG-EX 2"}],
            encodedTools: [{ id: "FBex12345", symbol: "ENC-EX 2"}],
            encodedToolUses: [{ id: "FBex12345", name: "Encoded Tool Use 2"}]
        },{
            id: "FBex12345",
            symbol: "EXPL-Al 3",
            stocksCount: 123,
            pubCount: 321,
            insertions: [{ id: "FBex12345", symbol: "INS-EX 3"}],
            constructs: [{ id: "FBex12345", symbol: "CON-EX 3"}],
            taggedWith: [{ id: "FBex12345", symbol: "TAG-EX 3"}],
            taggedUses: [{ id: "FBex12345", name: "Tag Use Example 3"}],
            insertedElementTypes: [{ id: "FBex12345", name: "Inserted Element 3"}],
            regRegions: [{ id: "FBex12345", symbol: "REGREG-EX 3"}],
            encodedTools: [{ id: "FBex12345", symbol: "ENC-EX 3"}],
            encodedToolUses: [{ id: "FBex12345", name: "Encoded Tool Use 3"}]
        }]
    }
];

type TestDatum = {
    level: number,
    thisIsAString: string,
    thisIsANumber: number,
    thisIsABoolean: boolean,
    thisIsAnObject: {
        thisIsAString: string,
        thisIsANumber: number,
        thisIsABoolean: boolean,
    },
    thisIsAStringArray: string[],
    thisIsANumberArray: number[],
    thisIsABooleanArray: boolean[],
    thisIsAnObjectArray: TestSubDatum[]
}

type TestSubDatum = {
    level: number,
    thisIsAString: string,
    thisIsAnObject: {
        thisIsAString: string,
        thisIsAnObject: {
            thisIsAnObjectArray: TestSubSubDatum[]
        }
    }
}

type TestSubSubDatum = {
    level: number,
    thisIsAString: string,
    thisIsANumber: number,
    thisIsABoolean: boolean,
    thisIsAnObject: {
        thisIsAString: string,
        thisIsANumber: number,
        thisIsABoolean: boolean,
    },
}

const testHelper = createChildRowEnabledHelper<TestDatum>();

const TEST_COLUMNS = [
    testHelper.group({
        header: "LEVEL 1",
        columns: [
            testHelper.accessor("thisIsAString", {
                header: "String",
                cell: props => (
                    <td rowSpan={(props.row as ChildRowEnabledRow<TestDatum>).totalChildRows || 1}>
                        {props.row.original.thisIsAString}
                    </td>
                )
            }),
            testHelper.accessor("thisIsAStringArray", {
                header: "String[]",
                cell: props => (
                    <td rowSpan={(props.row as ChildRowEnabledRow<TestDatum>).totalChildRows || 1}>
                        {props.row.original.thisIsAStringArray.map((str,i) => `String ${i}: ${str}`).join("\n")}
                    </td>
                )
            }),
            testHelper.accessor("thisIsAnObject.thisIsAString", {
                header: "Object.String",
                cell: props => (
                    <td rowSpan={(props.row as ChildRowEnabledRow<TestDatum>).totalChildRows || 1}>
                        {props.row.original.thisIsAnObject.thisIsAString}
                    </td>
                )
            })
        ]
    }),
    testHelper.group({
        header: "LEVEL 2",
        columns: [
            testHelper.childAccessor("thisIsAnObjectArray", "thisIsAString", {
                header: "String",
                cell: props => (
                    <td rowSpan={props.row.totalChildRows || 1}>
                        {props.row.original.thisIsAString}
                    </td>
                )
            }),
            testHelper.childAccessor("thisIsAnObjectArray", "thisIsAnObject.thisIsAString", {
                header: "Object.String",
                cell: props => (
                    <td rowSpan={props.row.totalChildRows || 1}>
                        {props.row.original.thisIsAnObject.thisIsAString}
                    </td>
                )
            })
        ]
    }),
    testHelper.group({
        header: "LEVEL 3",
        columns: [
            testHelper.childAccessor("thisIsAnObjectArray.thisIsAnObject.thisIsAnObject.thisIsAnObjectArray", "thisIsAString", {
                header: "String",
                cell: props => (
                    <td rowSpan={props.row.totalChildRows || 1}>
                        {props.row.original.thisIsAString}
                    </td>
                )
            }),
            testHelper.childAccessor("thisIsAnObjectArray.thisIsAnObject.thisIsAnObject.thisIsAnObjectArray", "thisIsANumber", {
                header: "Number",
                cell: props => (
                    <td rowSpan={props.row.totalChildRows || 1}>
                        {props.row.original.thisIsANumber}
                    </td>
                )
            }),
            testHelper.childAccessor("thisIsAnObjectArray.thisIsAnObject.thisIsAnObject.thisIsAnObjectArray", "thisIsABoolean", {
                header: "Boolean",
                cell: props => (
                    <td rowSpan={props.row.totalChildRows || 1}>
                        {props.row.original.thisIsABoolean}
                    </td>
                )
            }),
            testHelper.childAccessor("thisIsAnObjectArray.thisIsAnObject.thisIsAnObject.thisIsAnObjectArray", "thisIsAnObject.thisIsAString", {
                header: "String",
                cell: props => (
                    <td rowSpan={props.row.totalChildRows || 1}>
                        {props.row.original.thisIsAnObject.thisIsAString}
                    </td>
                )
            }),
            testHelper.childAccessor("thisIsAnObjectArray.thisIsAnObject.thisIsAnObject.thisIsAnObjectArray", "thisIsAnObject.thisIsABoolean", {
                header: "Boolean",
                cell: props => (
                    <td rowSpan={props.row.totalChildRows || 1}>
                        {props.row.original.thisIsAnObject.thisIsABoolean}
                    </td>
                )
            }),
            testHelper.childAccessor("thisIsAnObjectArray.thisIsAnObject.thisIsAnObject.thisIsAnObjectArray", "thisIsAnObject.thisIsANumber", {
                header: "Number",
                cell: props => {
                    // console.log("LAST PROPS", props)
                    return (
                        <td rowSpan={props.row.totalChildRows || 1}>
                            {props.row.original.thisIsAnObject.thisIsANumber}
                        </td>
                    )
                }
            }),
        ]
    })
];

const TEST_DATUM: (id: number, subNumber?: number, subSubNumber?: number) => TestDatum = (id, subNumber = 5, subSubNumber = 3) => ({
    level: 1,
    thisIsAString: `String:${id}`,
    thisIsANumber: id,
    thisIsABoolean: id % 2 === 0,
    thisIsAnObject: {
        thisIsAString: `Object.String:${id}`,
        thisIsANumber: parseFloat(`${id}.${id}`),
        thisIsABoolean: id % 2 !== 0,
    },
    thisIsAStringArray: [`StringArray:${id}-1`,`StringArray:${id}-2`,`StringArray:${id}-3`],
    thisIsANumberArray: [id, id*2, id*3],
    thisIsABooleanArray: [true, false],
    thisIsAnObjectArray: (() => {
        const subs = [];
        for(let i = 0; i < subNumber; i++)
            subs.push(TEST_SUB_DATUM(i,subSubNumber));
        return subs;
    })()
});

const TEST_SUB_DATUM: (id: number, subSubNumber?: number) => TestSubDatum = (id, subSubNumber = 3) => ({
    level: 2,
    thisIsAString: `String:${id}`,
    thisIsAnObject: {
        thisIsAString: `Object.String:${id}`,
        thisIsAnObject: {
            thisIsAnObjectArray: (() => {
                const subs = [];
                for(let i = 0; i < subSubNumber; i++)
                    subs.push(TEST_SUB_SUB_DATUM(i));
                return subs;
            })()
        }
    }
})

const TEST_SUB_SUB_DATUM: (id: number) => TestSubSubDatum = id => ({
    level: 3,
    thisIsAString: `String:${id}`,
    thisIsANumber: id,
    thisIsABoolean: id % 2 === 0,
    thisIsAnObject: {
        thisIsAString: `Object.String:${id}`,
        thisIsANumber: parseFloat(`${id}.${id}`),
        thisIsABoolean: id % 2 !== 0,
    },
})

const TEST_DATA: (num?: number, subNumber?: number, subSubNumber?: number) => TestDatum[] = (num = 10, subNumber = 5, subSubNumber = 3) => {
    const subs = [];
    for(let i = 0; i < num; i++)
        subs.push(TEST_DATUM(i,subNumber,subSubNumber));
    return subs;
}

const sscSearchTableColumnHelper = createChildRowEnabledHelper<SSCWithExpressionTerms>();

const SSC_COLUMNS = [
    sscSearchTableColumnHelper.group({
        header: "Split System Combination",
        columns: [
            sscSearchTableColumnHelper.accessor(ssc => `${ssc.symbol} ${ssc.id}`, {
                id: "symbol",
                meta: { displayName: "Symbol" },
                header: "Symbol",
                cell: props => (
                    <td rowSpan={(props.row as ChildRowEnabledRow<SSCWithExpressionTerms>).totalChildRows || 1}>
                        <a href={`/reports/${props.row.original.id}`}>{props.row.original.symbol?.split("INTERSECTION").map((x,i)=><React.Fragment key={`${x}-${i}`}>{x}<br/></React.Fragment>)}</a>
                    </td>
                )
            }),
            sscSearchTableColumnHelper.accessor(ssc =>
                !ssc.componentAlleles ? "" : ssc.componentAlleles
                    .map(
                        allele => allele.expressionTerms ? allele.expressionTerms.map(
                            term => (term && term.id && term.name) ? `${term.name} ${term.id}` : ""
                        ) : []
                    )
                    .flat()
                    .reduce((prev, curr, index, array) => array.indexOf(curr) === index ? `${prev} ${curr}` : prev)
                ,{
                    id: "expressionTerms",
                    header: "Expression terms",
                    cell: props => {
                        const allExpressionTerms = props.row.original.componentAlleles.map(allele => allele.expressionTerms).flat();
                        const allExpressionTermsIndexed: { [key: string]: string } = {};

                        allExpressionTerms.forEach(term => {
                            if(term && term.id && term.name && !allExpressionTermsIndexed[term.id]) {
                                allExpressionTermsIndexed[term.id] = term.name;
                            }
                        })

                        return (
                            <td rowSpan={(props.row as ChildRowEnabledRow<SSCWithExpressionTerms>).totalChildRows || 1}>
                                {
                                    Object.keys(allExpressionTermsIndexed)
                                        .map(
                                            id => <a href={`/reports/${id}`} key={id}>{allExpressionTermsIndexed[id]}</a>
                                        )}
                            </td>
                        )
                    }
                }
            ),
            sscSearchTableColumnHelper.accessor("stocksCount", {
                header: "# Stocks",
                cell: props => (
                    <td rowSpan={(props.row as ChildRowEnabledRow<SSCWithExpressionTerms>).totalChildRows || 1}>
                        <a href={`/hitlist/${props.row.original.id}/to/FBst`}>{props.row.original.stocksCount}</a>
                    </td>
                )
            }),
            sscSearchTableColumnHelper.accessor("pubCount", {
                header: "# Refs",
                cell: props => (
                    <td rowSpan={(props.row as ChildRowEnabledRow<SSCWithExpressionTerms>).totalChildRows || 1}>
                        <a href={`/hitlist/${props.row.original.id}/to/FBrf`}>{props.row.original.pubCount}</a>
                    </td>
                )
            })
        ]
    }),
    sscSearchTableColumnHelper.group({
        header: "Component Alleles",
        columns: [
            sscSearchTableColumnHelper.childAccessor("componentAlleles", allele => `${allele.symbol} ${allele.id}`, {
                id: "Symbol",
                header: "Symbol",
                cell: props => (
                    <td rowSpan={props.row.totalChildRows || 1}>
                        <a href={`/reports/${props.row.original.id}`}>{props.row.original.symbol}</a>
                    </td>
                )
            }),
            sscSearchTableColumnHelper.childAccessor(
                "componentAlleles",
                allele => allele.insertions.map(insertion => `${insertion.symbol} ${insertion.id}`).join(" "),
                {
                    id: "Insertions",
                    header: "Insertion / Construct",
                    cell: props => (
                        <td rowSpan={props.row.totalChildRows || 1}>
                            {
                                props.row.original.insertions.map(insertion => (
                                    <a href={`/reports/${insertion.id}`}>{insertion.symbol}</a>
                                ))
                            }
                        </td>
                    )
                }
            ),
            sscSearchTableColumnHelper.childAccessor(
                "componentAlleles",
                allele => allele.insertedElementTypes?.map(elementType => elementType === null ? "" : `${elementType.name} ${elementType.id}`).join(" "),
                {
                    id: "InsertedElements",
                    header: "Inserted Element Type",
                    cell: props => (
                        <td rowSpan={props.row.totalChildRows || 1}>
                            {
                                props.row.original.insertedElementTypes?.map(elementType => elementType ? (
                                    <a href={`/reports/${elementType.id}`}>{elementType.name}</a>
                                ) : null)
                            }
                        </td>
                    )
                }
            ),
            sscSearchTableColumnHelper.childAccessor(
                "componentAlleles",
                allele => allele.regRegions?.map(region => region === null ? "" : `${region.symbol} ${region.id}`).join(" "),
                {
                    id: "RegRegion",
                    header: "Regulatory Region",
                    cell: props => (
                        <td rowSpan={props.row.totalChildRows || 1}>
                            {
                                props.row.original.regRegions?.map(region => region ? (
                                    <a href={`/reports/${region.id}`} key={region.id}>{region.symbol}</a>
                                ) : null)
                            }
                        </td>
                    )
                }
            ),
            sscSearchTableColumnHelper.childAccessor(
                "componentAlleles",
                allele => allele.encodedTools?.map(tool => tool === null ? "" : `${tool.symbol} ${tool.id}`).join(" "),
                {
                    id: "EncodedTool",
                    header: "Encoded Tool",
                    cell: props => (
                        <td rowSpan={props.row.totalChildRows || 1}>
                            {
                                props.row.original.encodedTools?.map(tool => tool ? (
                                    <a href={`/reports/${tool.id}`} key={tool.id}>{tool.symbol}</a>
                                ) : null)
                            }
                        </td>
                    )
                }
            ),
            sscSearchTableColumnHelper.childAccessor(
                "componentAlleles",
                allele => allele.taggedWith?.map(tool => tool === null ? "" : `${tool.symbol} ${tool.id}`).join(" "),
                {
                    id: "TaggedWith",
                    header: "Tagged With",
                    cell: props => (
                        <td rowSpan={props.row.totalChildRows || 1}>
                            {
                                props.row.original.taggedWith?.map(tool => tool ? (
                                    <a href={`/reports/${tool.id}`} key={tool.id}>{tool.symbol}</a>
                                ) : null)
                            }
                        </td>
                    )
                }
            ),
            sscSearchTableColumnHelper.childAccessor(
                "componentAlleles",
                allele => allele.tagUses?.map(use => use === null ? "" : `${use.name} ${use.id}`).join(" "),
                {
                    id: "TaggedUses",
                    header: "Tagged Uses",
                    cell: props => (
                        <td rowSpan={props.row.totalChildRows || 1}>
                            {
                                props.row.original.tagUses?.map(use => use ? (
                                    <a href={`/reports/${use.id}`} key={use.id}>{use.name}</a>
                                ) : null)
                            }
                        </td>
                    )
                }
            ),
            sscSearchTableColumnHelper.childAccessor("componentAlleles", "stocksCount", {
                header: "# Stocks",
                cell: props => (
                    <td rowSpan={props.row.totalChildRows || 1}>
                        <a href={`/hitlist/${props.row.original.id}/to/FBst`}>{props.row.original.stocksCount}</a>
                    </td>
                )
            }),
            sscSearchTableColumnHelper.childAccessor("componentAlleles", "pubCount", {
                header: "# Refs",
                cell: props => (
                    <td rowSpan={props.row.totalChildRows || 1}>
                        <a href={`/hitlist/${props.row.original.id}/to/FBrf`}>{props.row.original.pubCount}</a>
                    </td>
                )
            })
        ]
    })
];

const SplitSystemCombinationSearchTable: React.FC<SplitSystemCombinationSearchTableProps> = ({expression}) => {

    const {loading, errors, data: { sscSearch }} = useGAL4Search({ expression }, "ssc");

    if(loading) return <div>Loading...</div>;

    if(errors.length > 0) return <div>Error</div>;

    if(sscSearch !== null)
        return (
            <InteractiveTable id="splitSystemCombinationSearch" columns={SSC_COLUMNS} data={sscSearch}/>
        );

    return null;
};


export default SplitSystemCombinationSearchTable;