import React from "react";
import "../styles/expressionData.scss";

/*
* Code mostly taken from original version on the FlyBase server
* */

const ExpressionSummaryRibbonModEncodeExplanation = () => {
    return (
        <div className="well well-sm small">
            Colored tiles in the ribbon indicate the average RNA expression level of the gene at the indicated stages:
            <div id="modENCODEStageExpressionRibbon-legend" className="ribbon-legend">
                <div style={{float:"left"}}>&nbsp;low</div>
                <div style={{float:"right", color:"white"}}>high&nbsp;</div>
            </div>
            as determined by RNA-seq (RPKM) using whole organism samples <a href="/reports/FBrf0225793">modENCODE, Brown et
            al., 2014</a>.
            For complete stage-specific expression data, view the
            <strong>modENCODE Development RNA-Seq</strong> section under <strong>High-Throughput Expression</strong> below.
        </div>
    );
};

export default ExpressionSummaryRibbonModEncodeExplanation;