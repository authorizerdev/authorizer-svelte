import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        marginBottom?: string;
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
export type StyledLinkProps = typeof __propDef.props;
export type StyledLinkEvents = typeof __propDef.events;
export type StyledLinkSlots = typeof __propDef.slots;
export default class StyledLink extends SvelteComponentTyped<StyledLinkProps, StyledLinkEvents, StyledLinkSlots> {
}
export {};
