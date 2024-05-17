import React from "react";
import ReportSection from "../components/layouts/ReportSection";
import GeneToolKitMostCommonlyUsedTable from "../components/GeneToolKit/GeneToolKitMostCommonlyUsedTable";
import '../styles/geneToolKit.scss';

const GeneToolKitMostCommonlyUsedSection: React.FC = () => {
    return (
        <ReportSection heading="Gene ToolKit" variant="level-1" sectionId="gene_tool_kit" blindLocation="reports" collapsible>
            <div id="gene-toolkit-section-wrapper">
                <p>
                    The gene 'ToolKit' contains a set of key genetic reagents that can be used to study a gene.
                    A single reagent for each category is chosen based on frequency of usage, and stock availability.
                    Click "See all" to view <b>all</b> the reagents for the category.
                </p>
                <GeneToolKitMostCommonlyUsedTable />
            </div>
        </ReportSection>
    );
};

export default GeneToolKitMostCommonlyUsedSection;