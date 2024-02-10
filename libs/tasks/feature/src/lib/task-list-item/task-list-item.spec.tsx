import { render } from '@testing-library/react';

import TaskListItem from './task-list-item';
import { mockTask } from '@taskaria-app/tasks-data-access';
import { renderWithProviders } from '@taskaria-app/test-util-react';

describe('TaskListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(
      <TaskListItem task={mockTask} />
    );
    expect(baseElement).toBeTruthy();
  });
});
