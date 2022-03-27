import {render, screen} from '@testing-library/vue';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import 'whatwg-fetch';

import SignUpPage from '../SignUpPage';

describe('Sign Up Page', () => {
  describe('Layout', () => {
    it('has Sign Up header', () => {
      render(SignUpPage);
      const header = screen.queryByRole('heading', {name: 'Sign Up'});
      expect(header).toBeInTheDocument();
    });
    it('has username input', () => {
      render(SignUpPage);
      const input = screen.queryByLabelText('Username');
      expect(input).toBeInTheDocument();
    });
    it('has email input', () => {
      render(SignUpPage);
      const input = screen.queryByLabelText('E-mail');
      expect(input).toBeInTheDocument();
    });
    it('has password input', () => {
      render(SignUpPage);
      const input = screen.queryByLabelText('Password');
      expect(input).toBeInTheDocument();
    });
    it('has password type for password input', () => {
      render(SignUpPage);
      const input = screen.queryByLabelText('Password');
      expect(input.type).toBe('password');
    });
    it('has confirm password input', () => {
      render(SignUpPage);
      const input = screen.queryByLabelText('Confirm Password');
      expect(input).toBeInTheDocument();
    });
    it('has password type for confirm password input', () => {
      render(SignUpPage);
      const input = screen.queryByLabelText('Confirm Password');
      expect(input.type).toBe('password');
    });
    it('has Sign Up button', () => {
      render(SignUpPage);
      const button = screen.queryByRole('button', {name: 'Sign Up'});
      expect(button).toBeInTheDocument();
    });
    it('has Sign Up button initially disabled', () => {
      render(SignUpPage);
      const button = screen.queryByRole('button', {name: 'Sign Up'});
      expect(button).toBeDisabled();
    });
  });
  describe('Interactions', () => {
    it('enables the button when the password and confirm password fields have the same value', async () => {
      render(SignUpPage);
      const passwordInput = screen.queryByLabelText('Password');
      const confirmPasswordInput = screen.queryByLabelText('Confirm Password');
      await userEvent.type(passwordInput, 'P4ssword');
      await userEvent.type(confirmPasswordInput, 'P4ssword');
      const button = screen.queryByRole('button', {name: 'Sign Up'});
      expect(button).toBeEnabled();
    });
    it('send username, email and password to backend after clicking the button', async () => {
      let requestBody;
      const server = setupServer(
        rest.post('/api/1.0/users', (req, res, ctx) => {
          requestBody = req.body;
          return res(ctx.status(200));
        })
      );
      server.listen();

      render(SignUpPage);
      const usernameInput = screen.queryByLabelText('Username');
      const emailInput = screen.queryByLabelText('E-mail');
      const passwordInput = screen.queryByLabelText('Password');
      const confirmPasswordInput = screen.queryByLabelText('Confirm Password');
      await userEvent.type(usernameInput, 'user1');
      await userEvent.type(emailInput, 'user1@email.com');
      await userEvent.type(passwordInput, 'P4ssword');
      await userEvent.type(confirmPasswordInput, 'P4ssword');
      const button = screen.queryByRole('button', {name: 'Sign Up'});

      await userEvent.click(button);

      await server.close();

      expect(requestBody).toEqual({
        username: 'user1',
        email: 'user1@email.com',
        password: 'P4ssword',
      });
    });
  });
});
