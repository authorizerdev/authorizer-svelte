import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        setView?: Function | undefined;
        onLogin?: Function | undefined;
        urlProps?: Record<string, any>;
        roles?: string[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AuthorizerBasicAuthLoginProps = typeof __propDef.props;
export type AuthorizerBasicAuthLoginEvents = typeof __propDef.events;
export type AuthorizerBasicAuthLoginSlots = typeof __propDef.slots;
export default class AuthorizerBasicAuthLogin extends SvelteComponentTyped<AuthorizerBasicAuthLoginProps, AuthorizerBasicAuthLoginEvents, AuthorizerBasicAuthLoginSlots> {
}
export {};
