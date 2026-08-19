export var Views;
(function (Views) {
    Views[Views["Login"] = 0] = "Login";
    Views[Views["Signup"] = 1] = "Signup";
    Views[Views["ForgotPassword"] = 2] = "ForgotPassword";
})(Views || (Views = {}));
export var ButtonAppearance;
(function (ButtonAppearance) {
    ButtonAppearance[ButtonAppearance["Primary"] = 0] = "Primary";
    ButtonAppearance[ButtonAppearance["Default"] = 1] = "Default";
})(ButtonAppearance || (ButtonAppearance = {}));
export var MessageType;
(function (MessageType) {
    MessageType[MessageType["Error"] = 0] = "Error";
    MessageType[MessageType["Success"] = 1] = "Success";
})(MessageType || (MessageType = {}));
export var AuthorizerProviderActionType;
(function (AuthorizerProviderActionType) {
    AuthorizerProviderActionType["SET_USER"] = "SET_USER";
    AuthorizerProviderActionType["SET_TOKEN"] = "SET_TOKEN";
    AuthorizerProviderActionType["SET_LOADING"] = "SET_LOADING";
    AuthorizerProviderActionType["SET_AUTH_DATA"] = "SET_AUTH_DATA";
    AuthorizerProviderActionType["SET_CONFIG"] = "SET_CONFIG";
})(AuthorizerProviderActionType || (AuthorizerProviderActionType = {}));
// TODO use based on theme primary color
export const passwordStrengthIndicatorOpacity = {
    default: 0.15,
    weak: 0.4,
    good: 0.6,
    strong: 0.8,
    veryStrong: 1
};
