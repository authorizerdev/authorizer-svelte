import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        setView?: Function | undefined;
        onLogin?: Function | undefined;
        email: string;
        urlProps?: Record<string, any>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AuthorizerVerifyOtpProps = typeof __propDef.props;
export type AuthorizerVerifyOtpEvents = typeof __propDef.events;
export type AuthorizerVerifyOtpSlots = typeof __propDef.slots;
export default class AuthorizerVerifyOtp extends SvelteComponentTyped<AuthorizerVerifyOtpProps, AuthorizerVerifyOtpEvents, AuthorizerVerifyOtpSlots> {
}
export {};
