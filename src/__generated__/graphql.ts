/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: { input: any; output: any; }
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: { input: any; output: any; }
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Allele = Node & {
  __typename?: 'Allele';
  /** Reads and enables pagination through a set of `AlleleClass`. */
  alleleClassesConnection: AlleleClassesConnection;
  /** Reads and enables pagination through a set of `AlleleMutagen`. */
  alleleMutagensConnection: AlleleMutagensConnection;
  /** Reads and enables pagination through a set of `AlleleStock`. */
  alleleStocksConnection: AlleleStocksConnection;
  /** Reads and enables pagination through a set of `AlleleTransgenicProductClass`. */
  alleleTransgenicProductClassesConnection: AlleleTransgenicProductClassesConnection;
  alsoCarries?: Maybe<Array<Maybe<Tool>>>;
  /** Reads and enables pagination through a set of `AlleleClass`. */
  classes: Array<AlleleClass>;
  /** Reads and enables pagination through a set of `Construct`. */
  constructs: Array<Construct>;
  /** Reads and enables pagination through a set of `Construct`. */
  constructsConnection: ConstructsConnection;
  encodedToolUses?: Maybe<Array<Maybe<ToolUse>>>;
  encodedTools?: Maybe<Array<Maybe<Tool>>>;
  /** Reads a single `Gene` that is related to this `Allele`. */
  gene?: Maybe<Gene>;
  geneId?: Maybe<Scalars['Int']['output']>;
  geneIsRegulatoryRegion?: Maybe<Scalars['Boolean']['output']>;
  hasImage?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  insertedElementTypes?: Maybe<Array<Maybe<ToolUse>>>;
  /** Reads and enables pagination through a set of `Insertion`. */
  insertions: Array<Insertion>;
  /** Reads and enables pagination through a set of `Insertion`. */
  insertionsConnection: InsertionsConnection;
  isAlleleof?: Maybe<Scalars['Boolean']['output']>;
  isConstruct?: Maybe<Scalars['Boolean']['output']>;
  knownLesion?: Maybe<Scalars['Boolean']['output']>;
  /** Reads and enables pagination through a set of `AlleleMutagen`. */
  mutagens: Array<AlleleMutagen>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  paperCount?: Maybe<Scalars['BigInt']['output']>;
  postgresId: Scalars['Int']['output'];
  propagateTransgenicUses?: Maybe<Scalars['Boolean']['output']>;
  pubCount?: Maybe<Scalars['BigInt']['output']>;
  regRegions?: Maybe<Array<Maybe<Tool>>>;
  /** Reads and enables pagination through a set of `AlleleStock`. */
  stocks: Array<AlleleStock>;
  stocksCount?: Maybe<Scalars['BigInt']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  tagUses?: Maybe<Array<Maybe<ToolUse>>>;
  taggedWith?: Maybe<Array<Maybe<Tool>>>;
  /** Reads and enables pagination through a set of `ToolUse`. */
  toolUses: Array<ToolUse>;
  /** Reads and enables pagination through a set of `ToolUse`. */
  toolUsesConnection: ToolUsesConnection;
  /** Reads and enables pagination through a set of `Tool`. */
  tools: Array<Tool>;
  /** Reads and enables pagination through a set of `Tool`. */
  toolsConnection: ToolsConnection;
  /** Reads and enables pagination through a set of `AlleleTransgenicProductClass`. */
  transgenicProductClasses: Array<AlleleTransgenicProductClass>;
};


export type AlleleAlleleClassesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AlleleClassCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleClassesOrderBy>>;
};


export type AlleleAlleleMutagensConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AlleleMutagenCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleMutagensOrderBy>>;
};


export type AlleleAlleleStocksConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AlleleStockCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleStocksOrderBy>>;
};


export type AlleleAlleleTransgenicProductClassesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AlleleTransgenicProductClassCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleTransgenicProductClassesOrderBy>>;
};


export type AlleleClassesArgs = {
  condition?: InputMaybe<AlleleClassCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleClassesOrderBy>>;
};


export type AlleleConstructsArgs = {
  condition?: InputMaybe<ConstructCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ConstructsOrderBy>>;
};


export type AlleleConstructsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ConstructCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ConstructsOrderBy>>;
};


export type AlleleInsertionsArgs = {
  condition?: InputMaybe<InsertionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InsertionsOrderBy>>;
};


export type AlleleInsertionsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InsertionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InsertionsOrderBy>>;
};


export type AlleleMutagensArgs = {
  condition?: InputMaybe<AlleleMutagenCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleMutagensOrderBy>>;
};


export type AlleleStocksArgs = {
  condition?: InputMaybe<AlleleStockCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleStocksOrderBy>>;
};


export type AlleleToolUsesArgs = {
  condition?: InputMaybe<ToolUseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolUsesOrderBy>>;
};


export type AlleleToolUsesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ToolUseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolUsesOrderBy>>;
};


export type AlleleToolsArgs = {
  condition?: InputMaybe<ToolCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolsOrderBy>>;
};


export type AlleleToolsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ToolCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolsOrderBy>>;
};


export type AlleleTransgenicProductClassesArgs = {
  condition?: InputMaybe<AlleleTransgenicProductClassCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleTransgenicProductClassesOrderBy>>;
};

export type AlleleClass = Node & {
  __typename?: 'AlleleClass';
  /** Reads a single `Allele` that is related to this `AlleleClass`. */
  allele?: Maybe<Allele>;
  alleleId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  postgresId: Scalars['Int']['output'];
};

/**
 * A condition to be used against `AlleleClass` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AlleleClassCondition = {
  /** Checks for equality with the object’s `alleleId` field. */
  alleleId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `postgresId` field. */
  postgresId?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `AlleleClass` values. */
export type AlleleClassesConnection = {
  __typename?: 'AlleleClassesConnection';
  /** A list of edges which contains the `AlleleClass` and cursor to aid in pagination. */
  edges: Array<AlleleClassesEdge>;
  /** A list of `AlleleClass` objects. */
  nodes: Array<AlleleClass>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AlleleClass` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AlleleClass` edge in the connection. */
export type AlleleClassesEdge = {
  __typename?: 'AlleleClassesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AlleleClass` at the end of the edge. */
  node: AlleleClass;
};

/** Methods to use when ordering `AlleleClass`. */
export enum AlleleClassesOrderBy {
  AlleleIdAsc = 'ALLELE_ID_ASC',
  AlleleIdDesc = 'ALLELE_ID_DESC',
  FbcvIdAsc = 'FBCV_ID_ASC',
  FbcvIdDesc = 'FBCV_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `Allele` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AlleleCondition = {
  /** Checks for equality with the object’s `geneId` field. */
  geneId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `geneIsRegulatoryRegion` field. */
  geneIsRegulatoryRegion?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `hasImage` field. */
  hasImage?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `isAlleleof` field. */
  isAlleleof?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `isConstruct` field. */
  isConstruct?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `knownLesion` field. */
  knownLesion?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `paperCount` field. */
  paperCount?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `postgresId` field. */
  postgresId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `propagateTransgenicUses` field. */
  propagateTransgenicUses?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `pubCount` field. */
  pubCount?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `stocksCount` field. */
  stocksCount?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `symbol` field. */
  symbol?: InputMaybe<Scalars['String']['input']>;
};

export type AlleleDiseaseVariant = Node & {
  __typename?: 'AlleleDiseaseVariant';
  alleleDiseaseVariantId: Scalars['BigInt']['output'];
  comment?: Maybe<Scalars['JSON']['output']>;
  dbxref?: Maybe<Scalars['JSON']['output']>;
  divDesignation?: Maybe<Scalars['String']['output']>;
  divSynonym?: Maybe<Scalars['JSON']['output']>;
  fbalId?: Maybe<Scalars['String']['output']>;
  fbalPubs?: Maybe<Scalars['JSON']['output']>;
  fbalSymbol?: Maybe<Scalars['String']['output']>;
  fbgnId?: Maybe<Scalars['String']['output']>;
  fbgnSymbol?: Maybe<Scalars['String']['output']>;
  fbhhId?: Maybe<Scalars['String']['output']>;
  fbhhSymbol?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  pubs?: Maybe<Scalars['JSON']['output']>;
};

/**
 * A condition to be used against `AlleleDiseaseVariant` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type AlleleDiseaseVariantCondition = {
  /** Checks for equality with the object’s `alleleDiseaseVariantId` field. */
  alleleDiseaseVariantId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `fbalId` field. */
  fbalId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fbgnId` field. */
  fbgnId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fbhhId` field. */
  fbhhId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `AlleleDiseaseVariant` values. */
export type AlleleDiseaseVariantsConnection = {
  __typename?: 'AlleleDiseaseVariantsConnection';
  /** A list of edges which contains the `AlleleDiseaseVariant` and cursor to aid in pagination. */
  edges: Array<AlleleDiseaseVariantsEdge>;
  /** A list of `AlleleDiseaseVariant` objects. */
  nodes: Array<AlleleDiseaseVariant>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AlleleDiseaseVariant` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AlleleDiseaseVariant` edge in the connection. */
export type AlleleDiseaseVariantsEdge = {
  __typename?: 'AlleleDiseaseVariantsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AlleleDiseaseVariant` at the end of the edge. */
  node: AlleleDiseaseVariant;
};

/** Methods to use when ordering `AlleleDiseaseVariant`. */
export enum AlleleDiseaseVariantsOrderBy {
  AlleleDiseaseVariantIdAsc = 'ALLELE_DISEASE_VARIANT_ID_ASC',
  AlleleDiseaseVariantIdDesc = 'ALLELE_DISEASE_VARIANT_ID_DESC',
  FbalIdAsc = 'FBAL_ID_ASC',
  FbalIdDesc = 'FBAL_ID_DESC',
  FbgnIdAsc = 'FBGN_ID_ASC',
  FbgnIdDesc = 'FBGN_ID_DESC',
  FbhhIdAsc = 'FBHH_ID_ASC',
  FbhhIdDesc = 'FBHH_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type AlleleMutagen = Node & {
  __typename?: 'AlleleMutagen';
  /** Reads a single `Allele` that is related to this `AlleleMutagen`. */
  allele?: Maybe<Allele>;
  alleleId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  postgresId: Scalars['Int']['output'];
};

/**
 * A condition to be used against `AlleleMutagen` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AlleleMutagenCondition = {
  /** Checks for equality with the object’s `alleleId` field. */
  alleleId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `postgresId` field. */
  postgresId?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `AlleleMutagen` values. */
export type AlleleMutagensConnection = {
  __typename?: 'AlleleMutagensConnection';
  /** A list of edges which contains the `AlleleMutagen` and cursor to aid in pagination. */
  edges: Array<AlleleMutagensEdge>;
  /** A list of `AlleleMutagen` objects. */
  nodes: Array<AlleleMutagen>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AlleleMutagen` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AlleleMutagen` edge in the connection. */
export type AlleleMutagensEdge = {
  __typename?: 'AlleleMutagensEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AlleleMutagen` at the end of the edge. */
  node: AlleleMutagen;
};

/** Methods to use when ordering `AlleleMutagen`. */
export enum AlleleMutagensOrderBy {
  AlleleIdAsc = 'ALLELE_ID_ASC',
  AlleleIdDesc = 'ALLELE_ID_DESC',
  FbcvIdAsc = 'FBCV_ID_ASC',
  FbcvIdDesc = 'FBCV_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type AlleleStock = Node & {
  __typename?: 'AlleleStock';
  /** Reads a single `Allele` that is related to this `AlleleStock`. */
  allele?: Maybe<Allele>;
  alleleId?: Maybe<Scalars['Int']['output']>;
  center?: Maybe<Scalars['String']['output']>;
  genotype?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  postgresId: Scalars['Int']['output'];
  stockNumber?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `AlleleStock` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AlleleStockCondition = {
  /** Checks for equality with the object’s `alleleId` field. */
  alleleId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `center` field. */
  center?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `genotype` field. */
  genotype?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `postgresId` field. */
  postgresId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `stockNumber` field. */
  stockNumber?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `AlleleStock` values. */
export type AlleleStocksConnection = {
  __typename?: 'AlleleStocksConnection';
  /** A list of edges which contains the `AlleleStock` and cursor to aid in pagination. */
  edges: Array<AlleleStocksEdge>;
  /** A list of `AlleleStock` objects. */
  nodes: Array<AlleleStock>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AlleleStock` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AlleleStock` edge in the connection. */
export type AlleleStocksEdge = {
  __typename?: 'AlleleStocksEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AlleleStock` at the end of the edge. */
  node: AlleleStock;
};

/** Methods to use when ordering `AlleleStock`. */
export enum AlleleStocksOrderBy {
  AlleleIdAsc = 'ALLELE_ID_ASC',
  AlleleIdDesc = 'ALLELE_ID_DESC',
  CenterAsc = 'CENTER_ASC',
  CenterDesc = 'CENTER_DESC',
  FbstIdAsc = 'FBST_ID_ASC',
  FbstIdDesc = 'FBST_ID_DESC',
  GenotypeAsc = 'GENOTYPE_ASC',
  GenotypeDesc = 'GENOTYPE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StockNumberAsc = 'STOCK_NUMBER_ASC',
  StockNumberDesc = 'STOCK_NUMBER_DESC'
}

export type AlleleTransgenicProductClass = Node & {
  __typename?: 'AlleleTransgenicProductClass';
  /** Reads a single `Allele` that is related to this `AlleleTransgenicProductClass`. */
  allele?: Maybe<Allele>;
  alleleId: Scalars['Int']['output'];
  id?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  soId: Scalars['String']['output'];
  transgenicProductClass?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `AlleleTransgenicProductClass` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type AlleleTransgenicProductClassCondition = {
  /** Checks for equality with the object’s `alleleId` field. */
  alleleId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `soId` field. */
  soId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `transgenicProductClass` field. */
  transgenicProductClass?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `AlleleTransgenicProductClass` values. */
export type AlleleTransgenicProductClassesConnection = {
  __typename?: 'AlleleTransgenicProductClassesConnection';
  /** A list of edges which contains the `AlleleTransgenicProductClass` and cursor to aid in pagination. */
  edges: Array<AlleleTransgenicProductClassesEdge>;
  /** A list of `AlleleTransgenicProductClass` objects. */
  nodes: Array<AlleleTransgenicProductClass>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AlleleTransgenicProductClass` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AlleleTransgenicProductClass` edge in the connection. */
export type AlleleTransgenicProductClassesEdge = {
  __typename?: 'AlleleTransgenicProductClassesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AlleleTransgenicProductClass` at the end of the edge. */
  node: AlleleTransgenicProductClass;
};

/** Methods to use when ordering `AlleleTransgenicProductClass`. */
export enum AlleleTransgenicProductClassesOrderBy {
  AlleleIdAsc = 'ALLELE_ID_ASC',
  AlleleIdDesc = 'ALLELE_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SoIdAsc = 'SO_ID_ASC',
  SoIdDesc = 'SO_ID_DESC',
  TransgenicProductClassAsc = 'TRANSGENIC_PRODUCT_CLASS_ASC',
  TransgenicProductClassDesc = 'TRANSGENIC_PRODUCT_CLASS_DESC'
}

/** A connection to a list of `Allele` values. */
export type AllelesConnection = {
  __typename?: 'AllelesConnection';
  /** A list of edges which contains the `Allele` and cursor to aid in pagination. */
  edges: Array<AllelesEdge>;
  /** A list of `Allele` objects. */
  nodes: Array<Allele>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Allele` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Allele` edge in the connection. */
export type AllelesEdge = {
  __typename?: 'AllelesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Allele` at the end of the edge. */
  node: Allele;
};

/** Methods to use when ordering `Allele`. */
export enum AllelesOrderBy {
  FbalIdAsc = 'FBAL_ID_ASC',
  FbalIdDesc = 'FBAL_ID_DESC',
  GeneIdAsc = 'GENE_ID_ASC',
  GeneIdDesc = 'GENE_ID_DESC',
  GeneIsRegulatoryRegionAsc = 'GENE_IS_REGULATORY_REGION_ASC',
  GeneIsRegulatoryRegionDesc = 'GENE_IS_REGULATORY_REGION_DESC',
  HasImageAsc = 'HAS_IMAGE_ASC',
  HasImageDesc = 'HAS_IMAGE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsAlleleofAsc = 'IS_ALLELEOF_ASC',
  IsAlleleofDesc = 'IS_ALLELEOF_DESC',
  IsConstructAsc = 'IS_CONSTRUCT_ASC',
  IsConstructDesc = 'IS_CONSTRUCT_DESC',
  KnownLesionAsc = 'KNOWN_LESION_ASC',
  KnownLesionDesc = 'KNOWN_LESION_DESC',
  Natural = 'NATURAL',
  PaperCountAsc = 'PAPER_COUNT_ASC',
  PaperCountDesc = 'PAPER_COUNT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PropagateTransgenicUsesAsc = 'PROPAGATE_TRANSGENIC_USES_ASC',
  PropagateTransgenicUsesDesc = 'PROPAGATE_TRANSGENIC_USES_DESC',
  PubCountAsc = 'PUB_COUNT_ASC',
  PubCountDesc = 'PUB_COUNT_DESC',
  StocksCountAsc = 'STOCKS_COUNT_ASC',
  StocksCountDesc = 'STOCKS_COUNT_DESC',
  SymbolAsc = 'SYMBOL_ASC',
  SymbolDesc = 'SYMBOL_DESC'
}

export type AllianceAllele = {
  __typename?: 'AllianceAllele';
  category?: Maybe<Scalars['String']['output']>;
  hasDisease?: Maybe<Scalars['Boolean']['output']>;
  hasPhenotype?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  symbol?: Maybe<Scalars['String']['output']>;
  synonyms?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  variants?: Maybe<Array<Maybe<AllianceVariant>>>;
};

export type AllianceCvTerm = {
  __typename?: 'AllianceCVTerm';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type AllianceLocation = {
  __typename?: 'AllianceLocation';
  assembly?: Maybe<Scalars['String']['output']>;
  chromosome?: Maybe<Scalars['String']['output']>;
  end?: Maybe<Scalars['Int']['output']>;
  start?: Maybe<Scalars['Int']['output']>;
  strand?: Maybe<Scalars['String']['output']>;
};

export type AllianceVariant = {
  __typename?: 'AllianceVariant';
  consequence?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  genomicReferenceSequence?: Maybe<Scalars['String']['output']>;
  genomicVariantSequence?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<AllianceLocation>;
  name?: Maybe<Scalars['String']['output']>;
  nucleotideChange?: Maybe<Scalars['String']['output']>;
  transcriptList?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  variantType?: Maybe<AllianceCvTerm>;
};

export type AllianceVariantFilters = {
  id?: InputMaybe<Scalars['String']['input']>;
  params?: InputMaybe<Array<InputMaybe<AllianceVariantParameters>>>;
};

export type AllianceVariantParameters = {
  filter_variantConsequence?: InputMaybe<Scalars['String']['input']>;
  filter_variantType?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type AllianceVariantsByAllele = {
  filter_variantConsequence?: InputMaybe<Scalars['String']['input']>;
  filter_variantType?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type AllianceVariantsByGene = {
  asc?: InputMaybe<Scalars['String']['input']>;
  filter_disease?: InputMaybe<Scalars['String']['input']>;
  filter_phenotype?: InputMaybe<Scalars['String']['input']>;
  filter_source?: InputMaybe<Scalars['String']['input']>;
  filter_symbol?: InputMaybe<Scalars['String']['input']>;
  filter_synonym?: InputMaybe<Scalars['String']['input']>;
  filter_variantConsequence?: InputMaybe<Scalars['String']['input']>;
  filter_variantType?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type Construct = Node & {
  __typename?: 'Construct';
  /** Reads a single `Allele` that is related to this `Construct`. */
  allele?: Maybe<Allele>;
  alleleId?: Maybe<Scalars['BigInt']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Insertion` that is related to this `Construct`. */
  insertion?: Maybe<Insertion>;
  insertionId?: Maybe<Scalars['BigInt']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  postgresId: Scalars['Int']['output'];
  symbol?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `ToolUse`. */
  toolUses: Array<ToolUse>;
  /** Reads and enables pagination through a set of `ToolUse`. */
  toolUsesConnection: ToolUsesConnection;
  /** Reads and enables pagination through a set of `Tool`. */
  tools: Array<Tool>;
  /** Reads and enables pagination through a set of `Tool`. */
  toolsConnection: ToolsConnection;
};


export type ConstructToolUsesArgs = {
  condition?: InputMaybe<ToolUseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolUsesOrderBy>>;
};


export type ConstructToolUsesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ToolUseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolUsesOrderBy>>;
};


export type ConstructToolsArgs = {
  condition?: InputMaybe<ToolCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolsOrderBy>>;
};


export type ConstructToolsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ToolCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolsOrderBy>>;
};

/**
 * A condition to be used against `Construct` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ConstructCondition = {
  /** Checks for equality with the object’s `alleleId` field. */
  alleleId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `insertionId` field. */
  insertionId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `postgresId` field. */
  postgresId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `symbol` field. */
  symbol?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Construct` values. */
export type ConstructsConnection = {
  __typename?: 'ConstructsConnection';
  /** A list of edges which contains the `Construct` and cursor to aid in pagination. */
  edges: Array<ConstructsEdge>;
  /** A list of `Construct` objects. */
  nodes: Array<Construct>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Construct` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Construct` edge in the connection. */
export type ConstructsEdge = {
  __typename?: 'ConstructsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Construct` at the end of the edge. */
  node: Construct;
};

/** Methods to use when ordering `Construct`. */
export enum ConstructsOrderBy {
  AlleleIdAsc = 'ALLELE_ID_ASC',
  AlleleIdDesc = 'ALLELE_ID_DESC',
  FbtpIdAsc = 'FBTP_ID_ASC',
  FbtpIdDesc = 'FBTP_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  InsertionIdAsc = 'INSERTION_ID_ASC',
  InsertionIdDesc = 'INSERTION_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SymbolAsc = 'SYMBOL_ASC',
  SymbolDesc = 'SYMBOL_DESC'
}

export type ExpressionSearchInput = {
  anatomy?: InputMaybe<Scalars['String']['input']>;
  anatomyq?: InputMaybe<Scalars['String']['input']>;
  stage?: InputMaybe<Scalars['String']['input']>;
  stageq?: InputMaybe<Scalars['String']['input']>;
  subcellular?: InputMaybe<Scalars['String']['input']>;
  subcellularq?: InputMaybe<Scalars['String']['input']>;
};

export type ExpressionToolSearchResult = {
  __typename?: 'ExpressionToolSearchResult';
  expression_terms: Array<Maybe<AllianceCvTerm>>;
  id: Scalars['ID']['output'];
};

export type FeatureCvterm = {
  __typename?: 'FeatureCvterm';
  cvtermId: Scalars['Int']['output'];
  featureCvtermId: Scalars['Int']['output'];
  featureId: Scalars['Int']['output'];
  isNot: Scalars['Boolean']['output'];
  pubId: Scalars['Int']['output'];
};

/** A connection to a list of `FeatureCvterm` values. */
export type FeatureCvtermsConnection = {
  __typename?: 'FeatureCvtermsConnection';
  /** A list of edges which contains the `FeatureCvterm` and cursor to aid in pagination. */
  edges: Array<FeatureCvtermsEdge>;
  /** A list of `FeatureCvterm` objects. */
  nodes: Array<FeatureCvterm>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FeatureCvterm` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `FeatureCvterm` edge in the connection. */
export type FeatureCvtermsEdge = {
  __typename?: 'FeatureCvtermsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `FeatureCvterm` at the end of the edge. */
  node: FeatureCvterm;
};

export type Featureprop = {
  __typename?: 'Featureprop';
  featureId: Scalars['Int']['output'];
  featurepropId: Scalars['Int']['output'];
  rank: Scalars['Int']['output'];
  typeId: Scalars['Int']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

/** A connection to a list of `Featureprop` values. */
export type FeaturepropsConnection = {
  __typename?: 'FeaturepropsConnection';
  /** A list of edges which contains the `Featureprop` and cursor to aid in pagination. */
  edges: Array<FeaturepropsEdge>;
  /** A list of `Featureprop` objects. */
  nodes: Array<Featureprop>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Featureprop` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Featureprop` edge in the connection. */
export type FeaturepropsEdge = {
  __typename?: 'FeaturepropsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Featureprop` at the end of the edge. */
  node: Featureprop;
};

export type Gene = Node & {
  __typename?: 'Gene';
  /** Reads and enables pagination through a set of `Allele`. */
  alleles: Array<Allele>;
  /** Reads and enables pagination through a set of `Allele`. */
  allelesConnection: AllelesConnection;
  dbxrefId?: Maybe<Scalars['Int']['output']>;
  featureId: Scalars['Int']['output'];
  id?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Insertion`. */
  insertions: Array<Insertion>;
  /** Reads and enables pagination through a set of `Insertion`. */
  insertionsConnection: InsertionsConnection;
  isAnalysis?: Maybe<Scalars['Boolean']['output']>;
  isObsolete?: Maybe<Scalars['Boolean']['output']>;
  md5Checksum?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  organismId?: Maybe<Scalars['Int']['output']>;
  residues?: Maybe<Scalars['String']['output']>;
  seqlen?: Maybe<Scalars['Int']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  timeaccessioned?: Maybe<Scalars['Datetime']['output']>;
  timelastmodified?: Maybe<Scalars['Datetime']['output']>;
  typeId?: Maybe<Scalars['Int']['output']>;
};


export type GeneAllelesArgs = {
  condition?: InputMaybe<AlleleCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AllelesOrderBy>>;
};


export type GeneAllelesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AlleleCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AllelesOrderBy>>;
};


export type GeneInsertionsArgs = {
  condition?: InputMaybe<InsertionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InsertionsOrderBy>>;
};


export type GeneInsertionsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InsertionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InsertionsOrderBy>>;
};

/** A condition to be used against `Gene` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type GeneCondition = {
  /** Checks for equality with the object’s `featureId` field. */
  featureId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `symbol` field. */
  symbol?: InputMaybe<Scalars['String']['input']>;
};

export type GeneGroupMembership = {
  __typename?: 'GeneGroupMembership';
  geneGroups?: Maybe<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  otherPathways?: Maybe<Scalars['JSON']['output']>;
  /** Reads a single `PathwayMember` that is related to this `GeneGroupMembership`. */
  pathwayMember?: Maybe<PathwayMember>;
  pathwayMemberId?: Maybe<Scalars['Int']['output']>;
};

/**
 * A condition to be used against `GeneGroupMembership` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type GeneGroupMembershipCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `pathwayMemberId` field. */
  pathwayMemberId?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `GeneGroupMembership` values. */
export type GeneGroupMembershipsConnection = {
  __typename?: 'GeneGroupMembershipsConnection';
  /** A list of edges which contains the `GeneGroupMembership` and cursor to aid in pagination. */
  edges: Array<GeneGroupMembershipsEdge>;
  /** A list of `GeneGroupMembership` objects. */
  nodes: Array<GeneGroupMembership>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GeneGroupMembership` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `GeneGroupMembership` edge in the connection. */
export type GeneGroupMembershipsEdge = {
  __typename?: 'GeneGroupMembershipsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `GeneGroupMembership` at the end of the edge. */
  node: GeneGroupMembership;
};

/** Methods to use when ordering `GeneGroupMembership`. */
export enum GeneGroupMembershipsOrderBy {
  FbgnIdAsc = 'FBGN_ID_ASC',
  FbgnIdDesc = 'FBGN_ID_DESC',
  Natural = 'NATURAL',
  PathwayMemberIdAsc = 'PATHWAY_MEMBER_ID_ASC',
  PathwayMemberIdDesc = 'PATHWAY_MEMBER_ID_DESC'
}

/** A connection to a list of `Gene` values. */
export type GenesConnection = {
  __typename?: 'GenesConnection';
  /** A list of edges which contains the `Gene` and cursor to aid in pagination. */
  edges: Array<GenesEdge>;
  /** A list of `Gene` objects. */
  nodes: Array<Gene>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Gene` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Gene` edge in the connection. */
export type GenesEdge = {
  __typename?: 'GenesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Gene` at the end of the edge. */
  node: Gene;
};

/** Methods to use when ordering `Gene`. */
export enum GenesOrderBy {
  FeatureIdAsc = 'FEATURE_ID_ASC',
  FeatureIdDesc = 'FEATURE_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UniquenameAsc = 'UNIQUENAME_ASC',
  UniquenameDesc = 'UNIQUENAME_DESC'
}

export type Grpmemberprop = {
  __typename?: 'Grpmemberprop';
  grpmemberId: Scalars['Int']['output'];
  grpmemberpropId: Scalars['Int']['output'];
  rank: Scalars['Int']['output'];
  typeId: Scalars['Int']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

/** A connection to a list of `Grpmemberprop` values. */
export type GrpmemberpropsConnection = {
  __typename?: 'GrpmemberpropsConnection';
  /** A list of edges which contains the `Grpmemberprop` and cursor to aid in pagination. */
  edges: Array<GrpmemberpropsEdge>;
  /** A list of `Grpmemberprop` objects. */
  nodes: Array<Grpmemberprop>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Grpmemberprop` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Grpmemberprop` edge in the connection. */
export type GrpmemberpropsEdge = {
  __typename?: 'GrpmemberpropsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Grpmemberprop` at the end of the edge. */
  node: Grpmemberprop;
};

export type Insertion = Node & {
  __typename?: 'Insertion';
  /** Reads a single `Allele` that is related to this `Insertion`. */
  allele?: Maybe<Allele>;
  alleleId?: Maybe<Scalars['BigInt']['output']>;
  alsoCarries?: Maybe<Array<Maybe<Tool>>>;
  /** Reads and enables pagination through a set of `Construct`. */
  constructs: Array<Construct>;
  /** Reads and enables pagination through a set of `Construct`. */
  constructsConnection: ConstructsConnection;
  encodedToolUses?: Maybe<Array<Maybe<ToolUse>>>;
  encodedTools?: Maybe<Array<Maybe<Tool>>>;
  /** Reads a single `Gene` that is related to this `Insertion`. */
  gene?: Maybe<Gene>;
  geneId?: Maybe<Scalars['BigInt']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  insertedElementTypes?: Maybe<Array<Maybe<ToolUse>>>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  postgresId: Scalars['Int']['output'];
  pubCount?: Maybe<Scalars['BigInt']['output']>;
  regRegions?: Maybe<Array<Maybe<Tool>>>;
  stocksCount?: Maybe<Scalars['BigInt']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  tagUses?: Maybe<Array<Maybe<ToolUse>>>;
  taggedWith?: Maybe<Array<Maybe<Tool>>>;
};


export type InsertionConstructsArgs = {
  condition?: InputMaybe<ConstructCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ConstructsOrderBy>>;
};


export type InsertionConstructsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ConstructCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ConstructsOrderBy>>;
};

/**
 * A condition to be used against `Insertion` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type InsertionCondition = {
  /** Checks for equality with the object’s `alleleId` field. */
  alleleId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `geneId` field. */
  geneId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `postgresId` field. */
  postgresId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `pubCount` field. */
  pubCount?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `stocksCount` field. */
  stocksCount?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `symbol` field. */
  symbol?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Insertion` values. */
export type InsertionsConnection = {
  __typename?: 'InsertionsConnection';
  /** A list of edges which contains the `Insertion` and cursor to aid in pagination. */
  edges: Array<InsertionsEdge>;
  /** A list of `Insertion` objects. */
  nodes: Array<Insertion>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Insertion` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Insertion` edge in the connection. */
export type InsertionsEdge = {
  __typename?: 'InsertionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Insertion` at the end of the edge. */
  node: Insertion;
};

/** Methods to use when ordering `Insertion`. */
export enum InsertionsOrderBy {
  AlleleIdAsc = 'ALLELE_ID_ASC',
  AlleleIdDesc = 'ALLELE_ID_DESC',
  FbtiIdAsc = 'FBTI_ID_ASC',
  FbtiIdDesc = 'FBTI_ID_DESC',
  GeneIdAsc = 'GENE_ID_ASC',
  GeneIdDesc = 'GENE_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PubCountAsc = 'PUB_COUNT_ASC',
  PubCountDesc = 'PUB_COUNT_DESC',
  StocksCountAsc = 'STOCKS_COUNT_ASC',
  StocksCountDesc = 'STOCKS_COUNT_DESC',
  SymbolAsc = 'SYMBOL_ASC',
  SymbolDesc = 'SYMBOL_DESC'
}

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type Pathway = Node & {
  __typename?: 'Pathway';
  fullname?: Maybe<Scalars['String']['output']>;
  grpId: Scalars['Int']['output'];
  isAnalysis?: Maybe<Scalars['Boolean']['output']>;
  isObsolete?: Maybe<Scalars['Boolean']['output']>;
  /** Reads and enables pagination through a set of `PathwayMember`. */
  membersByFbggId: Array<PathwayMember>;
  name?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `PathwayMember`. */
  pathwayMembersByFbggIdConnection: PathwayMembersConnection;
  typeId?: Maybe<Scalars['Int']['output']>;
  uniquename?: Maybe<Scalars['String']['output']>;
};


export type PathwayMembersByFbggIdArgs = {
  condition?: InputMaybe<PathwayMemberCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PathwayMembersOrderBy>>;
};


export type PathwayPathwayMembersByFbggIdConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PathwayMemberCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PathwayMembersOrderBy>>;
};

/** A condition to be used against `Pathway` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PathwayCondition = {
  /** Checks for equality with the object’s `grpId` field. */
  grpId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `uniquename` field. */
  uniquename?: InputMaybe<Scalars['String']['input']>;
};

export type PathwayDisease = {
  __typename?: 'PathwayDisease';
  disease?: Maybe<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isExperimental?: Maybe<Scalars['Boolean']['output']>;
  /** Reads a single `PathwayMember` that is related to this `PathwayDisease`. */
  pathwayMember?: Maybe<PathwayMember>;
  pathwayMemberId?: Maybe<Scalars['Int']['output']>;
};

/**
 * A condition to be used against `PathwayDisease` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PathwayDiseaseCondition = {
  /** Checks for equality with the object’s `isExperimental` field. */
  isExperimental?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `pathwayMemberId` field. */
  pathwayMemberId?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `PathwayDisease` values. */
export type PathwayDiseasesConnection = {
  __typename?: 'PathwayDiseasesConnection';
  /** A list of edges which contains the `PathwayDisease` and cursor to aid in pagination. */
  edges: Array<PathwayDiseasesEdge>;
  /** A list of `PathwayDisease` objects. */
  nodes: Array<PathwayDisease>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PathwayDisease` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PathwayDisease` edge in the connection. */
export type PathwayDiseasesEdge = {
  __typename?: 'PathwayDiseasesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PathwayDisease` at the end of the edge. */
  node: PathwayDisease;
};

/** Methods to use when ordering `PathwayDisease`. */
export enum PathwayDiseasesOrderBy {
  IsExperimentalAsc = 'IS_EXPERIMENTAL_ASC',
  IsExperimentalDesc = 'IS_EXPERIMENTAL_DESC',
  Natural = 'NATURAL',
  PathwayMemberIdAsc = 'PATHWAY_MEMBER_ID_ASC',
  PathwayMemberIdDesc = 'PATHWAY_MEMBER_ID_DESC'
}

export type PathwayMember = Node & {
  __typename?: 'PathwayMember';
  aka?: Maybe<Scalars['String']['output']>;
  antibody?: Maybe<Scalars['Boolean']['output']>;
  classicalAlleles?: Maybe<Scalars['JSON']['output']>;
  constructs?: Maybe<Scalars['JSON']['output']>;
  /** Reads a single `Pathway` that is related to this `PathwayMember`. */
  fbgg?: Maybe<Pathway>;
  fbggId?: Maybe<Scalars['String']['output']>;
  fbgnId?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `GeneGroupMembership`. */
  geneGroupMemberships: Array<GeneGroupMembership>;
  /** Reads and enables pagination through a set of `GeneGroupMembership`. */
  geneGroupMembershipsConnection: GeneGroupMembershipsConnection;
  goMolecularFunction?: Maybe<Scalars['JSON']['output']>;
  groupMemberLabel?: Maybe<Scalars['String']['output']>;
  humanOrthologs?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `PathwayDisease`. */
  pathwayDiseases: Array<PathwayDisease>;
  /** Reads and enables pagination through a set of `PathwayDisease`. */
  pathwayDiseasesConnection: PathwayDiseasesConnection;
  pathwayPubs?: Maybe<Scalars['JSON']['output']>;
  pubs?: Maybe<Scalars['JSON']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};


export type PathwayMemberGeneGroupMembershipsArgs = {
  condition?: InputMaybe<GeneGroupMembershipCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GeneGroupMembershipsOrderBy>>;
};


export type PathwayMemberGeneGroupMembershipsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<GeneGroupMembershipCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GeneGroupMembershipsOrderBy>>;
};


export type PathwayMemberPathwayDiseasesArgs = {
  condition?: InputMaybe<PathwayDiseaseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PathwayDiseasesOrderBy>>;
};


export type PathwayMemberPathwayDiseasesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PathwayDiseaseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PathwayDiseasesOrderBy>>;
};

/**
 * A condition to be used against `PathwayMember` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PathwayMemberCondition = {
  /** Checks for equality with the object’s `antibody` field. */
  antibody?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `fbggId` field. */
  fbggId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `fbgnId` field. */
  fbgnId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `groupMemberLabel` field. */
  groupMemberLabel?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `PathwayMember` values. */
export type PathwayMembersConnection = {
  __typename?: 'PathwayMembersConnection';
  /** A list of edges which contains the `PathwayMember` and cursor to aid in pagination. */
  edges: Array<PathwayMembersEdge>;
  /** A list of `PathwayMember` objects. */
  nodes: Array<PathwayMember>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PathwayMember` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PathwayMember` edge in the connection. */
export type PathwayMembersEdge = {
  __typename?: 'PathwayMembersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PathwayMember` at the end of the edge. */
  node: PathwayMember;
};

/** Methods to use when ordering `PathwayMember`. */
export enum PathwayMembersOrderBy {
  AntibodyAsc = 'ANTIBODY_ASC',
  AntibodyDesc = 'ANTIBODY_DESC',
  FbggIdAsc = 'FBGG_ID_ASC',
  FbggIdDesc = 'FBGG_ID_DESC',
  FbgnIdAsc = 'FBGN_ID_ASC',
  FbgnIdDesc = 'FBGN_ID_DESC',
  GroupMemberLabelAsc = 'GROUP_MEMBER_LABEL_ASC',
  GroupMemberLabelDesc = 'GROUP_MEMBER_LABEL_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `Pathway` values. */
export type PathwaysConnection = {
  __typename?: 'PathwaysConnection';
  /** A list of edges which contains the `Pathway` and cursor to aid in pagination. */
  edges: Array<PathwaysEdge>;
  /** A list of `Pathway` objects. */
  nodes: Array<Pathway>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Pathway` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Pathway` edge in the connection. */
export type PathwaysEdge = {
  __typename?: 'PathwaysEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Pathway` at the end of the edge. */
  node: Pathway;
};

/** Methods to use when ordering `Pathway`. */
export enum PathwaysOrderBy {
  GrpIdAsc = 'GRP_ID_ASC',
  GrpIdDesc = 'GRP_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UniquenameAsc = 'UNIQUENAME_ASC',
  UniquenameDesc = 'UNIQUENAME_DESC'
}

export type Pubprop = {
  __typename?: 'Pubprop';
  pubId: Scalars['Int']['output'];
  pubpropId: Scalars['Int']['output'];
  rank?: Maybe<Scalars['Int']['output']>;
  typeId: Scalars['Int']['output'];
  value: Scalars['String']['output'];
};

/** A connection to a list of `Pubprop` values. */
export type PubpropsConnection = {
  __typename?: 'PubpropsConnection';
  /** A list of edges which contains the `Pubprop` and cursor to aid in pagination. */
  edges: Array<PubpropsEdge>;
  /** A list of `Pubprop` objects. */
  nodes: Array<Pubprop>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Pubprop` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Pubprop` edge in the connection. */
export type PubpropsEdge = {
  __typename?: 'PubpropsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Pubprop` at the end of the edge. */
  node: Pubprop;
};

export type Query = {
  __typename?: 'Query';
  allele?: Maybe<Allele>;
  /** Reads a single `Allele` using its globally unique `ID`. */
  alleleByNodeId?: Maybe<Allele>;
  alleleClass?: Maybe<AlleleClass>;
  /** Reads a single `AlleleClass` using its globally unique `ID`. */
  alleleClassByNodeId?: Maybe<AlleleClass>;
  /** Reads a set of `AlleleClass`. */
  alleleClasses?: Maybe<Array<AlleleClass>>;
  /** Reads and enables pagination through a set of `AlleleClass`. */
  alleleClassesConnection?: Maybe<AlleleClassesConnection>;
  alleleDiseaseVariant?: Maybe<AlleleDiseaseVariant>;
  /** Reads a single `AlleleDiseaseVariant` using its globally unique `ID`. */
  alleleDiseaseVariantByNodeId?: Maybe<AlleleDiseaseVariant>;
  /** Reads a set of `AlleleDiseaseVariant`. */
  alleleDiseaseVariants?: Maybe<Array<AlleleDiseaseVariant>>;
  /** Reads and enables pagination through a set of `AlleleDiseaseVariant`. */
  alleleDiseaseVariantsConnection?: Maybe<AlleleDiseaseVariantsConnection>;
  alleleMutagen?: Maybe<AlleleMutagen>;
  /** Reads a single `AlleleMutagen` using its globally unique `ID`. */
  alleleMutagenByNodeId?: Maybe<AlleleMutagen>;
  /** Reads a set of `AlleleMutagen`. */
  alleleMutagens?: Maybe<Array<AlleleMutagen>>;
  /** Reads and enables pagination through a set of `AlleleMutagen`. */
  alleleMutagensConnection?: Maybe<AlleleMutagensConnection>;
  alleleStock?: Maybe<AlleleStock>;
  /** Reads a single `AlleleStock` using its globally unique `ID`. */
  alleleStockByNodeId?: Maybe<AlleleStock>;
  /** Reads a set of `AlleleStock`. */
  alleleStocks?: Maybe<Array<AlleleStock>>;
  /** Reads and enables pagination through a set of `AlleleStock`. */
  alleleStocksConnection?: Maybe<AlleleStocksConnection>;
  alleleTransgenicProductClass?: Maybe<AlleleTransgenicProductClass>;
  /** Reads a single `AlleleTransgenicProductClass` using its globally unique `ID`. */
  alleleTransgenicProductClassByNodeId?: Maybe<AlleleTransgenicProductClass>;
  /** Reads a set of `AlleleTransgenicProductClass`. */
  alleleTransgenicProductClasses?: Maybe<Array<AlleleTransgenicProductClass>>;
  /** Reads and enables pagination through a set of `AlleleTransgenicProductClass`. */
  alleleTransgenicProductClassesConnection?: Maybe<AlleleTransgenicProductClassesConnection>;
  /** Reads a set of `Allele`. */
  alleles?: Maybe<Array<Allele>>;
  /** Reads and enables pagination through a set of `Allele`. */
  allelesByFbal?: Maybe<Array<Allele>>;
  /** Reads and enables pagination through a set of `Allele`. */
  allelesByFbalConnection?: Maybe<AllelesConnection>;
  /** Reads and enables pagination through a set of `Allele`. */
  allelesConnection?: Maybe<AllelesConnection>;
  construct?: Maybe<Construct>;
  /** Reads a single `Construct` using its globally unique `ID`. */
  constructByNodeId?: Maybe<Construct>;
  /** Reads a set of `Construct`. */
  constructs?: Maybe<Array<Construct>>;
  /** Reads and enables pagination through a set of `Construct`. */
  constructsConnection?: Maybe<ConstructsConnection>;
  /** Given a feature.uniquename, this function returns a single current fullname or null if none exists. */
  currentFullname?: Maybe<Scalars['String']['output']>;
  /** Given a feature.uniquename, this function returns a single current symbol or null if none exists. */
  currentSymbol?: Maybe<Scalars['String']['output']>;
  /** Given a feature.uniquename and a synonym type, it retrieves a single synonym that is the current value of the type or null. */
  currentSynonym?: Maybe<Scalars['String']['output']>;
  /** Given a FlyBase ID returns the data class prefix e.g. FBgn0000490 -> FBgn */
  dataClass?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `AlleleDiseaseVariant`. */
  diseaseVariantsByFbgn?: Maybe<Array<AlleleDiseaseVariant>>;
  /** Reads and enables pagination through a set of `AlleleDiseaseVariant`. */
  diseaseVariantsByFbgnConnection?: Maybe<AlleleDiseaseVariantsConnection>;
  /** Reads and enables pagination through a set of `AlleleDiseaseVariant`. */
  diseaseVariantsByFbhh?: Maybe<Array<AlleleDiseaseVariant>>;
  /** Reads and enables pagination through a set of `AlleleDiseaseVariant`. */
  diseaseVariantsByFbhhConnection?: Maybe<AlleleDiseaseVariantsConnection>;
  gene?: Maybe<Gene>;
  /** Reads a single `Gene` using its globally unique `ID`. */
  geneByNodeId?: Maybe<Gene>;
  /** Reads and enables pagination through a set of `PathwayMember`. */
  geneGroupMembers?: Maybe<Array<PathwayMember>>;
  /** Reads and enables pagination through a set of `PathwayMember`. */
  geneGroupMembersConnection?: Maybe<PathwayMembersConnection>;
  /** Reads a set of `GeneGroupMembership`. */
  geneGroupMemberships?: Maybe<Array<GeneGroupMembership>>;
  /** Reads and enables pagination through a set of `GeneGroupMembership`. */
  geneGroupMembershipsConnection?: Maybe<GeneGroupMembershipsConnection>;
  /** Reads a set of `Gene`. */
  genes?: Maybe<Array<Gene>>;
  /** Reads and enables pagination through a set of `Gene`. */
  genesConnection?: Maybe<GenesConnection>;
  getAllianceVariantsByAllele?: Maybe<VariantsByAlleleResult>;
  getAllianceVariantsByGene?: Maybe<VariantsByGeneResult>;
  /** Reads and enables pagination through a set of `Featureprop`. */
  getFeatureprop?: Maybe<Array<Featureprop>>;
  /** Reads and enables pagination through a set of `Featureprop`. */
  getFeaturepropConnection?: Maybe<FeaturepropsConnection>;
  /** Reads and enables pagination through a set of `FeatureCvterm`. */
  getGeneOntologyTerms?: Maybe<Array<FeatureCvterm>>;
  /** Reads and enables pagination through a set of `FeatureCvterm`. */
  getGeneOntologyTermsConnection?: Maybe<FeatureCvtermsConnection>;
  /** Reads and enables pagination through a set of `Grpmemberprop`. */
  getGrpmemberprop?: Maybe<Array<Grpmemberprop>>;
  /** Reads and enables pagination through a set of `Grpmemberprop`. */
  getGrpmemberpropConnection?: Maybe<GrpmemberpropsConnection>;
  /** Reads and enables pagination through a set of `Pubprop`. */
  getPubprop?: Maybe<Array<Pubprop>>;
  /** Reads and enables pagination through a set of `Pubprop`. */
  getPubpropConnection?: Maybe<PubpropsConnection>;
  insertion?: Maybe<Insertion>;
  /** Reads a single `Insertion` using its globally unique `ID`. */
  insertionByNodeId?: Maybe<Insertion>;
  /** Reads a set of `Insertion`. */
  insertions?: Maybe<Array<Insertion>>;
  /** Reads and enables pagination through a set of `Insertion`. */
  insertionsConnection?: Maybe<InsertionsConnection>;
  /** Given a Gene Ontology evidence code, returns whether or not it is experimental (true) or prediction (false). */
  isGoEvidenceExperimental?: Maybe<Scalars['Boolean']['output']>;
  isPathway?: Maybe<Scalars['Boolean']['output']>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output'];
  pathway?: Maybe<Pathway>;
  /** Reads a single `Pathway` using its globally unique `ID`. */
  pathwayByNodeId?: Maybe<Pathway>;
  /** Reads a set of `PathwayDisease`. */
  pathwayDiseases?: Maybe<Array<PathwayDisease>>;
  /** Reads and enables pagination through a set of `PathwayDisease`. */
  pathwayDiseasesConnection?: Maybe<PathwayDiseasesConnection>;
  pathwayMember?: Maybe<PathwayMember>;
  /** Reads a single `PathwayMember` using its globally unique `ID`. */
  pathwayMemberByNodeId?: Maybe<PathwayMember>;
  /** Reads a set of `PathwayMember`. */
  pathwayMembers?: Maybe<Array<PathwayMember>>;
  /** Reads and enables pagination through a set of `PathwayMember`. */
  pathwayMembersConnection?: Maybe<PathwayMembersConnection>;
  /** Reads a set of `Pathway`. */
  pathways?: Maybe<Array<Pathway>>;
  /** Reads and enables pagination through a set of `Pathway`. */
  pathwaysConnection?: Maybe<PathwaysConnection>;
  /** Given a FlyBase ID, returns a count of FlyBase pub records directly associated with it. */
  pubCount?: Maybe<Scalars['BigInt']['output']>;
  /** Given a FlyBase ID, returns a count of FlyBase pub records of the specified type directly associated with it. */
  pubCountByType?: Maybe<Scalars['BigInt']['output']>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  searchExpressionTools?: Maybe<Array<Maybe<ExpressionToolSearchResult>>>;
  tool?: Maybe<Tool>;
  /** Reads a single `Tool` using its globally unique `ID`. */
  toolByNodeId?: Maybe<Tool>;
  toolUse?: Maybe<ToolUse>;
  /** Reads a single `ToolUse` using its globally unique `ID`. */
  toolUseByNodeId?: Maybe<ToolUse>;
  /** Reads a set of `ToolUse`. */
  toolUses?: Maybe<Array<ToolUse>>;
  /** Reads and enables pagination through a set of `ToolUse`. */
  toolUsesConnection?: Maybe<ToolUsesConnection>;
  /** Reads a set of `Tool`. */
  tools?: Maybe<Array<Tool>>;
  /** Reads and enables pagination through a set of `Tool`. */
  toolsConnection?: Maybe<ToolsConnection>;
};


export type QueryAlleleArgs = {
  postgresId: Scalars['Int']['input'];
};


export type QueryAlleleByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryAlleleClassArgs = {
  postgresId: Scalars['Int']['input'];
};


export type QueryAlleleClassByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryAlleleClassesArgs = {
  condition?: InputMaybe<AlleleClassCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleClassesOrderBy>>;
};


export type QueryAlleleClassesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AlleleClassCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleClassesOrderBy>>;
};


export type QueryAlleleDiseaseVariantArgs = {
  alleleDiseaseVariantId: Scalars['BigInt']['input'];
};


export type QueryAlleleDiseaseVariantByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryAlleleDiseaseVariantsArgs = {
  condition?: InputMaybe<AlleleDiseaseVariantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleDiseaseVariantsOrderBy>>;
};


export type QueryAlleleDiseaseVariantsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AlleleDiseaseVariantCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleDiseaseVariantsOrderBy>>;
};


export type QueryAlleleMutagenArgs = {
  postgresId: Scalars['Int']['input'];
};


export type QueryAlleleMutagenByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryAlleleMutagensArgs = {
  condition?: InputMaybe<AlleleMutagenCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleMutagensOrderBy>>;
};


export type QueryAlleleMutagensConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AlleleMutagenCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleMutagensOrderBy>>;
};


export type QueryAlleleStockArgs = {
  postgresId: Scalars['Int']['input'];
};


export type QueryAlleleStockByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryAlleleStocksArgs = {
  condition?: InputMaybe<AlleleStockCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleStocksOrderBy>>;
};


export type QueryAlleleStocksConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AlleleStockCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleStocksOrderBy>>;
};


export type QueryAlleleTransgenicProductClassArgs = {
  alleleId: Scalars['Int']['input'];
  soId: Scalars['String']['input'];
};


export type QueryAlleleTransgenicProductClassByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryAlleleTransgenicProductClassesArgs = {
  condition?: InputMaybe<AlleleTransgenicProductClassCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleTransgenicProductClassesOrderBy>>;
};


export type QueryAlleleTransgenicProductClassesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AlleleTransgenicProductClassCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AlleleTransgenicProductClassesOrderBy>>;
};


export type QueryAllelesArgs = {
  condition?: InputMaybe<AlleleCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AllelesOrderBy>>;
};


export type QueryAllelesByFbalArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAllelesByFbalConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAllelesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AlleleCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AllelesOrderBy>>;
};


export type QueryConstructArgs = {
  postgresId: Scalars['Int']['input'];
};


export type QueryConstructByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryConstructsArgs = {
  condition?: InputMaybe<ConstructCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ConstructsOrderBy>>;
};


export type QueryConstructsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ConstructCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ConstructsOrderBy>>;
};


export type QueryCurrentFullnameArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCurrentSymbolArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCurrentSynonymArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  synonymType?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDataClassArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDiseaseVariantsByFbgnArgs = {
  fbgn?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDiseaseVariantsByFbgnConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  fbgn?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDiseaseVariantsByFbhhArgs = {
  fbhh?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDiseaseVariantsByFbhhConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  fbhh?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGeneArgs = {
  featureId: Scalars['Int']['input'];
};


export type QueryGeneByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryGeneGroupMembersArgs = {
  fbgg?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  subgroup?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGeneGroupMembersConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  fbgg?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  subgroup?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGeneGroupMembershipsArgs = {
  condition?: InputMaybe<GeneGroupMembershipCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GeneGroupMembershipsOrderBy>>;
};


export type QueryGeneGroupMembershipsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<GeneGroupMembershipCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GeneGroupMembershipsOrderBy>>;
};


export type QueryGenesArgs = {
  condition?: InputMaybe<GeneCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GenesOrderBy>>;
};


export type QueryGenesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<GeneCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GenesOrderBy>>;
};


export type QueryGetAllianceVariantsByAlleleArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  params?: InputMaybe<AllianceVariantsByAllele>;
};


export type QueryGetAllianceVariantsByGeneArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  params?: InputMaybe<AllianceVariantsByGene>;
};


export type QueryGetFeaturepropArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetFeaturepropConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetGeneOntologyTermsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  goAspect?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetGeneOntologyTermsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  goAspect?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetGrpmemberpropArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  grpmemberId?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetGrpmemberpropConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  grpmemberId?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPubpropArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPubpropConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryInsertionArgs = {
  postgresId: Scalars['Int']['input'];
};


export type QueryInsertionByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryInsertionsArgs = {
  condition?: InputMaybe<InsertionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InsertionsOrderBy>>;
};


export type QueryInsertionsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InsertionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InsertionsOrderBy>>;
};


export type QueryIsGoEvidenceExperimentalArgs = {
  evidenceCode?: InputMaybe<Scalars['String']['input']>;
};


export type QueryIsPathwayArgs = {
  cvid?: InputMaybe<Scalars['String']['input']>;
  fbgg?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryPathwayArgs = {
  grpId: Scalars['Int']['input'];
};


export type QueryPathwayByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryPathwayDiseasesArgs = {
  condition?: InputMaybe<PathwayDiseaseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PathwayDiseasesOrderBy>>;
};


export type QueryPathwayDiseasesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PathwayDiseaseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PathwayDiseasesOrderBy>>;
};


export type QueryPathwayMemberArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPathwayMemberByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryPathwayMembersArgs = {
  condition?: InputMaybe<PathwayMemberCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PathwayMembersOrderBy>>;
};


export type QueryPathwayMembersConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PathwayMemberCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PathwayMembersOrderBy>>;
};


export type QueryPathwaysArgs = {
  condition?: InputMaybe<PathwayCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PathwaysOrderBy>>;
};


export type QueryPathwaysConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PathwayCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PathwaysOrderBy>>;
};


export type QueryPubCountArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPubCountByTypeArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  pubType?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchExpressionToolsArgs = {
  expression?: InputMaybe<ExpressionSearchInput>;
  gene?: InputMaybe<Scalars['String']['input']>;
};


export type QueryToolArgs = {
  postgresId: Scalars['Int']['input'];
};


export type QueryToolByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryToolUseArgs = {
  postgresId: Scalars['Int']['input'];
};


export type QueryToolUseByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryToolUsesArgs = {
  condition?: InputMaybe<ToolUseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolUsesOrderBy>>;
};


export type QueryToolUsesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ToolUseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolUsesOrderBy>>;
};


export type QueryToolsArgs = {
  condition?: InputMaybe<ToolCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolsOrderBy>>;
};


export type QueryToolsConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ToolCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolsOrderBy>>;
};

export type Tool = Node & {
  __typename?: 'Tool';
  /** Reads a single `Allele` that is related to this `Tool`. */
  allele?: Maybe<Allele>;
  alleleId?: Maybe<Scalars['BigInt']['output']>;
  /** Reads a single `Construct` that is related to this `Tool`. */
  construct?: Maybe<Construct>;
  constructId?: Maybe<Scalars['BigInt']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  postgresId: Scalars['Int']['output'];
  relType?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `ToolUse`. */
  toolUsesConnection: ToolUsesConnection;
  /** Reads and enables pagination through a set of `ToolUse`. */
  uses: Array<ToolUse>;
};


export type ToolToolUsesConnectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ToolUseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolUsesOrderBy>>;
};


export type ToolUsesArgs = {
  condition?: InputMaybe<ToolUseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ToolUsesOrderBy>>;
};

/** A condition to be used against `Tool` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ToolCondition = {
  /** Checks for equality with the object’s `alleleId` field. */
  alleleId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `constructId` field. */
  constructId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `postgresId` field. */
  postgresId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `relType` field. */
  relType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `symbol` field. */
  symbol?: InputMaybe<Scalars['String']['input']>;
};

export type ToolUse = Node & {
  __typename?: 'ToolUse';
  /** Reads a single `Allele` that is related to this `ToolUse`. */
  allele?: Maybe<Allele>;
  alleleId?: Maybe<Scalars['BigInt']['output']>;
  /** Reads a single `Construct` that is related to this `ToolUse`. */
  construct?: Maybe<Construct>;
  constructId?: Maybe<Scalars['BigInt']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  postgresId: Scalars['Int']['output'];
  /** Reads a single `Tool` that is related to this `ToolUse`. */
  tool?: Maybe<Tool>;
  toolId?: Maybe<Scalars['BigInt']['output']>;
};

/** A condition to be used against `ToolUse` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ToolUseCondition = {
  /** Checks for equality with the object’s `alleleId` field. */
  alleleId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `constructId` field. */
  constructId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `postgresId` field. */
  postgresId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `toolId` field. */
  toolId?: InputMaybe<Scalars['BigInt']['input']>;
};

/** A connection to a list of `ToolUse` values. */
export type ToolUsesConnection = {
  __typename?: 'ToolUsesConnection';
  /** A list of edges which contains the `ToolUse` and cursor to aid in pagination. */
  edges: Array<ToolUsesEdge>;
  /** A list of `ToolUse` objects. */
  nodes: Array<ToolUse>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ToolUse` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ToolUse` edge in the connection. */
export type ToolUsesEdge = {
  __typename?: 'ToolUsesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ToolUse` at the end of the edge. */
  node: ToolUse;
};

/** Methods to use when ordering `ToolUse`. */
export enum ToolUsesOrderBy {
  AlleleIdAsc = 'ALLELE_ID_ASC',
  AlleleIdDesc = 'ALLELE_ID_DESC',
  ConstructIdAsc = 'CONSTRUCT_ID_ASC',
  ConstructIdDesc = 'CONSTRUCT_ID_DESC',
  FbcvIdAsc = 'FBCV_ID_ASC',
  FbcvIdDesc = 'FBCV_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ToolIdAsc = 'TOOL_ID_ASC',
  ToolIdDesc = 'TOOL_ID_DESC'
}

/** A connection to a list of `Tool` values. */
export type ToolsConnection = {
  __typename?: 'ToolsConnection';
  /** A list of edges which contains the `Tool` and cursor to aid in pagination. */
  edges: Array<ToolsEdge>;
  /** A list of `Tool` objects. */
  nodes: Array<Tool>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tool` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Tool` edge in the connection. */
export type ToolsEdge = {
  __typename?: 'ToolsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Tool` at the end of the edge. */
  node: Tool;
};

/** Methods to use when ordering `Tool`. */
export enum ToolsOrderBy {
  AlleleIdAsc = 'ALLELE_ID_ASC',
  AlleleIdDesc = 'ALLELE_ID_DESC',
  ConstructIdAsc = 'CONSTRUCT_ID_ASC',
  ConstructIdDesc = 'CONSTRUCT_ID_DESC',
  FbidAsc = 'FBID_ASC',
  FbidDesc = 'FBID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RelTypeAsc = 'REL_TYPE_ASC',
  RelTypeDesc = 'REL_TYPE_DESC',
  SymbolAsc = 'SYMBOL_ASC',
  SymbolDesc = 'SYMBOL_DESC'
}

export type VariantsByAlleleResult = {
  __typename?: 'VariantsByAlleleResult';
  variants?: Maybe<Array<Maybe<AllianceVariant>>>;
};

export type VariantsByGeneResult = {
  __typename?: 'VariantsByGeneResult';
  alleles?: Maybe<Array<Maybe<AllianceAllele>>>;
};

export type GeneToolKitMostCommonlyUsedQueryVariables = Exact<{
  geneId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GeneToolKitMostCommonlyUsedQuery = { __typename?: 'Query', classicalAndInsertionsAlleles?: Array<{ __typename?: 'Gene', alleles: Array<{ __typename?: 'Allele', id?: string | null, paperCount?: any | null, stocksCount?: any | null, pubCount?: any | null, symbol?: string | null, classes: Array<{ __typename?: 'AlleleClass', name?: string | null }> }> }> | null, transgenicConstructs?: Array<{ __typename?: 'Gene', alleles: Array<{ __typename?: 'Allele', id?: string | null, paperCount?: any | null, stocksCount?: any | null, symbol?: string | null, transgenicProductClasses: Array<{ __typename?: 'AlleleTransgenicProductClass', transgenicProductClass?: string | null }>, classes: Array<{ __typename?: 'AlleleClass', name?: string | null }>, regRegions?: Array<{ __typename?: 'Tool', symbol?: string | null } | null> | null, taggedWith?: Array<{ __typename?: 'Tool', symbol?: string | null } | null> | null }> }> | null };


export const GeneToolKitMostCommonlyUsedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GeneToolKitMostCommonlyUsed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"geneId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"classicalAndInsertionsAlleles"},"name":{"kind":"Name","value":"genes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"geneId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alleles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"isConstruct"},"value":{"kind":"BooleanValue","value":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"geneIsRegulatoryRegion"},"value":{"kind":"BooleanValue","value":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paperCount"}},{"kind":"Field","name":{"kind":"Name","value":"stocksCount"}},{"kind":"Field","name":{"kind":"Name","value":"pubCount"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"classes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"transgenicConstructs"},"name":{"kind":"Name","value":"genes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"geneId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alleles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"isConstruct"},"value":{"kind":"BooleanValue","value":true}},{"kind":"ObjectField","name":{"kind":"Name","value":"geneIsRegulatoryRegion"},"value":{"kind":"BooleanValue","value":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paperCount"}},{"kind":"Field","name":{"kind":"Name","value":"stocksCount"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"transgenicProductClasses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transgenicProductClass"}}]}},{"kind":"Field","name":{"kind":"Name","value":"classes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"regRegions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"taggedWith"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GeneToolKitMostCommonlyUsedQuery, GeneToolKitMostCommonlyUsedQueryVariables>;