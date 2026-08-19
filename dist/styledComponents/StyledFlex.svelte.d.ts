import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        flexDirection?: string;
        alignItems?: string;
        justifyContent?: string;
        wrap?: string;
        width?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type StyledFlexProps = typeof __propDef.props;
export type StyledFlexEvents = typeof __propDef.events;
export type StyledFlexSlots = typeof __propDef.slots;
export default class StyledFlex extends SvelteComponentTyped<StyledFlexProps, StyledFlexEvents, StyledFlexSlots> {
}
export {};
