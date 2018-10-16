import React from 'react';
import renderer from 'react-test-renderer';

import StepCounter from '../components/ui/steps/StepCounter.js';

it('renders stepCounter correctly', () => {
  const tree = renderer.create(
    <StepCounter />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
