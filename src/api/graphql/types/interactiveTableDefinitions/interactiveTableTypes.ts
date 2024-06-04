import {GeneToolKitMostCommonlyUsedQuery} from "../../../../__generated__/graphql";
import {QueryResultKeys} from "../graphqlApiTypes";
import {GeneTransgenicConstructAllelesColumn} from "./geneTransgenicConstructAlleles";
import {GeneClassicalInsertionAllelesColumn} from "./geneClassicalInserstionAlleles";

// All interactive tables. Values correspond to the table id used for rendering/scrolling.
export enum InteractiveTable {
    GeneGroupMembers = 'gene-group-members',
    GeneClassicalInsertionAlleles = 'gene-classical-insertion-alleles',
    GeneInsertions = 'gene-insertions',
    GeneTransgenicConstructAlleles = 'gene-transgenic-construct-alleles',
    GeneTransgenicConstructAllelesRegulatoryRegion =  'gene-transgenic-construct-alleles-geneisregulatoryregion',
    Gal4Search = 'exp-tool-search',
    AllianceVariants = 'gene-alliance-variants',
    AlleleDiseaseVariants = 'allele-disease-variants'
}

// Maps each table to an enum of the tables columns
export type InteractiveTableColumns = {
    [InteractiveTable.GeneGroupMembers]: "";
    [InteractiveTable.GeneClassicalInsertionAlleles]: GeneClassicalInsertionAllelesColumn;
    [InteractiveTable.GeneInsertions]: "";
    [InteractiveTable.GeneTransgenicConstructAlleles]: GeneTransgenicConstructAllelesColumn;
    [InteractiveTable.GeneTransgenicConstructAllelesRegulatoryRegion]: "";
    [InteractiveTable.Gal4Search]: "";
    [InteractiveTable.AllianceVariants]: "";
    [InteractiveTable.AlleleDiseaseVariants]: "";
}