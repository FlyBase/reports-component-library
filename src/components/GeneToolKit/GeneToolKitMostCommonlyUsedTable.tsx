import React, {useId} from "react";
import LoadingIndicator from "../icons/LoadingIndicator";
import "../../styles/geneToolKitMostCommonlyUsedTable.scss";

type GeneToolKitTableCategory = {
    name: string,
    subCategories: {
        name: string,
        filterValue: string,
        count: number,
        mostCommonlyUsed: {
            name: string,
            id: string
            stocks: string | number
        }[]
    }[]
}

const GENE_TOOLKIT_TABLE_CATEGORIES: GeneToolKitTableCategory[] = [
    {
        name: "Classical and Insertion Alleles",
        subCategories: [
            {
                name: "Loss of function allele",
                filterValue: "loss of function",
                count: 10,
                mostCommonlyUsed: []
            },{
                name: "Amorphic allele",
                filterValue: "loss of function",
                count: 10,
                mostCommonlyUsed: []
            },{
                name: "Fluorescently-tagged allele",
                filterValue: "loss of function",
                count: 10,
                mostCommonlyUsed: []
            },
        ]
    },{
        name: "Transgenic Constructs",
        subCategories: [
            {
                name: "UAS RNAi",
                filterValue: "loss of function",
                count: 10,
                mostCommonlyUsed: [{
                    name: "Pka-C1<sup>H1</sup>",
                    id: "FBfake003283",
                    stocks: 17
                }]
            },{
                name: "UAS wild-type cDNA",
                filterValue: "loss of function",
                count: 10,
                mostCommonlyUsed: [{
                    name: "Pka-C1<sup>H1</sup>",
                    id: "FBfake003283",
                    stocks: 17
                }]
            },{
                name: "Genomic rescue",
                filterValue: "loss of function",
                count: 10,
                mostCommonlyUsed: [{
                    name: "Pka-C1<sup>H1</sup>",
                    id: "FBfake003283",
                    stocks: 17
                }]
            },{
                name: "Fluorescently-tagged genomic rescue",
                filterValue: "loss of function",
                count: 10,
                mostCommonlyUsed: [{
                    name: "Pka-C1<sup>H1</sup>",
                    id: "FBfake003283",
                    stocks: 17
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                }]
            }
        ]
    },{
        name: "Aberrations",
        subCategories: [
            {
                name: "Deficiency",
                filterValue: "loss of function",
                count: 10,
                mostCommonlyUsed: [{
                    name: "Pka-C1<sup>H1</sup>",
                    id: "FBfake003283",
                    stocks: 17
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                }]
            },
            {
                name: "Deficiency",
                filterValue: "loss of function",
                count: 10,
                mostCommonlyUsed: [{
                    name: "Pka-C1<sup>H1</sup>",
                    id: "FBfake003283",
                    stocks: 17
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                },{
                    name: "Another<sup>One</sup>",
                    id: "FBfake003283",
                    stocks: 16
                }]
            }
        ]
    },
];

const GeneToolKitMostCommonlyUsedTable: React.FC = () => {

    const keyId = useId();

    return (
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Common alleles & stocks</th>
                </tr>
            </thead>
            <tbody>
                {
                    GENE_TOOLKIT_TABLE_CATEGORIES.map((category, index) => (
                        <React.Fragment key={`GeneToolKitTableCategory-${category.name}-${index}-${keyId}`}>
                            <tr className="gene-toolkit-category-header">
                                <td colSpan={2}>{category.name}</td>
                            </tr>
                            {
                                category.subCategories.map((subCategory, subIndex) => (
                                    <tr key={`GeneToolKitTableSubCategory-${category.name}-${subCategory.name}-${index}-${subIndex}-${keyId}`}
                                        className="gene-toolkit-subcategory-row"
                                    >
                                        <td>
                                            <div className="gene-toolkit-subcategory-category">
                                                <span>{subCategory.name}</span>
                                                <button onClick={e => e}>See all ({subCategory.count})</button>

                                            </div>
                                        </td>
                                        <td>
                                            <div className="gene-toolkit-subcategory-common-allele">
                                                { subCategory.mostCommonlyUsed.length === 0 && <LoadingIndicator /> }
                                                {
                                                    subCategory.mostCommonlyUsed.length !== 0 &&
                                                    <ul>
                                                        {
                                                            subCategory.mostCommonlyUsed.map((allele, alleleIndex) => (
                                                                <li key={`GeneToolKitTableSubCategoryAllele-${category.name}-${subCategory.name}-${allele.id}-${index}-${subIndex}-${alleleIndex}-${keyId}`}>
                                                                    <a href={allele.id} dangerouslySetInnerHTML={{ __html: allele.name}}></a>
                                                                    <a href={allele.id}>({allele.stocks})</a>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
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