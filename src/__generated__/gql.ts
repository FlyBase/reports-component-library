/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    fragment FullAllele on Allele {\n        id\n        symbol\n        isConstruct\n        stocksCount\n        pubCount\n        knownLesion\n        hasImage\n        geneIsRegulatoryRegion\n        mutagens {\n            id\n            name\n        }\n        classes {\n            id\n            name\n        }\n        insertions {\n            id\n            symbol\n        }\n        constructs {\n            id\n            symbol\n        }\n        insertedElementTypes {\n            id\n            name\n        }\n        regRegions {\n            id\n            symbol\n        }\n        encodedTools {\n            id\n            symbol\n        }\n        encodedToolUses {\n            id\n            name\n        }\n        taggedWith {\n            id\n            symbol\n        }\n        tagUses {\n            id\n            name\n        }\n        alsoCarries {\n            id\n            symbol\n        }\n    }\n": types.FullAlleleFragmentDoc,
    "\n    query GeneToolKitMostCommonlyUsed($geneId: String) {\n        classicalAndInsertionsAlleles: genes(condition: { id: $geneId }) {\n            alleles(condition: {\n                isConstruct: false,\n                geneIsRegulatoryRegion: false\n            }) {\n                id\n                paperCount\n                stocksCount\n                pubCount\n                symbol\n                classes {\n                    name\n                }\n                tagUses {\n                    name\n                }\n            }\n        }\n\n        transgenicConstructs: genes(condition: { id: $geneId }) {\n            alleles(condition: {\n                isConstruct: true,\n                geneIsRegulatoryRegion:false\n            }) {\n                id\n                paperCount\n                stocksCount\n                pubCount\n                symbol\n                transgenicProductClasses {\n                    transgenicProductClass\n                }\n                classes {\n                    name\n                }\n                regRegions {\n                    symbol\n                }\n                taggedWith {\n                    symbol\n                }\n                tagUses {\n                    name\n                }\n            }\n        }\n    }\n": types.GeneToolKitMostCommonlyUsedDocument,
    "\n    query getAlleles($fbal_ids: [String]!) {\n        alleles: allelesByFbal(ids: $fbal_ids) {\n          ...FullAllele\n        }\n    }\n\n": types.GetAllelesDocument,
    "\n    query getSplitSystemCombinations($fbal_ids: [String]!) {\n        splitSystemCombinations: splitSystemCombinationsByFbal(ids: $fbal_ids) {\n            id\n            pubCount\n            symbol\n            stocksCount\n            componentAlleles {\n                ...FullAllele\n            }\n        }\n    }\n": types.GetSplitSystemCombinationsDocument,
    "\n    query findTools($expression: ExpressionSearchInput, $gene: String) {\n        alleles: searchExpressionTools(expression: $expression, gene: $gene) {\n            id\n            expression_terms {\n                id\n                name\n            }\n        }\n    }\n": types.FindToolsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment FullAllele on Allele {\n        id\n        symbol\n        isConstruct\n        stocksCount\n        pubCount\n        knownLesion\n        hasImage\n        geneIsRegulatoryRegion\n        mutagens {\n            id\n            name\n        }\n        classes {\n            id\n            name\n        }\n        insertions {\n            id\n            symbol\n        }\n        constructs {\n            id\n            symbol\n        }\n        insertedElementTypes {\n            id\n            name\n        }\n        regRegions {\n            id\n            symbol\n        }\n        encodedTools {\n            id\n            symbol\n        }\n        encodedToolUses {\n            id\n            name\n        }\n        taggedWith {\n            id\n            symbol\n        }\n        tagUses {\n            id\n            name\n        }\n        alsoCarries {\n            id\n            symbol\n        }\n    }\n"): (typeof documents)["\n    fragment FullAllele on Allele {\n        id\n        symbol\n        isConstruct\n        stocksCount\n        pubCount\n        knownLesion\n        hasImage\n        geneIsRegulatoryRegion\n        mutagens {\n            id\n            name\n        }\n        classes {\n            id\n            name\n        }\n        insertions {\n            id\n            symbol\n        }\n        constructs {\n            id\n            symbol\n        }\n        insertedElementTypes {\n            id\n            name\n        }\n        regRegions {\n            id\n            symbol\n        }\n        encodedTools {\n            id\n            symbol\n        }\n        encodedToolUses {\n            id\n            name\n        }\n        taggedWith {\n            id\n            symbol\n        }\n        tagUses {\n            id\n            name\n        }\n        alsoCarries {\n            id\n            symbol\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GeneToolKitMostCommonlyUsed($geneId: String) {\n        classicalAndInsertionsAlleles: genes(condition: { id: $geneId }) {\n            alleles(condition: {\n                isConstruct: false,\n                geneIsRegulatoryRegion: false\n            }) {\n                id\n                paperCount\n                stocksCount\n                pubCount\n                symbol\n                classes {\n                    name\n                }\n                tagUses {\n                    name\n                }\n            }\n        }\n\n        transgenicConstructs: genes(condition: { id: $geneId }) {\n            alleles(condition: {\n                isConstruct: true,\n                geneIsRegulatoryRegion:false\n            }) {\n                id\n                paperCount\n                stocksCount\n                pubCount\n                symbol\n                transgenicProductClasses {\n                    transgenicProductClass\n                }\n                classes {\n                    name\n                }\n                regRegions {\n                    symbol\n                }\n                taggedWith {\n                    symbol\n                }\n                tagUses {\n                    name\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GeneToolKitMostCommonlyUsed($geneId: String) {\n        classicalAndInsertionsAlleles: genes(condition: { id: $geneId }) {\n            alleles(condition: {\n                isConstruct: false,\n                geneIsRegulatoryRegion: false\n            }) {\n                id\n                paperCount\n                stocksCount\n                pubCount\n                symbol\n                classes {\n                    name\n                }\n                tagUses {\n                    name\n                }\n            }\n        }\n\n        transgenicConstructs: genes(condition: { id: $geneId }) {\n            alleles(condition: {\n                isConstruct: true,\n                geneIsRegulatoryRegion:false\n            }) {\n                id\n                paperCount\n                stocksCount\n                pubCount\n                symbol\n                transgenicProductClasses {\n                    transgenicProductClass\n                }\n                classes {\n                    name\n                }\n                regRegions {\n                    symbol\n                }\n                taggedWith {\n                    symbol\n                }\n                tagUses {\n                    name\n                }\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getAlleles($fbal_ids: [String]!) {\n        alleles: allelesByFbal(ids: $fbal_ids) {\n          ...FullAllele\n        }\n    }\n\n"): (typeof documents)["\n    query getAlleles($fbal_ids: [String]!) {\n        alleles: allelesByFbal(ids: $fbal_ids) {\n          ...FullAllele\n        }\n    }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getSplitSystemCombinations($fbal_ids: [String]!) {\n        splitSystemCombinations: splitSystemCombinationsByFbal(ids: $fbal_ids) {\n            id\n            pubCount\n            symbol\n            stocksCount\n            componentAlleles {\n                ...FullAllele\n            }\n        }\n    }\n"): (typeof documents)["\n    query getSplitSystemCombinations($fbal_ids: [String]!) {\n        splitSystemCombinations: splitSystemCombinationsByFbal(ids: $fbal_ids) {\n            id\n            pubCount\n            symbol\n            stocksCount\n            componentAlleles {\n                ...FullAllele\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query findTools($expression: ExpressionSearchInput, $gene: String) {\n        alleles: searchExpressionTools(expression: $expression, gene: $gene) {\n            id\n            expression_terms {\n                id\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    query findTools($expression: ExpressionSearchInput, $gene: String) {\n        alleles: searchExpressionTools(expression: $expression, gene: $gene) {\n            id\n            expression_terms {\n                id\n                name\n            }\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;