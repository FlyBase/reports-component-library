import {GeneToolKitTableCategory} from "./types";
import {InteractiveTable} from "../../api/graphql/types/interactiveTableDefinitions/interactiveTableTypes";
import {
    GeneClassicalInsertionAllelesColumn
} from "../../api/graphql/types/interactiveTableDefinitions/geneClassicalInserstionAlleles";
import {
    GeneTransgenicConstructAllelesColumn
} from "../../api/graphql/types/interactiveTableDefinitions/geneTransgenicConstructAlleles";

const hasMatches = (terms: string[], searchText: string | string[]): boolean => {
    if(typeof searchText === "string") searchText = [searchText];

    for(let searchIndex = 0; searchIndex < searchText.length; searchIndex++) {
        const currentText = searchText[searchIndex];
        for (let termIndex = 0; termIndex < terms.length; termIndex++) {
            if(terms[termIndex].includes(currentText)) break;
            if(termIndex === terms.length - 1) return false;
        }
    }

    return true;
}

const geneToolKitMostCommonlyUsedConfig: GeneToolKitTableCategory[] = [
    {
        name: "Classical and Insertion Alleles",
        interactiveTable: InteractiveTable.GeneClassicalInsertionAlleles,
        graphQLResultKey: "classicalAndInsertionsAlleles",
        subCategories: [
            {
                name: "Loss of function allele",
                filters: {
                    [GeneClassicalInsertionAllelesColumn.AlleleClass]: ["loss of function"],
                },
                graphQLFilter: result => [...result!].map(gene => ({
                    ...gene,
                    alleles: gene.alleles.filter(
                        allele => hasMatches(allele.classes.map(alleleClass => alleleClass.name!), "loss of function")
                    )
                }))
            },{
                name: "Amorphic allele",
                filters: {
                    [GeneClassicalInsertionAllelesColumn.AlleleClass]: ["amorphic"],
                },
                graphQLFilter: result => [...result!].map(gene => ({
                    ...gene,
                    alleles: gene.alleles.filter(
                        allele => hasMatches(allele.classes.map(alleleClass => alleleClass.name!), "amorphic")
                    )
                }))
            },{
                name: "Fluorescently-tagged allele",
                filters: {
                    [GeneClassicalInsertionAllelesColumn.AlleleClass]: ["fluorescent"],
                },
                graphQLFilter: result => [...result!].map(gene => ({
                    ...gene,
                    alleles: gene.alleles.filter(
                        allele => hasMatches(allele.classes.map(alleleClass => alleleClass.name!), "fluorescent")
                    )
                }))
            },
        ]
    },
    {
        name: "Transgenic Constructs",
        interactiveTable: InteractiveTable.GeneTransgenicConstructAlleles,
        graphQLResultKey: "transgenicConstructs",
        subCategories: [
            {
                name: "UAS RNAi",
                filters: {
                    [GeneTransgenicConstructAllelesColumn.TransgenicProductClass]: ["RNAi_reagent"],
                    [GeneTransgenicConstructAllelesColumn.RegRegions]: ["UAS"]
                },
                graphQLFilter: result => [...result!].map(gene => ({
                    ...gene,
                    alleles: gene.alleles.filter(allele =>
                        hasMatches(allele.transgenicProductClasses.map(tpc => tpc.transgenicProductClass!), "RNAi_reagent") &&
                        hasMatches(allele.regRegions!.map(region => region!.symbol!), "UAS")
                    )
                }))
            },{
                name: "UAS wild-type cDNA",
                filters: {
                    [GeneTransgenicConstructAllelesColumn.TransgenicProductClass]: ["cDNA", "wild_type"],
                    [GeneTransgenicConstructAllelesColumn.RegRegions]: ["UAS"]
                },
                graphQLFilter: result => [...result!].map(gene => ({
                    ...gene,
                    alleles: gene.alleles.filter(allele =>
                        hasMatches(allele.transgenicProductClasses.map(tpc => tpc.transgenicProductClass!), ["cDNA", "wild_type"]) &&
                        hasMatches(allele.regRegions!.map(region => region!.symbol!), "UAS")
                    )
                }))
            },{
                name: "Genomic rescue",
                filters: {
                    [GeneTransgenicConstructAllelesColumn.TransgenicProductClass]: ["genomic_DNA", "wild_type"],
                    [GeneTransgenicConstructAllelesColumn.RegRegions]: [fb_rc],
                    [GeneTransgenicConstructAllelesColumn.TaggedWith]: "",
                },
                graphQLFilter: result => [...result!].map(gene => ({
                    ...gene,
                    alleles: gene.alleles.filter(allele =>
                        hasMatches(allele.transgenicProductClasses.map(tpc => tpc.transgenicProductClass!), ["genomic_DNA", "wild_type"]) &&
                        hasMatches(allele.regRegions!.map(region => region!.symbol!), fb_rc) &&
                        allele.taggedWith?.length === 0
                    )
                }))
            },
        ]
    },
];

export default geneToolKitMostCommonlyUsedConfig;