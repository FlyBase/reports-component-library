import {useQuery} from "@apollo/client";
import geneTookKitMostCommonlyUsed from "../../api/graphql/geneTookKitMostCommonlyUsed";
import {useEffect, useReducer} from "react";
import {GeneToolKitTableCategory, MostCommonlyUsedAllele} from "./types";
import geneToolKitMostCommonlyUsedConfig from "./mostCommonlyUsedTableConfig";
import {GeneToolKitMostCommonlyUsedQuery} from "../../__generated__/graphql";

type AlleleToCompare = {
    id: string,
    symbol: string,
    stocksCount: number,
    pubCount: number,
    paperCount: number,
    [key: string]: any
}

const getMostCommonlyUsed = (alleles: AlleleToCompare[]): MostCommonlyUsedAllele[] => {
    const allelesSorted = [...alleles].sort((a, b) => {
        if(a.paperCount !== b.paperCount) return a.paperCount - b.paperCount;
        if(a.stocksCount !== b.stocksCount) return a.stocksCount - b.stocksCount;
        return a.pubCount - b.pubCount;
    });

    return allelesSorted.filter((allele, index) => {
        return index === 0 || (
          allele.paperCount === allelesSorted[0].paperCount &&
          allele.pubCount === allelesSorted[0].pubCount &&
          allele.stocksCount === allelesSorted[0].stocksCount
        );
    });
};



const configReducer = (currentConfig: GeneToolKitTableCategory[], results: GeneToolKitMostCommonlyUsedQuery): GeneToolKitTableCategory[] => {

    return currentConfig.map((category) => {

        const categoryResults = results[category.graphQLResultKey] as any;

        const newSubCategories = category.subCategories.map(subCategory => {

            const alleles = subCategory.graphQLFilter(categoryResults)![0].alleles;

            return {
                ...subCategory,
                count: alleles!.length,
                mostCommonlyUsed: getMostCommonlyUsed(alleles as AlleleToCompare[])
            };
        });

        return {
            ...category,
            subCategories: newSubCategories
        } as GeneToolKitTableCategory;
    });

};

const useGeneToolKitMostCommonlyUsedQuery = () => {
    const [config, updateConfig] = useReducer(configReducer, geneToolKitMostCommonlyUsedConfig);

    const { loading, error, data } = useQuery(geneTookKitMostCommonlyUsed, {
        variables: { geneId: fb_rc }
    });

    useEffect(() => {
        console.log(data, config)
        if(error) return;

        if(!loading && data) {
            updateConfig(data);
        }
    }, [data, error, loading]);

    return { loading, error, config };
};

export default useGeneToolKitMostCommonlyUsedQuery;