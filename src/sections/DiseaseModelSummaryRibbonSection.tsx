import ReportRibbon from "../components/ReportRibbon";
import React, {useEffect} from "react";
import ReportSection from "../components/layouts/ReportSection";
import {useRibbonsAPI} from "../api/reports";
import useBlinds from "../hooks/useBlinds";

interface DiseaseModelSummaryRibbonSectionProps {
    reportId: string
}



const DiseaseModelSummaryRibbonSection: React.FC<DiseaseModelSummaryRibbonSectionProps> = ({ reportId }) => {

    const ribbonData = [
        { id: reportId, ontology: 'disease', aspect: 'infection'},
        { id: reportId, ontology: 'disease', aspect: 'anatomical_entity'},
        { id: reportId, ontology: 'disease', aspect: 'proliferation'},
        { id: reportId, ontology: 'disease', aspect: 'other'}
    ];

    const { responses, isLoading, allLoaded, loadData } = useRibbonsAPI(ribbonData);
    const { isBlindOpen } = useBlinds('reports');

    useEffect(() => {
        if(isBlindOpen("hdm_sub") && !allLoaded && !isLoading) {
            loadData();
        }
    }, [allLoaded, isBlindOpen, isLoading, loadData, reportId]);

    return (
        <>
            <ReportSection heading="Disease Model Summary Ribbon" variant="level-2" sectionId="do_summary" blindLocation='reports'>
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

export default DiseaseModelSummaryRibbonSection;