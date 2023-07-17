import injectComponents from "./injectComponents";
import GOSummaryRibbonsSection from "../sections/GOSummaryRibbonsSection";
import ExpressionSummaryRibbonsSection from "../sections/ExpressionSummaryRibbonsSection";
import DiseaseModelSummaryRibbonSection from "../sections/DiseaseModelSummaryRibbonSection";

/*
* This file is a webpack entry point, and will get built separately when running `yarn build`
* */

//load a gene report with all react code
const injectGeneReport = () => {
    injectComponents([
        { containerId: "goSummaryRibbonSectionContainer", component: <GOSummaryRibbonsSection reportId={FBgn} /> },
        { containerId: "expressionSummaryRibbonsSectionContainer", component: <ExpressionSummaryRibbonsSection reportId={FBgn} /> },
        { containerId: "diseaseModelSummaryRibbonSectionContainer", component: <DiseaseModelSummaryRibbonSection reportId={FBgn} /> },
    ]);
};

//only do this automatically in production (when build version is being used)
//this makes it so that including the build file on the page automatically handles everything, without extra code
if(process.env.NODE_ENV === "production") {
    injectGeneReport();
}