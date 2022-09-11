export const AuthorizerProviderActionType = {
	SET_USER: 'SET_USER',
	SET_TOKEN: 'SET_TOKEN',
	SET_LOADING: 'SET_LOADING',
	SET_AUTH_DATA: 'SET_AUTH_DATA',
	SET_CONFIG: 'SET_CONFIG',
};

export const Views = {
	Login: 'Login',
	Signup: 'Signup',
	ForgotPassword: 'ForgotPassword',
};

export const ButtonAppearance = {
	Primary: 'Primary',
	Default: 'Default',
};

export const MessageType = {
	Error: 'Error',
	Success: 'Success',
};

// TODO use based on theme primary color
export const passwordStrengthIndicatorOpacity = {
	default: 0.15,
	weak: 0.4,
	good: 0.6,
	strong: 0.8,
	veryStrong: 1,
};
