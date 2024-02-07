import { render } from '@testing-library/react';

import CorePageContainer from './core-page-container';

describe('CorePageContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CorePageContainer />);
    expect(baseElement).toBeTruthy();
  });
});
