import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        strength?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type StyledPasswordStrengthProps = typeof __propDef.props;
export type StyledPasswordStrengthEvents = typeof __propDef.events;
export type StyledPasswordStrengthSlots = typeof __propDef.slots;
export default class StyledPasswordStrength extends SvelteComponentTyped<StyledPasswordStrengthProps, StyledPasswordStrengthEvents, StyledPasswordStrengthSlots> {
}
export {};
