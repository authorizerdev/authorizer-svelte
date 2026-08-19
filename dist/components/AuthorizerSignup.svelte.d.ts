import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        setView?: Function | undefined;
        onSignup?: Function | undefined;
        urlProps?: Record<string, any>;
        roles?: string[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AuthorizerSignupProps = typeof __propDef.props;
export type AuthorizerSignupEvents = typeof __propDef.events;
export type AuthorizerSignupSlots = typeof __propDef.slots;
export default class AuthorizerSignup extends SvelteComponentTyped<AuthorizerSignupProps, AuthorizerSignupEvents, AuthorizerSignupSlots> {
}
export {};
