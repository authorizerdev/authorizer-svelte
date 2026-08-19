import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        setView?: Function | undefined;
        onForgotPassword?: Function | undefined;
        urlProps: {
            state: string;
            redirect_uri?: string | null;
        };
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AuthorizerForgotPasswordProps = typeof __propDef.props;
export type AuthorizerForgotPasswordEvents = typeof __propDef.events;
export type AuthorizerForgotPasswordSlots = typeof __propDef.slots;
export default class AuthorizerForgotPassword extends SvelteComponentTyped<AuthorizerForgotPasswordProps, AuthorizerForgotPasswordEvents, AuthorizerForgotPasswordSlots> {
}
export {};
