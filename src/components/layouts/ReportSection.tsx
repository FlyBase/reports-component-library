import React, {useCallback, useEffect, useMemo, useRef} from "react";
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

    const sectionIsOpen = useMemo(() => isBlindOpen(sectionId), [isBlindOpen, sectionId]);
    const sectionContentElement = useRef<HTMLElement>(null);

    const openSection = useCallback(() => {
        sectionContentElement.current!.style.transition = "height .4s";
        requestAnimationFrame(() => {
            sectionContentElement.current!.style.height = `${sectionContentElement.current!.scrollHeight}px`;
            setTimeout(() => {
                sectionContentElement.current!.style.height = `auto`;
            }, 400)
        });
    }, []);

    const closeSection = useCallback(() => {
        sectionContentElement.current!.style.transition = "";
        requestAnimationFrame(() => {
            sectionContentElement.current!.style.height = `${sectionContentElement.current!.scrollHeight}px`;
            sectionContentElement.current!.style.transition = "height .4s";
            requestAnimationFrame(() => {
                sectionContentElement.current!.style.height = `0px`;
            });
        });
    }, []);

    useEffect(() => {
        if(!collapsible) return;
        sectionIsOpen ? openSection() : closeSection();
    }, [closeSection, collapsible, openSection, sectionIsOpen]);

    const handleClick = () => collapsible && toggleBlind(sectionId);

    return (
        <>
            <ReportSectionHeader id={sectionId} {...sectionHeaderProps} collapsible={collapsible} onClick={() => handleClick()}/>
            <section id={sectionId}
                     className={classNames("section-content", { collapsed: collapsible && !sectionIsOpen })}
                     ref={sectionContentElement}
            >
                {children}
            </section>
        </>
    );
};

export default ReportSection;