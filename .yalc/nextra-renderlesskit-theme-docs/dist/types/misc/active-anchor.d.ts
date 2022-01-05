import React from "react";
export declare type ActiveAnchorState = Record<string, {
    isActive?: boolean;
    aboveHalfViewport: boolean;
    index: number;
    insideHalfViewport: boolean;
}>;
export declare const useActiveAnchor: () => ActiveAnchorState;
export declare const useActiveAnchorSet: () => (value: ActiveAnchorState | ((prevState: ActiveAnchorState) => ActiveAnchorState)) => void;
export declare const ActiveAnchor: React.FC;
