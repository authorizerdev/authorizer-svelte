import type { AuthToken, User, Authorizer } from '@authorizerdev/authorizer-js';
import type { AuthorizerProviderActionType } from '../constants';

export type ConfigState = {
	authorizerURL?: string;
	redirectURL?: string;
	client_id?: string;
	is_google_login_enabled?: boolean;
	is_github_login_enabled?: boolean;
	is_facebook_login_enabled?: boolean;
	is_linkedin_login_enabled?: boolean;
	is_apple_login_enabled?: boolean;
	is_twitter_login_enabled?: boolean;
	is_microsoft_login_enabled?: boolean;
	is_email_verification_enabled?: boolean;
	is_basic_authentication_enabled?: boolean;
	is_magic_link_login_enabled?: boolean;
	is_sign_up_enabled?: boolean;
	is_strong_password_enabled?: boolean;
};

export type AuthorizerProviderAction = {
	type: AuthorizerProviderActionType;
	payload: any;
};

export type AuthorizerInputState = {
	user: User | null;
	token: AuthToken | null;
	loading: boolean;
	config: ConfigState;
};

export type AuthorizerState = {
	user: User | null;
	token: AuthToken | null;
	loading: boolean;
	config: ConfigState;
	logout: () => Promise<void>;
	setLoading: (data: boolean) => void;
	setUser: (data: null | User) => void;
	setToken: (data: null | AuthToken) => void;
	setAuthData: (data: AuthorizerInputState) => void;
	authorizerRef: Authorizer;
};

export type OtpDataType = {
	isScreenVisible: boolean;
	email: string;
};
