import {useLazyQuery, useQuery} from "@apollo/client";
import searchExpressionTools from "../api/graphql/searchExpressionTools";
import {
    Allele,
    FindToolsQuery,
    FullAlleleFragment,
    GetSplitSystemCombinationsQuery,
    QuerySearchExpressionToolsArgs, SplitSystemCombination
} from "../__generated__/graphql";
import getAlleles from "../api/graphql/getAlleles";
import getSplitSystemCombinations from "../api/graphql/getSplitSystemCombinations";
import {useEffect, useState} from "react";

export type ExpressionTerm = {
    id: string,
    name?: string | null | undefined,
} | null;

export type AlleleWithExpressionTerms = FullAlleleFragment & {
    expressionTerms: ExpressionTerm[]
}

export type SSCWithExpressionTerms = Omit<NonNullable<GetSplitSystemCombinationsQuery['splitSystemCombinations']> extends Array<infer SSC> ? SSC : (null | undefined), "componentAlleles"> & {
    componentAlleles: AlleleWithExpressionTerms[]
};

export type ExpressionTermsIndexed = {
    [key: string]: ExpressionTerm[]
}

const appendExpressionTerms = (alleles: FullAlleleFragment[], expressionTerms: ExpressionTermsIndexed) => {
    const allelesWithExpressionTerms: AlleleWithExpressionTerms[] = [];
    alleles.forEach(allele => {
        if(!allele.id) return;
        const matchingTerms = expressionTerms[allele.id];
        allelesWithExpressionTerms.push({
            ...allele,
            expressionTerms: matchingTerms
        })
    });
    return allelesWithExpressionTerms;
}

const useGAL4Search = (variables: QuerySearchExpressionToolsArgs, mode: "ssc" | "allele" | "both" = "both") => {
    const {
        loading: expressionTermsLoading,
        error: expressionTermsError,
        data: expressionTermsAlleles
    } = useQuery(searchExpressionTools, {variables});
    const [getAlleleSearch, {
        loading: alleleSearchLoading,
        error: alleleSearchError
    }] = useLazyQuery(getAlleles);
    const [getSSCSearch, {
        loading: sscSearchLoading,
        error: sscSearchError
    }] = useLazyQuery(getSplitSystemCombinations);
    const [alleleSearchResults, setAlleleSearchResults] = useState<AlleleWithExpressionTerms[] | null>(null);
    const [sscSearchResults, setSSCSearchResults] = useState<SSCWithExpressionTerms[] | null>(null);

    useEffect(() => {
        if(!expressionTermsLoading && !expressionTermsError && expressionTermsAlleles?.alleles) {
            const fbal_ids = expressionTermsAlleles.alleles.map(allele => allele!.id);

            const expressionTermsIndexed: ExpressionTermsIndexed = {};
            expressionTermsAlleles.alleles.forEach(allele => {
                if(!allele) return;
                expressionTermsIndexed[allele.id] = allele.expression_terms;
            })

            if(mode === "allele" || mode === "both") {
                getAlleleSearch({ variables: { fbal_ids }})
                    .then(result => result.data?.alleles && setAlleleSearchResults(
                        appendExpressionTerms(result.data.alleles as FullAlleleFragment[], expressionTermsIndexed)
                    ));
            }

            if(mode === "ssc" || mode === "both") {
                getSSCSearch({ variables: { fbal_ids }})
                    .then(result => result.data?.splitSystemCombinations && setSSCSearchResults(
                        result.data.splitSystemCombinations.map(ssc => ({
                            ...ssc,
                            componentAlleles: appendExpressionTerms(ssc.componentAlleles as FullAlleleFragment[], expressionTermsIndexed)
                        }))
                    ));
            }
        }
    }, [expressionTermsAlleles?.alleles, expressionTermsError, expressionTermsLoading, getAlleleSearch, getSSCSearch, mode]);

    return {
        loading: expressionTermsLoading || alleleSearchLoading || sscSearchLoading,
        errors: [expressionTermsError, alleleSearchError, sscSearchError].filter(error => error !== undefined),
        data: {
            expressionTerms: expressionTermsAlleles,
            alleleSearch: alleleSearchResults,
            sscSearch: sscSearchResults,
        }
    }
};

export default useGAL4Search;