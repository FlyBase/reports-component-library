import React, {useEffect} from 'react';
import InteractiveTable from "./InteractiveTable";
import {ChildRowEnabledRow} from "./getChildRowEnabledCoreRowModel";
import useGAL4Search, {SSCWithExpressionTerms} from "../../hooks/useGAL4Search";
import {ExpressionSearchInput} from "../../__generated__/graphql";
import createChildRowEnabledHelper from "./childRowEnabledHelper";
import useSmartStorage from "../../hooks/useSmartStorage";

type SplitSystemCombinationSearchTableProps = {
    expression: ExpressionSearchInput
};

const sanitizeSymbol = (symbol?: string | null) => {
    if(!symbol) return "";
    return symbol.replaceAll(/[[∩\]]/g, "")
                 .replaceAll(/INTERSECTION/g, "")
                 .replaceAll(/<\/?up>/g, "")
}

const CONCATENATION_DELIMITER = "|~|"; //Just needs to be something unlikely to be in a symbol/name


const sscSearchTableColumnHelper = createChildRowEnabledHelper<SSCWithExpressionTerms>();

const SSC_COLUMNS = [
    sscSearchTableColumnHelper.group({
        header: "Split System Combination",
        columns: [
            sscSearchTableColumnHelper.accessor(ssc => `${sanitizeSymbol(ssc.symbol)}${CONCATENATION_DELIMITER}${ssc.id}`, {
                id: "symbol",
                meta: { displayName: "Symbol" },
                header: "Symbol",
                cell: props => (
                    <a href={`/reports/${props.row.original.id}`}
                       dangerouslySetInnerHTML={{
                        __html: props.row.original.symbol?.split("INTERSECTION")
                               .join("∩<br/>")
                               .replaceAll(/\[/g, "<up>")
                               .replaceAll(/]/g, "</up>") || ""
                       }}
                    >
                    </a>
                )
            }),
            sscSearchTableColumnHelper.accessor(ssc =>
                !ssc.componentAlleles ? "" : ssc.componentAlleles
                    .map(
                        allele => allele.expressionTerms ? allele.expressionTerms.map(
                            term => (term && term.id && term.name) ? `${term.name}${CONCATENATION_DELIMITER}${term.id}` : ""
                        ) : []
                    )
                    .flat()
                    .reduce((prev, curr, index, array) => array.indexOf(curr) === index ? `${prev}${CONCATENATION_DELIMITER}${curr}` : prev)
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
                            <>
                                {
                                    Object.keys(allExpressionTermsIndexed)
                                        .map(
                                            id => <a href={`/reports/${id}`} key={id}>{allExpressionTermsIndexed[id]}</a>
                                        )
                                }
                            </>
                        )
                    }
                }
            ),
            sscSearchTableColumnHelper.accessor("stocksCount", {
                header: "# Stocks",
                cell: props => (
                    <a href={`/hitlist/${props.row.original.id}/to/FBst`}>{props.row.original.stocksCount}</a>
                ),
                sortingFn: "alphanumeric",
                meta: {
                    align: "right"
                }
            }),
            sscSearchTableColumnHelper.accessor("pubCount", {
                header: "# Refs",
                cell: props => (
                    <a href={`/hitlist/${props.row.original.id}/to/FBrf`}>{props.row.original.pubCount}</a>
                ),
                sortingFn: "alphanumeric",
                meta: {
                    align: "right"
                }
            })
        ]
    }),
    sscSearchTableColumnHelper.group({
        header: "Component Alleles",
        columns: [
            sscSearchTableColumnHelper.childAccessor("componentAlleles", allele => `${sanitizeSymbol(allele.symbol)}${CONCATENATION_DELIMITER}${allele.id}`, {
                id: "Symbol",
                header: "Symbol",
                cell: props => (
                    <a href={`/reports/${props.row.original.id}`} dangerouslySetInnerHTML={{ __html: props.row.original.symbol || "" }}></a>
                )
            }),
            sscSearchTableColumnHelper.childAccessor(
                "componentAlleles",
                allele => allele.insertions.map(insertion => `${sanitizeSymbol(insertion.symbol)}${CONCATENATION_DELIMITER}${insertion.id}`).join(CONCATENATION_DELIMITER),
                {
                    id: "Insertions",
                    header: "Insertion / Construct",
                    cell: props => (
                        <>
                            {
                                props.row.original.insertions.map(insertion => (
                                    <a href={`/reports/${insertion.id}`}>{insertion.symbol}</a>
                                ))
                            }
                        </>
                    )
                }
            ),
            sscSearchTableColumnHelper.childAccessor(
                "componentAlleles",
                allele => allele.insertedElementTypes?.map(elementType => elementType === null ? "" : `${elementType.name}${CONCATENATION_DELIMITER}${elementType.id}`).join(CONCATENATION_DELIMITER),
                {
                    id: "InsertedElements",
                    header: "Inserted Element Type",
                    cell: props => (
                        <>
                            {
                                props.row.original.insertedElementTypes?.map(elementType => elementType ? (
                                    <a href={`/reports/${elementType.id}`}>{elementType.name}</a>
                                ) : null)
                            }
                        </>
                    )
                }
            ),
            sscSearchTableColumnHelper.childAccessor(
                "componentAlleles",
                allele => allele.regRegions?.map(region => region === null ? "" : `${sanitizeSymbol(region.symbol)}${CONCATENATION_DELIMITER}${region.id}`).join(CONCATENATION_DELIMITER),
                {
                    id: "RegRegion",
                    header: "Regulatory Region",
                    cell: props => (
                        <>
                            {
                                props.row.original.regRegions?.map(region => region ? (
                                    <a href={`/reports/${region.id}`} key={region.id}>{region.symbol}</a>
                                ) : null)
                            }
                        </>
                    )
                }
            ),
            sscSearchTableColumnHelper.childAccessor(
                "componentAlleles",
                allele => allele.encodedTools?.map(tool => tool === null ? "" : `${sanitizeSymbol(tool.symbol)}${CONCATENATION_DELIMITER}${tool.id}`).join(CONCATENATION_DELIMITER),
                {
                    id: "EncodedTool",
                    header: "Encoded Tool",
                    cell: props => (
                        <>
                            {
                                props.row.original.encodedTools?.map(tool => tool ? (
                                    <a href={`/reports/${tool.id}`} key={tool.id}>{tool.symbol}</a>
                                ) : null)
                            }
                        </>
                    )
                }
            ),
            sscSearchTableColumnHelper.childAccessor(
                "componentAlleles",
                allele => allele.taggedWith?.map(tool => tool === null ? "" : `${sanitizeSymbol(tool.symbol)}${CONCATENATION_DELIMITER}${tool.id}`).join(CONCATENATION_DELIMITER),
                {
                    id: "TaggedWith",
                    header: "Tagged With",
                    cell: props => (
                        <>
                            {
                                props.row.original.taggedWith?.map(tool => tool ? (
                                    <a href={`/reports/${tool.id}`} key={tool.id}>{tool.symbol}</a>
                                ) : null)
                            }
                        </>
                    )
                }
            ),
            sscSearchTableColumnHelper.childAccessor(
                "componentAlleles",
                allele => allele.tagUses?.map(use => use === null ? "" : `${use.name}${CONCATENATION_DELIMITER}${use.id}`).join(CONCATENATION_DELIMITER),
                {
                    id: "TaggedUses",
                    header: "Tagged Uses",
                    cell: props => (
                        <>
                            {
                                props.row.original.tagUses?.map(use => use ? (
                                    <a href={`/reports/${use.id}`} key={use.id}>{use.name}</a>
                                ) : null)
                            }
                        </>
                    )
                }
            ),
            sscSearchTableColumnHelper.childAccessor("componentAlleles", "stocksCount", {
                header: "# Stocks",
                cell: props => (
                    <a href={`/hitlist/${props.row.original.id}/to/FBst`}>{props.row.original.stocksCount}</a>
                ),
                sortingFn: "alphanumeric",
                meta: {
                    align: "right"
                }
            }),
            sscSearchTableColumnHelper.childAccessor("componentAlleles", "pubCount", {
                header: "# Refs",
                cell: props => (
                    <a href={`/hitlist/${props.row.original.id}/to/FBrf`}>{props.row.original.pubCount}</a>
                ),
                sortingFn: "alphanumeric",
                meta: {
                    align: "right"
                }
            })
        ]
    })
];

const SplitSystemCombinationSearchTable: React.FC<SplitSystemCombinationSearchTableProps> = ({expression}) => {

    const [gal4Search] = useSmartStorage("gal4Search");

    const {loading, errors, data: { sscSearch }} = useGAL4Search({ expression }, "ssc");

    console.log("SSC local", gal4Search);

    if(!gal4Search || !gal4Search.type || gal4Search.type !== "ssc") return null;

    if(loading) return <div>Loading...</div>;

    if(errors.length > 0) return <div>Error</div>;

    if(sscSearch !== null)
        return (
            <InteractiveTable id="splitSystemCombinationSearch" columns={SSC_COLUMNS} data={sscSearch}/>
        );

    return null;
};


export default SplitSystemCombinationSearchTable;