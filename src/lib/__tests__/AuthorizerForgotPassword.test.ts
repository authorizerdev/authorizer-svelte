import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';

vi.mock('../store', async () => {
	const mockStore = await import('./mockStore');
	return { store: mockStore.store };
});
vi.mock('@authorizerdev/authorizer-js', () => ({ Authorizer: vi.fn() }));

import AuthorizerForgotPassword from '../components/AuthorizerForgotPassword.svelte';
import { mockForgotPassword } from './mockStore';

describe('AuthorizerForgotPassword', () => {
	beforeEach(() => { mockForgotPassword.mockReset(); });

	it('renders email field', () => {
		const { container } = render(AuthorizerForgotPassword, { props: { urlProps: { state: '', redirect_uri: '' } } });
		expect(container.querySelector('#authorizer-forgot-password-email')).toBeTruthy();
	});

	it('validates empty email', async () => {
		const { container } = render(AuthorizerForgotPassword, { props: { urlProps: { state: '', redirect_uri: '' } } });
		await fireEvent.input(container.querySelector('#authorizer-forgot-password-email')!, { target: { value: '' } });
		expect(container.textContent).toContain('Email is required');
	});

	it('calls forgotPassword and shows success message', async () => {
		mockForgotPassword.mockResolvedValueOnce({ data: { message: 'Reset link sent to your email' }, errors: null });
		const { container } = render(AuthorizerForgotPassword, { props: { urlProps: { state: '', redirect_uri: '' } } });
		await fireEvent.input(container.querySelector('#authorizer-forgot-password-email')!, { target: { value: 'test@test.com' } });
		await fireEvent.submit(container.querySelector('form')!);
		await waitFor(() => {
			expect(mockForgotPassword).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@test.com' }));
			expect(container.textContent).toContain('Reset link sent to your email');
		});
	});

	it('shows error on forgotPassword failure', async () => {
		mockForgotPassword.mockResolvedValueOnce({ data: null, errors: [{ message: 'User not found' }] });
		const { container } = render(AuthorizerForgotPassword, { props: { urlProps: { state: '', redirect_uri: '' } } });
		await fireEvent.input(container.querySelector('#authorizer-forgot-password-email')!, { target: { value: 'test@test.com' } });
		await fireEvent.submit(container.querySelector('form')!);
		await waitFor(() => { expect(container.textContent).toContain('User not found'); });
	});
});
