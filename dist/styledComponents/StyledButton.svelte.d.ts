import { SvelteComponentTyped } from "svelte";
import { ButtonAppearance } from '../constants';
declare const __propDef: {
    props: {
        style?: Record<string, string>;
        appearance?: ButtonAppearance;
        disabled?: boolean;
    };
    events: {
        click: PointerEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type StyledButtonProps = typeof __propDef.props;
export type StyledButtonEvents = typeof __propDef.events;
export type StyledButtonSlots = typeof __propDef.slots;
export default class StyledButton extends SvelteComponentTyped<StyledButtonProps, StyledButtonEvents, StyledButtonSlots> {
}
export {};
