import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';

vi.mock('../store', async () => {
	const mockStore = await import('./mockStore');
	return { store: mockStore.store };
});
vi.mock('@authorizerdev/authorizer-js', () => ({ Authorizer: vi.fn() }));

import AuthorizerSocialLogin from '../components/AuthorizerSocialLogin.svelte';
import { store } from './mockStore';

describe('AuthorizerSocialLogin', () => {
	beforeEach(() => {
		store.update((state) => ({
			...state,
			config: {
				...state.config,
				is_google_login_enabled: false, is_github_login_enabled: false,
				is_facebook_login_enabled: false, is_linkedin_login_enabled: false,
				is_apple_login_enabled: false, is_twitter_login_enabled: false,
				is_microsoft_login_enabled: false, is_basic_authentication_enabled: false,
				is_magic_link_login_enabled: false
			}
		}));
	});

	it('renders Google button when enabled', () => {
		store.update((s) => ({ ...s, config: { ...s.config, is_google_login_enabled: true } }));
		const { container } = render(AuthorizerSocialLogin);
		expect(container.textContent).toContain('Sign in with Google');
	});

	it('renders Github button when enabled', () => {
		store.update((s) => ({ ...s, config: { ...s.config, is_github_login_enabled: true } }));
		const { container } = render(AuthorizerSocialLogin);
		expect(container.textContent).toContain('Sign in with Github');
	});

	it('renders Facebook button when enabled', () => {
		store.update((s) => ({ ...s, config: { ...s.config, is_facebook_login_enabled: true } }));
		const { container } = render(AuthorizerSocialLogin);
		expect(container.textContent).toContain('Sign in with Facebook');
	});

	it('hides disabled providers', () => {
		const { container } = render(AuthorizerSocialLogin);
		expect(container.textContent).not.toContain('Sign in with Google');
		expect(container.textContent).not.toContain('Sign in with Github');
		expect(container.textContent).not.toContain('Sign in with Facebook');
	});

	it('renders multiple providers when enabled', () => {
		store.update((s) => ({
			...s, config: {
				...s.config, is_google_login_enabled: true, is_github_login_enabled: true, is_apple_login_enabled: true
			}
		}));
		const { container } = render(AuthorizerSocialLogin);
		expect(container.textContent).toContain('Sign in with Google');
		expect(container.textContent).toContain('Sign in with Github');
		expect(container.textContent).toContain('Sign in with Apple');
	});

	it('shows separator when social login and basic auth are both enabled', () => {
		store.update((s) => ({
			...s, config: { ...s.config, is_google_login_enabled: true, is_basic_authentication_enabled: true }
		}));
		const { container } = render(AuthorizerSocialLogin);
		expect(container.textContent).toContain('OR');
	});

	it('hides separator when only social login is enabled', () => {
		store.update((s) => ({
			...s, config: {
				...s.config, is_google_login_enabled: true,
				is_basic_authentication_enabled: false, is_magic_link_login_enabled: false
			}
		}));
		const { container } = render(AuthorizerSocialLogin);
		expect(container.textContent).not.toContain('OR');
	});
});
