/** @typedef {typeof __propDef.props}  StyledWrapperProps */
/** @typedef {typeof __propDef.events}  StyledWrapperEvents */
/** @typedef {typeof __propDef.slots}  StyledWrapperSlots */
export default class StyledWrapper extends SvelteComponentTyped<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type StyledWrapperProps = typeof __propDef.props;
export type StyledWrapperEvents = typeof __propDef.events;
export type StyledWrapperSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: never;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
