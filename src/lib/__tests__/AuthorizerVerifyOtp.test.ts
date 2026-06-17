import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';

vi.mock('../store', async () => {
	const mockStore = await import('./mockStore');
	return { store: mockStore.store };
});
vi.mock('@authorizerdev/authorizer-js', () => ({ Authorizer: vi.fn() }));

import AuthorizerVerifyOtp from '../components/AuthorizerVerifyOtp.svelte';
import { mockVerifyOtp, mockResendOtp } from './mockStore';

describe('AuthorizerVerifyOtp', () => {
	beforeEach(() => { mockVerifyOtp.mockReset(); mockResendOtp.mockReset(); });

	it('renders OTP input', () => {
		const { container } = render(AuthorizerVerifyOtp, { props: { email: 'test@test.com' } });
		expect(container.querySelector('#authorizer-verify-otp')).toBeTruthy();
	});

	it('validates empty OTP', async () => {
		const { container } = render(AuthorizerVerifyOtp, { props: { email: 'test@test.com' } });
		await fireEvent.input(container.querySelector('#authorizer-verify-otp')!, { target: { value: '' } });
		await waitFor(() => { expect(container.textContent).toContain('OTP is required'); });
	});

	it('validates invalid OTP format', async () => {
		const { container } = render(AuthorizerVerifyOtp, { props: { email: 'test@test.com' } });
		await fireEvent.input(container.querySelector('#authorizer-verify-otp')!, { target: { value: 'abc' } });
		await waitFor(() => { expect(container.textContent).toContain('Please enter valid OTP'); });
	});

	it('calls verifyOtp on form submit', async () => {
		const mockToken = { access_token: 'tok', expires_in: 3600, user: { id: '1', email: 'test@test.com' } };
		mockVerifyOtp.mockResolvedValueOnce({ data: mockToken, errors: null });
		const onLogin = vi.fn();
		const { container } = render(AuthorizerVerifyOtp, { props: { email: 'test@test.com', onLogin } });
		await fireEvent.input(container.querySelector('#authorizer-verify-otp')!, { target: { value: 'AB123C' } });
		await fireEvent.submit(container.querySelector('form')!);
		await waitFor(() => {
			expect(mockVerifyOtp).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@test.com', otp: 'AB123C' }));
			expect(onLogin).toHaveBeenCalledWith(mockToken);
		});
	});

	it('shows error on verifyOtp failure', async () => {
		mockVerifyOtp.mockResolvedValueOnce({ data: null, errors: [{ message: 'Invalid OTP' }] });
		const { container } = render(AuthorizerVerifyOtp, { props: { email: 'test@test.com' } });
		await fireEvent.input(container.querySelector('#authorizer-verify-otp')!, { target: { value: 'AB123C' } });
		await fireEvent.submit(container.querySelector('form')!);
		await waitFor(() => { expect(container.textContent).toContain('Invalid OTP'); });
	});

	it('calls resendOtp when resend link is clicked', async () => {
		mockResendOtp.mockResolvedValueOnce({ data: { message: 'OTP sent successfully' }, errors: null });
		const { getByText } = render(AuthorizerVerifyOtp, { props: { email: 'test@test.com', setView: vi.fn() } });
		await fireEvent.click(getByText('Resend OTP'));
		await waitFor(() => { expect(mockResendOtp).toHaveBeenCalledWith({ email: 'test@test.com' }); });
	});
});
