import useSmartStorage from "./useSmartStorage";
import $ from "jquery";

const DURATION = 250; //(in milliseconds) Used by jQuery for hide animation.

type BlindsSettings = {
    [key: string]: true;
}

/**
 * A wrapper around useSmartStorage, specifically for FlyBase blinds.
 *
 * @remarks
 * This hook wraps useSmartStorage to read and write to FlyBase's simple storage for which blinds are open ar closed.
 * It will also use jQuery to interact with sections that are collapsible on a report page, but do not utilize react.
 * The jQuery code is taken from the blinds.js file on the FlyBase server.
 *
 * @param section - The key within FlyBase_session that blind info is stored
 * @returns An object containing: the blinds object from localStorage, a function to toggle the state of a blind for a
 * given id, a function to open a blind for a given id, a function to close a blind for a given id, and a function that
 * returns whether a blind with a given id is open.
 *
 * @beta
 */
const useBlinds = (section: string) => {
    const [blinds, updateBlinds, deleteBlinds] = useSmartStorage<BlindsSettings>(`simpleStorage.FlyBase_session.${section}.blinds.${fb_rc}`);

    const toggleBlind = (blind: string) => isBlindOpen(blind) ? closeBlind(blind) : openBlind(blind);
    const closeBlind = (blind: string) => {
        const dataToggleTarget = $(`[data-toggle-target=${blind}]`);
        if(dataToggleTarget.length > 0) {
            const target = $('#' + blind);
            if(!target.hasClass("section-content")) {
                const icon = $('i.fa-plus-square,i.fa-minus-square',dataToggleTarget);
                icon.removeClass("fa-plus-square fa-minus-square").addClass("fa-plus-square");
                target.hide('blind', () => DURATION);
            }
        }
        deleteBlinds(blind);
    };
    const openBlind = (blind: string) => {
        const dataToggleTarget = $(`[data-toggle-target=${blind}]`);
        if(dataToggleTarget.length > 0) {
            const target = $('#' + blind);
            if(!target.hasClass("section-content")) {
                const icon = $('i.fa-plus-square,i.fa-minus-square',dataToggleTarget);
                icon.removeClass("fa-plus-square fa-minus-square").addClass("fa-minus-square");
                target.show();
            }
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