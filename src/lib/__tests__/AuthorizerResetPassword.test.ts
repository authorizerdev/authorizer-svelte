import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';

vi.mock('../store', async () => {
	const mockStore = await import('./mockStore');
	return { store: mockStore.store };
});
vi.mock('@authorizerdev/authorizer-js', () => ({ Authorizer: vi.fn() }));
vi.mock('../utils/url', () => ({ getSearchParams: () => ({ token: 'test-reset-token', redirect_uri: '' }) }));

import AuthorizerResetPassword from '../components/AuthorizerResetPassword.svelte';
import { mockResetPassword } from './mockStore';

describe('AuthorizerResetPassword', () => {
	beforeEach(() => { mockResetPassword.mockReset(); });

	it('renders password and confirm password fields', () => {
		const { container } = render(AuthorizerResetPassword);
		expect(container.querySelector('#authorizer-reset-password')).toBeTruthy();
		expect(container.querySelector('#authorizer-reset-confirm-password')).toBeTruthy();
	});

	it('validates password mismatch', async () => {
		const { container } = render(AuthorizerResetPassword);
		await fireEvent.input(container.querySelector('#authorizer-reset-password')!, { target: { value: 'password1' } });
		await fireEvent.input(container.querySelector('#authorizer-reset-confirm-password')!, { target: { value: 'password2' } });
		await waitFor(() => { expect(container.textContent).toContain("Password and confirm passwords don't match"); });
	});

	it('calls resetPassword on submit', async () => {
		mockResetPassword.mockResolvedValueOnce({ data: { message: 'Password reset successfully' }, errors: null });
		const onReset = vi.fn();
		const { container } = render(AuthorizerResetPassword, { props: { onReset } });
		await fireEvent.input(container.querySelector('#authorizer-reset-password')!, { target: { value: 'NewPass@123' } });
		await fireEvent.input(container.querySelector('#authorizer-reset-confirm-password')!, { target: { value: 'NewPass@123' } });
		await fireEvent.submit(container.querySelector('form')!);
		await waitFor(() => {
			expect(mockResetPassword).toHaveBeenCalledWith(expect.objectContaining({
				token: 'test-reset-token', password: 'NewPass@123', confirm_password: 'NewPass@123'
			}));
			expect(onReset).toHaveBeenCalled();
		});
	});

	it('shows error on resetPassword failure', async () => {
		mockResetPassword.mockResolvedValueOnce({ data: null, errors: [{ message: 'Token expired' }] });
		const { container } = render(AuthorizerResetPassword);
		await fireEvent.input(container.querySelector('#authorizer-reset-password')!, { target: { value: 'NewPass@123' } });
		await fireEvent.input(container.querySelector('#authorizer-reset-confirm-password')!, { target: { value: 'NewPass@123' } });
		await fireEvent.submit(container.querySelector('form')!);
		await waitFor(() => { expect(container.textContent).toContain('Token expired'); });
	});
});
