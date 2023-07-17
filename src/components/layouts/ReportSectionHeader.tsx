import '../../styles/reportSectionHeader.scss';
import React, {useEffect} from "react";
import classNames from "classnames";
import useBlinds from "../../hooks/useBlinds";

export interface ReportSectionHeaderProps {
    id: string,
    heading: string;
    variant: ReportSectionHeaderLevel | "level-1" | "level-2" | "level-3";
    collapsible?: boolean;
    onClick?: (id: string) => void;
}

export enum ReportSectionHeaderLevel {
    Level1 = "level-1",
    Level2 = "level-2",
    Level3 = "level-3",
}

const ReportSectionHeader: React.FC<ReportSectionHeaderProps> = ({ id, heading, variant, collapsible = false, onClick }) => {

    const { isBlindOpen } = useBlinds('reports');

    return (
        <div className={classNames("report-section-header", variant, { "collapsible": collapsible, "sectionIsOpen": isBlindOpen(id), "sectionIsClosed": !isBlindOpen(id) })}
             onClick={e => onClick && onClick(id)}
        >
            {
                collapsible && <i className={classNames("fa", { "fa-plus-square": !isBlindOpen(id), "fa-minus-square": isBlindOpen(id) })}></i>
            }
            {(() => {
                switch (variant) {
                    case ReportSectionHeaderLevel.Level1: return <h2>{heading}</h2>;
                    case ReportSectionHeaderLevel.Level2: return <h3>{heading}</h3>;
                    case ReportSectionHeaderLevel.Level3: return <h4>{heading}</h4>;
                    default: return null;
                }
            })()}
        </div>
    );
};

export default ReportSectionHeader;