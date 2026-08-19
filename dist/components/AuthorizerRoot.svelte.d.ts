import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        onLogin?: Function | undefined;
        onSignup?: Function | undefined;
        onMagicLinkLogin?: Function | undefined;
        onForgotPassword?: Function | undefined;
        roles?: string[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AuthorizerRootProps = typeof __propDef.props;
export type AuthorizerRootEvents = typeof __propDef.events;
export type AuthorizerRootSlots = typeof __propDef.slots;
export default class AuthorizerRoot extends SvelteComponentTyped<AuthorizerRootProps, AuthorizerRootEvents, AuthorizerRootSlots> {
}
export {};
