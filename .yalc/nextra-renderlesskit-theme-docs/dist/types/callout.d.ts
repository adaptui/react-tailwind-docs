import React from "react";
declare const themes: {
    default: string;
    error: string;
    warning: string;
};
interface CalloutProps {
    /** Callout Theme default to 'default'  */
    type?: keyof typeof themes;
    /** default emoji 💡*/
    emoji: string;
}
export declare const Callout: React.FC<CalloutProps>;
export default Callout;
