import injectComponents from "./injectComponents";
import GOSummaryRibbonsSection from "../sections/GOSummaryRibbonsSection";
import ExpressionSummaryRibbonsSection from "../sections/ExpressionSummaryRibbonsSection";
import DiseaseModelSummaryRibbonSection from "../sections/DiseaseModelSummaryRibbonSection";

const injectGeneReport = () => {
    injectComponents([
        { containerId: "goSummaryRibbonSectionContainer", component: <GOSummaryRibbonsSection reportId={FBgn} /> },
        { containerId: "expressionSummaryRibbonsSectionContainer", component: <ExpressionSummaryRibbonsSection reportId={FBgn} /> },
        { containerId: "diseaseModelSummaryRibbonSectionContainer", component: <DiseaseModelSummaryRibbonSection reportId={FBgn} /> },
    ]);
};

export default injectGeneReport;