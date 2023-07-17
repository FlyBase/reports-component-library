import ReportRibbon from "../components/ReportRibbon";
import React, {useEffect} from "react";
import ReportSection from "../components/layouts/ReportSection";
import {useRibbonsAPI} from "../api/reports";
import useBlinds from "../hooks/useBlinds";

interface GOSummaryRibbonsSectionProps {
    reportId: string
}



const GOSummaryRibbonsSection: React.FC<GOSummaryRibbonsSectionProps> = ({ reportId }) => {

    const ribbonData = [
        { id: reportId, ontology: "go", aspect: "molecular_function" },
        { id: reportId, ontology: "go", aspect: "biological_process" },
        { id: reportId, ontology: "go", aspect: "cellular_component" }
    ];

    const { responses, isLoading, allLoaded, loadData } = useRibbonsAPI(ribbonData);
    const { isBlindOpen } = useBlinds('reports');

    useEffect(() => {
        if(!allLoaded && !isLoading) {
            loadData();
        }
    }, [allLoaded, isBlindOpen, isLoading, loadData, reportId]);

    return (
        <>
            <ReportSection heading="GO Summary Ribbons" variant="level-2" sectionId="go_summary" blindLocation='reports'>
                <section className="ribbon-list">
                    { isLoading && "Loading..." }
                    {
                        allLoaded && responses.map(
                            (response, index) => typeof response === "string" ? <span key={`go-summary-ribbon-error-${index}`}>"There was a problem loading this ribbon."</span> :
                                <ReportRibbon key={`go-summary-ribbon-${index}`} id={reportId} ontology={ribbonData[index].ontology} aspect={ribbonData[index].aspect} data={response} />
                        )
                    }
                </section>
            </ReportSection>
        </>
    );
};

export default GOSummaryRibbonsSection;