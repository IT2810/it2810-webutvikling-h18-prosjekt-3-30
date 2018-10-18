import React from 'react';
import renderer from 'react-test-renderer';

import ProgressBar from '../components/ui/steps/progressBar.android.js';

it('renders progressBarAndroid correctly', () => {
  const tree = renderer.create(
    <ProgressBar />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
