import { SvelteComponentTyped } from "svelte";
import { MessageType } from '../constants';
declare const __propDef: {
    props: {
        type?: MessageType;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type StyledMessageWrapperProps = typeof __propDef.props;
export type StyledMessageWrapperEvents = typeof __propDef.events;
export type StyledMessageWrapperSlots = typeof __propDef.slots;
export default class StyledMessageWrapper extends SvelteComponentTyped<StyledMessageWrapperProps, StyledMessageWrapperEvents, StyledMessageWrapperSlots> {
}
export {};
