import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        hasError?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        'form-input-label': {};
        'form-input-field': {};
        'form-input-error': {};
    };
};
export type StyledFormGroupProps = typeof __propDef.props;
export type StyledFormGroupEvents = typeof __propDef.events;
export type StyledFormGroupSlots = typeof __propDef.slots;
export default class StyledFormGroup extends SvelteComponentTyped<StyledFormGroupProps, StyledFormGroupEvents, StyledFormGroupSlots> {
}
export {};
