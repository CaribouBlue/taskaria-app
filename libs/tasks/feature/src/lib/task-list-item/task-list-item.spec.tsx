import { render } from '@testing-library/react';

import TaskListItem from './task-list-item';
import { mockTask } from '@taskaria-app/tasks-data-access';

describe('TaskListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TaskListItem task={mockTask} />);
    expect(baseElement).toBeTruthy();
  });
});
