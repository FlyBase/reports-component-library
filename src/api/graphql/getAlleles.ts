import {gql} from "../../__generated__";

const getAlleles = gql(/* GraphQL */ `
    query getAlleles($fbal_ids: [String]!) {
        alleles: allelesByFbal(ids: $fbal_ids) {
          ...FullAllele
        }
    }

`);

export default getAlleles;