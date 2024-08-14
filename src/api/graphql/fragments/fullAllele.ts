import {gql} from "../../../__generated__";

const FullAllele = gql(/* GraphQL */ `
    fragment FullAllele on Allele {
        id
        symbol
        isConstruct
        stocksCount
        pubCount
        knownLesion
        hasImage
        geneIsRegulatoryRegion
        mutagens {
            id
            name
        }
        classes {
            id
            name
        }
        insertions {
            id
            symbol
        }
        constructs {
            id
            symbol
        }
        insertedElementTypes {
            id
            name
        }
        regRegions {
            id
            symbol
        }
        encodedTools {
            id
            symbol
        }
        encodedToolUses {
            id
            name
        }
        taggedWith {
            id
            symbol
        }
        tagUses {
            id
            name
        }
        alsoCarries {
            id
            symbol
        }
    }
`);

export default FullAllele;