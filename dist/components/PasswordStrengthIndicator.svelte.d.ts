import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: string;
        setDisableButton: Function;
    };
    events: {
        click: PointerEvent;
        keydown: KeyboardEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PasswordStrengthIndicatorProps = typeof __propDef.props;
export type PasswordStrengthIndicatorEvents = typeof __propDef.events;
export type PasswordStrengthIndicatorSlots = typeof __propDef.slots;
export default class PasswordStrengthIndicator extends SvelteComponentTyped<PasswordStrengthIndicatorProps, PasswordStrengthIndicatorEvents, PasswordStrengthIndicatorSlots> {
}
export {};
