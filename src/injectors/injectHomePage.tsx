import injectComponents from "./injectComponents";
import GOSummaryRibbonsSection from "../sections/GOSummaryRibbonsSection";
import ExpressionSummaryRibbonsSection from "../sections/ExpressionSummaryRibbonsSection";
import DiseaseModelSummaryRibbonSection from "../sections/DiseaseModelSummaryRibbonSection";
import MastodonFeed from "../components/SocialFeed/MastodonFeed";
import React from "react";

/*
* This file is a webpack entry point, and will get built separately when running `yarn build`
* */

//load a gene report with all react code
const injectHomePage = () => {
    injectComponents([
        { containerId: "flyBaseMastodonFeed", component:  <MastodonFeed server="mstdn.science" accountHandle="FlyBase" /> },
    ]);
};

//only do this automatically in production (when build version is being used)
//this makes it so that including the build file on the page automatically handles everything, without extra code
if(process.env.NODE_ENV === "production") {
    injectHomePage();
}