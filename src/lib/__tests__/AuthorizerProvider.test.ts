import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import { get } from 'svelte/store';

vi.mock('../store', async () => {
	const mockStore = await import('./mockStore');
	return { store: mockStore.store };
});

vi.mock('@authorizerdev/authorizer-js', () => ({ Authorizer: vi.fn() }));

import AuthorizerProvider from '../components/AuthorizerProvider.svelte';
import { store } from './mockStore';

describe('AuthorizerProvider', () => {
	it('renders slot content', () => {
		const { container } = render(AuthorizerProvider, {
			props: {
				config: {
					authorizerURL: 'http://localhost:8080',
					redirectURL: 'http://localhost:3000',
					client_id: 'test-client'
				}
			}
		});
		expect(container).toBeTruthy();
	});

	it('initializes store with config', () => {
		render(AuthorizerProvider, {
			props: {
				config: {
					authorizerURL: 'http://localhost:8080',
					redirectURL: 'http://localhost:3000',
					client_id: 'test-client'
				}
			}
		});
		const state = get(store);
		expect(state.config.authorizerURL).toBe('http://localhost:8080');
	});

	it('sets up setAuthData function in store', () => {
		render(AuthorizerProvider, {
			props: {
				config: {
					authorizerURL: 'http://localhost:8080',
					redirectURL: 'http://localhost:3000',
					client_id: 'test-client'
				}
			}
		});
		const state = get(store);
		expect(typeof state.setAuthData).toBe('function');
	});
});
