import {gql} from "../../__generated__";

const geneTookKitMostCommonlyUsed = gql(`
    query GeneToolKitMostCommonlyUsed($geneId: String) {
        classicalAndInsertionsAlleles: genes(condition: { id: $geneId }) {
            alleles(condition: {
                isConstruct: false,
                geneIsRegulatoryRegion: false
            }) {
                id
                paperCount
                stocksCount
                pubCount
                symbol
                classes {
                    name
                }
            }
        }

        transgenicConstructs: genes(condition: { id: $geneId }) {
            alleles(condition: {
                isConstruct: true,
                geneIsRegulatoryRegion:false
            }) {
                id
                paperCount
                stocksCount
                symbol
                transgenicProductClasses {
                    transgenicProductClass
                }
                classes {
                    name
                }
                regRegions {
                    symbol
                }
                taggedWith {
                    symbol
                }
            }
        }
    }
`);

export default geneTookKitMostCommonlyUsed;