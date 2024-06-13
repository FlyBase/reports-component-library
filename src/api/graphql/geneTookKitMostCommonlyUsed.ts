import {gql} from "../../__generated__";

const geneTookKitMostCommonlyUsed = gql(/* GraphQL */ `
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
                tagUses {
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
                pubCount
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
                tagUses {
                    name
                }
            }
        }
    }
`);

export default geneTookKitMostCommonlyUsed;