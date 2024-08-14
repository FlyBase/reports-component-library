import {gql} from "../../__generated__";

const getAlleles = gql(/* GraphQL */ `
    query getSplitSystemCombinations($fbal_ids: [String]!) {
        splitSystemCombinations: splitSystemCombinationsByFbal(ids: $fbal_ids) {
            id
            pubCount
            symbol
            stocksCount
            componentAlleles {
                ...FullAllele
            }
        }
    }
`);

export default getAlleles;