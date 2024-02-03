import { render, waitFor } from '@testing-library/react';

import TaskCreationInput from './task-creation-input';
import { renderWithProviders } from '@taskaria-app/test-util-react';

describe('TaskCreationInput', () => {
  it('should render successfully', async () => {
    const { baseElement } = renderWithProviders(<TaskCreationInput />);
    await waitFor(() => {
      expect(baseElement).toBeTruthy();
    });
  });
});
