import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        onReset?: Function | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AuthorizerResetPasswordProps = typeof __propDef.props;
export type AuthorizerResetPasswordEvents = typeof __propDef.events;
export type AuthorizerResetPasswordSlots = typeof __propDef.slots;
export default class AuthorizerResetPassword extends SvelteComponentTyped<AuthorizerResetPasswordProps, AuthorizerResetPasswordEvents, AuthorizerResetPasswordSlots> {
}
export {};
