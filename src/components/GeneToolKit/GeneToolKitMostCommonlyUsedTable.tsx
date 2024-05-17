import React from "react";
import LoadingIndicator from "../SocialFeed/LoadingIndicator";
import "../../styles/geneToolKitMostCommonlyUsedTable.scss";

type GeneToolKitTableCategory = {
    name: string,
    subCategories: {
        name: string,
        filterValue: string,
        mostCommonlyUsed?: {
            name: string,
            id: string
            stocks: string | number
        }
    }[]
}

const GENE_TOOLKIT_TABLE_CATEGORIES: GeneToolKitTableCategory[] = [
    {
        name: "Classical and Insertion Alleles",
        subCategories: [
            {
                name: "Loss of function allele",
                filterValue: "loss of function"
            },{
                name: "Amorphic allele",
                filterValue: "loss of function"
            },{
                name: "Fluorescently-tagged allele",
                filterValue: "loss of function"
            },
        ]
    },{
        name: "Transgenic Constructs",
        subCategories: [
            {
                name: "UAS RNAi",
                filterValue: "loss of function",
                mostCommonlyUsed: {
                    name: "Pka-C1<sup>H1</sup>",
                    id: "FBfake003283",
                    stocks: 17
                }
            },{
                name: "UAS wild-type cDNA",
                filterValue: "loss of function",
                mostCommonlyUsed: {
                    name: "Pka-C1<sup>H1</sup>",
                    id: "FBfake003283",
                    stocks: 17
                }
            },{
                name: "Genomic rescue",
                filterValue: "loss of function",
                mostCommonlyUsed: {
                    name: "Pka-C1<sup>H1</sup>",
                    id: "FBfake003283",
                    stocks: 17
                }
            },{
                name: "Fluorescently-tagged genomic rescue",
                filterValue: "loss of function",
                mostCommonlyUsed: {
                    name: "Pka-C1<sup>H1</sup>",
                    id: "FBfake003283",
                    stocks: 17
                }
            }
        ]
    },{
        name: "Aberrations",
        subCategories: [
            {
                name: "Deficiency",
                filterValue: "loss of function",
                mostCommonlyUsed: {
                    name: "Pka-C1<sup>H1</sup>",
                    id: "FBfake003283",
                    stocks: 17
                }
            }
        ]
    },
];

const GeneToolKitMostCommonlyUsedTable: React.FC = () => {

    return (
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Most common allele, stocks</th>
                </tr>
            </thead>
            <tbody>
                {
                    GENE_TOOLKIT_TABLE_CATEGORIES.map((category, index) => (
                        <React.Fragment key={`GeneToolKitTableCategory-${category.name}-${index}`}>
                            <tr className="gene-toolkit-category-header">
                                <td colSpan={2}>{category.name}</td>
                            </tr>
                            {
                                category.subCategories.map((subCategory, subIndex) => (
                                    <tr key={`GeneToolKitTableSubCategory-${category.name}-${subCategory.name}-${index}-${subIndex}`}
                                        className="gene-toolkit-subcategory-row"
                                    >
                                        <td>
                                            <div className="gene-toolkit-subcategory-category">
                                                <span>{subCategory.name}</span>
                                                <button onClick={e => e}>See all</button>

                                            </div>
                                        </td>
                                        <td>
                                            <div className="gene-toolkit-subcategory-common-allele">
                                                { !subCategory.mostCommonlyUsed && <LoadingIndicator /> }
                                                {
                                                    subCategory.mostCommonlyUsed &&
                                                    <>
                                                        <a href={subCategory.mostCommonlyUsed.id} dangerouslySetInnerHTML={{ __html: subCategory.mostCommonlyUsed.name}}></a>
                                                        <a href={subCategory.mostCommonlyUsed.id}>{subCategory.mostCommonlyUsed.stocks}</a>
                                                    </>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </React.Fragment>
                    ))
                }
            </tbody>
        </table>
    );
};

export default GeneToolKitMostCommonlyUsedTable;