import { writable } from 'svelte/store';
import type { AuthorizerState } from '../types';

export const mockLogin = vi.fn();
export const mockSignup = vi.fn();
export const mockForgotPassword = vi.fn();
export const mockResetPassword = vi.fn();
export const mockMagicLinkLogin = vi.fn();
export const mockVerifyOtp = vi.fn();
export const mockResendOtp = vi.fn();
export const mockGetMetaData = vi.fn().mockResolvedValue({ data: {}, errors: null });
export const mockGetSession = vi.fn().mockResolvedValue({ data: null, errors: null });

export const store = writable<AuthorizerState>({
	config: {
		authorizerURL: 'http://localhost:8080',
		redirectURL: 'http://localhost:3000',
		client_id: 'test-client',
		is_google_login_enabled: false,
		is_github_login_enabled: false,
		is_facebook_login_enabled: false,
		is_linkedin_login_enabled: false,
		is_apple_login_enabled: false,
		is_twitter_login_enabled: false,
		is_microsoft_login_enabled: false,
		is_email_verification_enabled: false,
		is_basic_authentication_enabled: true,
		is_magic_link_login_enabled: false,
		is_sign_up_enabled: true,
		is_strong_password_enabled: false,
		is_multi_factor_auth_enabled: false,
		is_mobile_basic_authentication_enabled: false,
		is_phone_verification_enabled: false
	},
	user: null,
	token: null,
	loading: false,
	setLoading: vi.fn(),
	setToken: vi.fn(),
	setUser: vi.fn(),
	setAuthData: vi.fn(),
	authorizerRef: {
		login: mockLogin,
		signup: mockSignup,
		forgotPassword: mockForgotPassword,
		resetPassword: mockResetPassword,
		magicLinkLogin: mockMagicLinkLogin,
		verifyOtp: mockVerifyOtp,
		resendOtp: mockResendOtp,
		getMetaData: mockGetMetaData,
		getSession: mockGetSession,
		logout: vi.fn()
	} as any,
	logout: vi.fn()
});
