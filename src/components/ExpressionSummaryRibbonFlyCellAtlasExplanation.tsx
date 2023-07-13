import React from "react";
import "../styles/expressionData.scss";

const ExpressionSummaryRibbonFlyCellAtlasExplanation = () => {
    return (
        <div className="well well-sm small">
            Colored tiles in ribbon indicate that the <a href="/reports/FBrf0252876">Fly
            Cell Atlas project</a> found the gene expressed in that cell type.
            Darker colors mean that more cells of that cell type express the gene:
            <div id="FlyCellAtlasExpressionRibbon-legend" className="ribbon-legend">
                <div style={{float:"left"}}>&nbsp;low</div>
                <div style={{float:"right", color:"white"}}>high&nbsp;</div>
            </div>
            Colorless tiles indicate that there is no scRNAseq data for the gene in that
            cell type.
            <a href="https://www.ebi.ac.uk/gxa/sc/search?flybase_gene_id={uniquename}&amp;species=Drosophila+melanogaster">Query
                the SCEA for this gene</a>.
        </div>
    );
};

export default ExpressionSummaryRibbonFlyCellAtlasExplanation;