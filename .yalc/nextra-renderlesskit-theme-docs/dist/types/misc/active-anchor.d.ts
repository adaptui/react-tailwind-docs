import React from "react";
export declare type ActiveAnchor = Record<string, {
    isActive?: boolean;
    aboveHalfViewport: boolean;
    index: number;
    insideHalfViewport: boolean;
}>;
export declare const useActiveAnchor: () => ActiveAnchor;
export declare const useActiveAnchorSet: () => (value: ActiveAnchor | ((prevState: ActiveAnchor) => ActiveAnchor)) => void;
export declare const ActiveAnchor: React.FC;
