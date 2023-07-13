import ReportRibbon from "../components/ReportRibbon";
import React, {useEffect} from "react";
import ReportSection from "../components/layouts/ReportSection";
import {useRibbonsAPI} from "../api/reports";
import useBlinds from "../hooks/useBlinds";
import ExpressionSummaryRibbonFlyCellAtlasExplanation from "../components/ExpressionSummaryRibbonFlyCellAtlasExplanation";
import "../styles/expressionData.scss"
import ExpressionSummaryRibbonManuallyCuratedExplanation
    from "../components/ExpressionSummaryRibbonManuallyCuratedExplanation";
import ExpressionSummaryRibbonModEncodeExplanation
    from "../components/ExpressionSummaryRibbonModEncodeExplanation";

interface ExpressionSummaryRibbonsSectionProps {
    reportId: string
}



const ExpressionSummaryRibbonsSection: React.FC<ExpressionSummaryRibbonsSectionProps> = ({ reportId }) => {

    const ribbonData = [
        { id: reportId, ontology: "go", aspect: "molecular_function", ExplanationComponent: ExpressionSummaryRibbonFlyCellAtlasExplanation },
        { id: reportId, ontology: "go", aspect: "biological_process", ExplanationComponent: ExpressionSummaryRibbonManuallyCuratedExplanation },
        { id: reportId, ontology: "go", aspect: "cellular_component", ExplanationComponent: ExpressionSummaryRibbonModEncodeExplanation }
    ];

    const { responses, isLoading, allLoaded, loadData } = useRibbonsAPI(ribbonData);
    const { isBlindOpen } = useBlinds('reports');

    useEffect(() => {
        if(isBlindOpen("expression_sub") && !allLoaded && !isLoading) {
            loadData();
        }
    }, [allLoaded, isBlindOpen, isLoading, loadData, reportId]);

    return (
        <>
            <ReportSection heading="Expression Summary Ribbons" variant="level-2" sectionId="expression_summary" blindLocation='reports'>
                <section className="ribbon-list" style={{padding: "0 2em 2em 2em", alignItems: "flex-start"}}>
                    { isLoading && "Loading..." }
                    {
                        allLoaded && responses.map(
                            (response, index) => {
                                if(typeof response === "string") {
                                    return <span key={`go-summary-ribbon-error-${index}`}>"There was a problem loading this ribbon."</span>
                                }

                                const ExplanationComponent = ribbonData[index].ExplanationComponent;

                                return (
                                    <div className="ribbon-with-explanation">
                                        <ReportRibbon key={`go-summary-ribbon-${index}`} id={reportId} ontology={ribbonData[index].ontology} aspect={ribbonData[index].aspect} data={response} />
                                        <ExplanationComponent />
                                    </div>
                                );
                            }
                        )
                    }
                </section>
            </ReportSection>
        </>
    );
};

export default ExpressionSummaryRibbonsSection;