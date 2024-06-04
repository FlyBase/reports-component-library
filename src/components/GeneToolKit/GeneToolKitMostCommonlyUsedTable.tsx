import React, {useId} from "react";
import LoadingIndicator from "../icons/LoadingIndicator";
import "../../styles/geneToolKitMostCommonlyUsedTable.scss";
import useGeneToolKitMostCommonlyUsedQuery from "./useGeneToolKitMostCommonlyUsedQuery";
import useBlinds from "../../hooks/useBlinds";
import useSmartStorage from "../../hooks/useSmartStorage";


const GeneToolKitMostCommonlyUsedTable: React.FC = () => {

    const keyId = useId();
    const { loading, error, config } = useGeneToolKitMostCommonlyUsedQuery();
    const [value, updateStorage, deleteStorage] = useSmartStorage(`simpleStorage.FlyBase_session.reports.FBgn.interactiveTableFilters`);



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
                    config.map((category, index) => (
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
                                                <button onClick={e => {
                                                            e.preventDefault();
                                                            document.querySelector(`[data-table-name="${category.interactiveTable}"]`)?.scrollIntoView({
                                                                behavior: "smooth"
                                                            });
                                                            updateStorage(category.interactiveTable, subCategory.filters);
                                                        }}
                                                >
                                                    See all ({subCategory.count === undefined ? "" : subCategory.count})
                                                </button>

                                            </div>
                                        </td>
                                        <td>
                                            <div className="gene-toolkit-subcategory-common-allele">
                                                { loading && <LoadingIndicator /> }
                                                {
                                                    !loading && !error && subCategory.mostCommonlyUsed?.length !== 0 &&
                                                    <ul>
                                                        {
                                                            subCategory.mostCommonlyUsed?.map((allele, alleleIndex) => (
                                                                <li key={`GeneToolKitTableSubCategoryAllele-${category.name}-${subCategory.name}-${allele.id}-${index}-${subIndex}-${alleleIndex}-${keyId}`}>
                                                                    <a href={`/reports/${allele.id}`} dangerouslySetInnerHTML={{ __html: allele.symbol}}></a>
                                                                    <a href={`/hitlist/${allele.id}/to/FBst`}>({allele.stocksCount})</a>
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