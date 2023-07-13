import React from "react";
import "../styles/expressionData.scss";

const ExpressionSummaryRibbonManuallyCuratedExplanation = () => {
    return (
        <div className="well well-sm small">
            Colored tiles in ribbon indicate that expression data (RNA and/or protein) has been curated by FlyBase for that anatomical location. Colorless tiles indicate that there is no curated data for that location.
        </div>
    );
};

export default ExpressionSummaryRibbonManuallyCuratedExplanation;