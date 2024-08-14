import {gql} from "../../__generated__";

const searchExpressionTools = gql(/* GraphQL */ `
    query findTools($expression: ExpressionSearchInput, $gene: String) {
        alleles: searchExpressionTools(expression: $expression, gene: $gene) {
            id
            expression_terms {
                id
                name
            }
        }
    }
`);

export default searchExpressionTools;