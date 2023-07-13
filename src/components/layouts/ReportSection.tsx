import React from "react";
import ReportSectionHeader, {ReportSectionHeaderProps} from "./ReportSectionHeader";
import useBlinds from "../../hooks/useBlinds";
import classNames from "classnames";
import "../../styles/sections.scss";

export type RibbonsSectionProps = React.PropsWithChildren & Omit<ReportSectionHeaderProps, "id"> & {
    sectionId: string;
    blindLocation: string;
}

const ReportSection: React.FC<RibbonsSectionProps> = ({ sectionId, blindLocation, collapsible, children, ...sectionHeaderProps }) => {

    const { toggleBlind, isBlindOpen } = useBlinds(blindLocation);

    const handleClick = () => {
        if(collapsible) {

            const element = document.getElementById(sectionId)!;
            const sectionHeight = element.scrollHeight;

            element.style.transition = '';
            requestAnimationFrame(function () {
                element.style.height = (isBlindOpen(sectionId) ? sectionHeight : 0) + 'px';
                element.style.transition = 'height .4s';
                requestAnimationFrame(function () {
                    element.style.height = (isBlindOpen(sectionId) ? 0 : sectionHeight) + 'px';
                });
            });

            toggleBlind(sectionId);
        }
    };

    return (
        <>
            <ReportSectionHeader id={sectionId} {...sectionHeaderProps} collapsible={collapsible} onClick={() => handleClick()}/>
            <section id={sectionId} className={classNames("section-content", { collapsed: collapsible && !isBlindOpen(sectionId) })}>
                {children}
            </section>
        </>
    );
};

export default ReportSection;