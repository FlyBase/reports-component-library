import useSmartStorage from "./useSmartStorage";
import $ from "jquery";
import {useEffect} from "react";

const DURATION = 250;

const useBlinds = (section: string) => {
    const [blinds, updateBlinds, deleteBlinds] = useSmartStorage(`simpleStorage.FlyBase_session.${section}.blinds.${fb_rc}`);

    const toggleBlind = (blind: string) => isBlindOpen(blind) ? closeBlind(blind) : openBlind(blind);
    const closeBlind = (blind: string) => {
        const dataToggleTarget = $(`[data-toggle-target=${blind}]`);
        if(dataToggleTarget.length > 0) {
            const target = $('#' + blind);
            const icon = $('i.fa-plus-square,i.fa-minus-square',dataToggleTarget);
            icon.removeClass("fa-plus-square fa-minus-square").addClass("fa-plus-square");
            target.hide('blind', () => DURATION);
        }
        deleteBlinds(blind);
    };
    const openBlind = (blind: string) => {
        const dataToggleTarget = $(`[data-toggle-target=${blind}]`);
        if(dataToggleTarget.length > 0) {
            const target = $('#' + blind);
            const icon = $('i.fa-plus-square,i.fa-minus-square',dataToggleTarget);
            icon.removeClass("fa-plus-square fa-minus-square").addClass("fa-minus-square");
            target.show();
        }
        updateBlinds(blind, true);
    };
    const isBlindOpen = (blind: string) => Boolean(blinds[blind]);

    return {
        blinds,
        toggleBlind,
        closeBlind,
        openBlind,
        isBlindOpen
    };
};

export default useBlinds;