import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';

vi.mock('../store', async () => {
	const mockStore = await import('./mockStore');
	return { store: mockStore.store };
});
vi.mock('@authorizerdev/authorizer-js', () => ({ Authorizer: vi.fn() }));

import AuthorizerBasicAuthLogin from '../components/AuthorizerBasicAuthLogin.svelte';
import { mockLogin } from './mockStore';

describe('AuthorizerBasicAuthLogin', () => {
	beforeEach(() => { mockLogin.mockReset(); });

	it('renders email and password fields', () => {
		const { container } = render(AuthorizerBasicAuthLogin);
		expect(container.querySelector('#authorizer-login-email')).toBeTruthy();
		expect(container.querySelector('#authorizer-login-password')).toBeTruthy();
	});

	it('validates empty email', async () => {
		const { container } = render(AuthorizerBasicAuthLogin);
		await fireEvent.input(container.querySelector('#authorizer-login-email')!, { target: { value: '' } });
		expect(container.textContent).toContain('Email is required');
	});

	it('validates invalid email', async () => {
		const { container } = render(AuthorizerBasicAuthLogin);
		await fireEvent.input(container.querySelector('#authorizer-login-email')!, { target: { value: 'not-an-email' } });
		expect(container.textContent).toContain('Please enter valid email');
	});

	it('validates empty password', async () => {
		const { container } = render(AuthorizerBasicAuthLogin);
		await fireEvent.input(container.querySelector('#authorizer-login-password')!, { target: { value: '' } });
		expect(container.textContent).toContain('Password is required');
	});

	it('calls login on form submit and handles success', async () => {
		const mockUser = { id: '1', email: 'test@test.com' };
		const mockToken = { access_token: 'tok', expires_in: 3600, user: mockUser };
		mockLogin.mockResolvedValueOnce({ data: mockToken, errors: null });

		const onLogin = vi.fn();
		const { container } = render(AuthorizerBasicAuthLogin, { props: { onLogin } });
		await fireEvent.input(container.querySelector('#authorizer-login-email')!, { target: { value: 'test@test.com' } });
		await fireEvent.input(container.querySelector('#authorizer-login-password')!, { target: { value: 'password123' } });
		await fireEvent.submit(container.querySelector('form')!);

		await waitFor(() => {
			expect(mockLogin).toHaveBeenCalledWith(
				expect.objectContaining({ email: 'test@test.com', password: 'password123' })
			);
		});
	});

	it('handles login errors', async () => {
		mockLogin.mockResolvedValueOnce({ data: null, errors: [{ message: 'Invalid credentials' }] });

		const { container } = render(AuthorizerBasicAuthLogin);
		await fireEvent.input(container.querySelector('#authorizer-login-email')!, { target: { value: 'test@test.com' } });
		await fireEvent.input(container.querySelector('#authorizer-login-password')!, { target: { value: 'wrong' } });
		await fireEvent.submit(container.querySelector('form')!);

		await waitFor(() => {
			expect(container.textContent).toContain('Invalid credentials');
		});
	});

	it('shows OTP screen when MFA is required', async () => {
		mockLogin.mockResolvedValueOnce({ data: { should_show_email_otp_screen: true }, errors: null });

		const { container } = render(AuthorizerBasicAuthLogin);
		await fireEvent.input(container.querySelector('#authorizer-login-email')!, { target: { value: 'test@test.com' } });
		await fireEvent.input(container.querySelector('#authorizer-login-password')!, { target: { value: 'password123' } });
		await fireEvent.submit(container.querySelector('form')!);

		await waitFor(() => {
			expect(container.querySelector('#authorizer-verify-otp')).toBeTruthy();
		});
	});
});
