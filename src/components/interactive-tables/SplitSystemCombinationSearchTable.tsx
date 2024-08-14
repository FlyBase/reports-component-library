import React from 'react';
import InteractiveTable from "./InteractiveTable";
import {ChildRowEnabledRow} from "./getChildRowEnabledCoreRowModel";
import useGAL4Search, {SSCWithExpressionTerms} from "../../hooks/useGAL4Search";
import {ExpressionSearchInput} from "../../__generated__/graphql";
import createChildRowEnabledHelper from "./childRowEnabledHelper";

type SplitSystemCombinationSearchTableProps = {
    expression: ExpressionSearchInput
};


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