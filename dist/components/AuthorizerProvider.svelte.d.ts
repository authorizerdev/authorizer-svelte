import { SvelteComponentTyped } from "svelte";
import type { ConfigState } from '../types';
declare const __propDef: {
    props: {
        config: ConfigState;
        onStateChangeCallback?: Function | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type AuthorizerProviderProps = typeof __propDef.props;
export type AuthorizerProviderEvents = typeof __propDef.events;
export type AuthorizerProviderSlots = typeof __propDef.slots;
export default class AuthorizerProvider extends SvelteComponentTyped<AuthorizerProviderProps, AuthorizerProviderEvents, AuthorizerProviderSlots> {
}
export {};
