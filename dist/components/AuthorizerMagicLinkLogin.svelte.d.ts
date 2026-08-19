import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        onMagicLinkLogin?: Function | undefined;
        urlProps: {
            state: string;
            redirect_uri?: string | null;
        };
        roles?: string[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AuthorizerMagicLinkLoginProps = typeof __propDef.props;
export type AuthorizerMagicLinkLoginEvents = typeof __propDef.events;
export type AuthorizerMagicLinkLoginSlots = typeof __propDef.slots;
export default class AuthorizerMagicLinkLogin extends SvelteComponentTyped<AuthorizerMagicLinkLoginProps, AuthorizerMagicLinkLoginEvents, AuthorizerMagicLinkLoginSlots> {
}
export {};
