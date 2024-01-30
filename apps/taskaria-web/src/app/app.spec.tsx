import App from './app';
import { renderWithProviders } from '@taskaria-app/test-util-react';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<App />);
    expect(baseElement).toBeTruthy();
  });
});
