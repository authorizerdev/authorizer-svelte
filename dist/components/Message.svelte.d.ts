import { SvelteComponentTyped } from "svelte";
import { MessageType } from '../constants';
declare const __propDef: {
    props: {
        type?: MessageType;
        text?: string;
        onClose?: Function | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MessageProps = typeof __propDef.props;
export type MessageEvents = typeof __propDef.events;
export type MessageSlots = typeof __propDef.slots;
export default class Message extends SvelteComponentTyped<MessageProps, MessageEvents, MessageSlots> {
}
export {};
