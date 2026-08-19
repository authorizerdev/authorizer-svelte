import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        urlProps?: {
            scope: string[] | undefined;
        };
        roles?: string[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AuthorizerSocialLoginProps = typeof __propDef.props;
export type AuthorizerSocialLoginEvents = typeof __propDef.events;
export type AuthorizerSocialLoginSlots = typeof __propDef.slots;
export default class AuthorizerSocialLogin extends SvelteComponentTyped<AuthorizerSocialLoginProps, AuthorizerSocialLoginEvents, AuthorizerSocialLoginSlots> {
}
export {};
