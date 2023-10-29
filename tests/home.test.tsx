import { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import HomePage from '../app/page';

type ClerkProviderArgsType = {
  children: ReactNode;
};

vi.mock('@clerk/nextjs', () => {
  // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
  const mockedFunctions = {
    auth: () =>
      new Promise(resolve =>
        resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' }),
      ),
    ClerkProvider: ({ children }: ClerkProviderArgsType) => (
      <div>{children}</div>
    ),
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
        fullName: 'Charles Harris',
      },
    }),
  };

  return mockedFunctions;
});

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' }),
  };
});

it('Renders Home Page Properly', async () => {
  render(await HomePage());

  // Assert that the welcome message displays
  expect(
    await screen.findByText('The Best Journal App, period.'),
  ).toBeInTheDocument();
});
