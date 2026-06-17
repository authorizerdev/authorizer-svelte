import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';

vi.mock('../store', async () => {
	const mockStore = await import('./mockStore');
	return { store: mockStore.store };
});
vi.mock('@authorizerdev/authorizer-js', () => ({ Authorizer: vi.fn() }));

import AuthorizerMagicLinkLogin from '../components/AuthorizerMagicLinkLogin.svelte';
import { mockMagicLinkLogin } from './mockStore';

describe('AuthorizerMagicLinkLogin', () => {
	beforeEach(() => { mockMagicLinkLogin.mockReset(); });

	it('renders email field', () => {
		const { container } = render(AuthorizerMagicLinkLogin, { props: { urlProps: { state: '', redirect_uri: '' } } });
		expect(container.querySelector('#authorizer-magic-link-login-email')).toBeTruthy();
	});

	it('validates empty email', async () => {
		const { container } = render(AuthorizerMagicLinkLogin, { props: { urlProps: { state: '', redirect_uri: '' } } });
		await fireEvent.input(container.querySelector('#authorizer-magic-link-login-email')!, { target: { value: '' } });
		expect(container.textContent).toContain('Email is required');
	});

	it('validates invalid email', async () => {
		const { container } = render(AuthorizerMagicLinkLogin, { props: { urlProps: { state: '', redirect_uri: '' } } });
		await fireEvent.input(container.querySelector('#authorizer-magic-link-login-email')!, { target: { value: 'not-email' } });
		expect(container.textContent).toContain('Please enter valid email');
	});

	it('calls magicLinkLogin and shows success message', async () => {
		mockMagicLinkLogin.mockResolvedValueOnce({ data: { message: 'Magic link sent to your email' }, errors: null });
		const { container } = render(AuthorizerMagicLinkLogin, { props: { urlProps: { state: '', redirect_uri: '' } } });
		await fireEvent.input(container.querySelector('#authorizer-magic-link-login-email')!, { target: { value: 'test@test.com' } });
		await fireEvent.submit(container.querySelector('form')!);
		await waitFor(() => {
			expect(mockMagicLinkLogin).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@test.com' }));
			expect(container.textContent).toContain('Magic link sent to your email');
		});
	});

	it('shows error on magicLinkLogin failure', async () => {
		mockMagicLinkLogin.mockResolvedValueOnce({ data: null, errors: [{ message: 'User not found' }] });
		const { container } = render(AuthorizerMagicLinkLogin, { props: { urlProps: { state: '', redirect_uri: '' } } });
		await fireEvent.input(container.querySelector('#authorizer-magic-link-login-email')!, { target: { value: 'test@test.com' } });
		await fireEvent.submit(container.querySelector('form')!);
		await waitFor(() => { expect(container.textContent).toContain('User not found'); });
	});
});
