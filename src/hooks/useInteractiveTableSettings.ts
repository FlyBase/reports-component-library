import useSmartStorage from "./useSmartStorage";
import {TableState} from "@tanstack/react-table";
import {useEffect, useState} from "react";

const useInteractiveTableSettings = (tableId: string, defaultSettings: Partial<TableState> = {}): ReturnType<typeof useSmartStorage<TableState>> => {
    const [settings, updateSettings, deleteSettings] = useSmartStorage<TableState>(`interactiveTableSettings.${tableId}`);

    const [defaultApplied, setDefaultApplied] = useState(false);

    useEffect(() => {
        if(!defaultApplied) {
            setDefaultApplied(true);
            updateSettings("", {
                columnFilters: [],
                columnOrder: [],
                columnPinning: {left: [], right: []},
                columnSizing: {},
                columnSizingInfo: {
                    columnSizingStart: [],
                    deltaOffset: null,
                    deltaPercentage: null,
                    isResizingColumn: false,
                    startOffset: null,
                    startSize: null,
                },
                columnVisibility:{},
                expanded:{},
                grouping:[],
                pagination: {pageIndex: 0, pageSize: 10},
                rowPinning: {top: [], bottom: []},
                rowSelection:{},
                sorting: [],
                ...defaultSettings,
                ...(settings as Partial<TableState>)
            });
        }

    }, [defaultApplied, defaultSettings, settings, updateSettings]);

    return [defaultApplied ? settings : {} as TableState, updateSettings, deleteSettings];
};

export default useInteractiveTableSettings;