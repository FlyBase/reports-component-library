import {
    InteractiveTable,
    InteractiveTableColumns
} from "../../api/graphql/types/interactiveTableDefinitions/interactiveTableTypes";
import {GeneToolKitMostCommonlyUsedQuery} from "../../__generated__/graphql";
import {QueryResultKeys} from "../../api/graphql/types/graphqlApiTypes";


export type MostCommonlyUsedAllele = {
    id: string;
    symbol: string;
    stocksCount: string | number;
};

/*
* This type defines the structure for the config that controls the most commonly used table.
*
* It uses some advanced typescript concepts (explained below), but essentially handles type inference for you,
* so that you do not need to specify the generic types for each of your categories when instantiating a config
* object for the table.
*
* For example, if you choose the "Transgenic Constructs" table, then the type checking should know that the
* subCategories.filters should refer to the columns within the Transgenic Constructs table
* */
export type GeneToolKitTableCategory<
    // Setting the default type allows for use with object literals, for example a GeneToolKitTableCategory[]
    Table extends InteractiveTable = InteractiveTable,
    ResultKey extends QueryResultKeys<GeneToolKitMostCommonlyUsedQuery> = QueryResultKeys<GeneToolKitMostCommonlyUsedQuery>
> = (
    /* Typescript does not automatically differentiate between a union type, and the specific type used with a generic.
     * The following lines take advantage of conditional typings "distributive" properties. If a generic type is a
     * union (or an enum), references to that type within the conditional statement will loop through the individual
     * options of that union.
     *
     *
     * For example:
     * type WithoutDistributing<T> = { property: T, sameTypeAsProperty: T };
     * type WithDistributing<T> = T extends any ? { prop: T, sameTypeAsProperty: T  } : never;
     *
     * type FooOrBar = "foo" | "bar";
     *
     * type FooOrBarWithoutDistributing = WithoutDistributing<FooOrBar>;
     *      // equivalent to: { property: "foo" | "bar", sameTypeAsProperty: "foo" | "bar" }
     * type FooOrBarWithDistributing = WithDistributing<FooOrBar>;
     *      // equivalent to: { property: "foo", sameTypeAsProperty: "foo" } | { property: "bar", sameTypeAsProperty: "bar" }
     *
     * It is important to note that these two resulting types are NOT equivalent to each other.
     * The object "{ property: "foo", sameTypeAsProperty: "bar" }" would pass the type checking
     * for the first type, but not the second type.
     */
    Table extends any ?
    ResultKey extends any ? (
        {
            name: string;
            interactiveTable: Table;
            graphQLResultKey: ResultKey; // Which sub query to use
            subCategories: {
                name: string;
                filters: {
                    // For any column in the table, provide a list of filter text
                    [key in InteractiveTableColumns[Table]]?: string | string[];
                };
                graphQLFilter: (result: GeneToolKitMostCommonlyUsedQuery[ResultKey]) => GeneToolKitMostCommonlyUsedQuery[ResultKey]
                count?: number;
                mostCommonlyUsed?: MostCommonlyUsedAllele[];
            }[]
        }
    ) : never : never
);


