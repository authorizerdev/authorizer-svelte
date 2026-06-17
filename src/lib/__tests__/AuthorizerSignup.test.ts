import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';

vi.mock('../store', async () => {
	const mockStore = await import('./mockStore');
	return { store: mockStore.store };
});
vi.mock('@authorizerdev/authorizer-js', () => ({ Authorizer: vi.fn() }));

import AuthorizerSignup from '../components/AuthorizerSignup.svelte';
import { mockSignup } from './mockStore';

describe('AuthorizerSignup', () => {
	beforeEach(() => { mockSignup.mockReset(); });

	it('renders email, password, and confirm password fields', () => {
		const { container } = render(AuthorizerSignup);
		expect(container.querySelector('#authorizer-sign-up-email')).toBeTruthy();
		expect(container.querySelector('#authorizer-sign-up-password')).toBeTruthy();
		expect(container.querySelector('#authorizer-sign-up-confirm-password')).toBeTruthy();
	});

	it('validates password mismatch', async () => {
		const { container } = render(AuthorizerSignup);
		await fireEvent.input(container.querySelector('#authorizer-sign-up-password')!, { target: { value: 'password1' } });
		await fireEvent.input(container.querySelector('#authorizer-sign-up-confirm-password')!, { target: { value: 'password2' } });
		await waitFor(() => {
			expect(container.textContent).toContain("Password and confirm passwords don't match");
		});
	});

	it('calls signup on form submit with access_token response', async () => {
		const mockToken = { access_token: 'tok', expires_in: 3600, user: { id: '1', email: 'test@test.com' } };
		mockSignup.mockResolvedValueOnce({ data: mockToken, errors: null });

		const onSignup = vi.fn();
		const { container } = render(AuthorizerSignup, { props: { onSignup } });
		await fireEvent.input(container.querySelector('#authorizer-sign-up-email')!, { target: { value: 'test@test.com' } });
		await fireEvent.input(container.querySelector('#authorizer-sign-up-password')!, { target: { value: 'Test@123' } });
		await fireEvent.input(container.querySelector('#authorizer-sign-up-confirm-password')!, { target: { value: 'Test@123' } });
		await fireEvent.submit(container.querySelector('form')!);

		await waitFor(() => {
			expect(mockSignup).toHaveBeenCalledWith(expect.objectContaining({
				email: 'test@test.com', password: 'Test@123', confirm_password: 'Test@123'
			}));
		});
	});

	it('shows success message when signup returns message', async () => {
		mockSignup.mockResolvedValueOnce({ data: { message: 'Please verify your email' }, errors: null });
		const { container } = render(AuthorizerSignup);
		await fireEvent.input(container.querySelector('#authorizer-sign-up-email')!, { target: { value: 'test@test.com' } });
		await fireEvent.input(container.querySelector('#authorizer-sign-up-password')!, { target: { value: 'Test@123' } });
		await fireEvent.input(container.querySelector('#authorizer-sign-up-confirm-password')!, { target: { value: 'Test@123' } });
		await fireEvent.submit(container.querySelector('form')!);
		await waitFor(() => { expect(container.textContent).toContain('Please verify your email'); });
	});

	it('handles signup errors', async () => {
		mockSignup.mockResolvedValueOnce({ data: null, errors: [{ message: 'Email already exists' }] });
		const { container } = render(AuthorizerSignup);
		await fireEvent.input(container.querySelector('#authorizer-sign-up-email')!, { target: { value: 'test@test.com' } });
		await fireEvent.input(container.querySelector('#authorizer-sign-up-password')!, { target: { value: 'Test@123' } });
		await fireEvent.input(container.querySelector('#authorizer-sign-up-confirm-password')!, { target: { value: 'Test@123' } });
		await fireEvent.submit(container.querySelector('form')!);
		await waitFor(() => { expect(container.textContent).toContain('Email already exists'); });
	});
});
