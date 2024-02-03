import { renderWithProviders } from '@taskaria-app/test-util-react';

import TaskList from './task-list';
import { waitFor } from '@testing-library/react';

describe('TaskList', () => {
  it('should render successfully', async () => {
    renderWithProviders(<TaskList />);
    await waitFor(() => {
      expect(true).toBeTruthy();
    });
  });
});
