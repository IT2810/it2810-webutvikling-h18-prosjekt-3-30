import React from 'react';
import renderer from 'react-test-renderer';

import Contacts from '../components/ui/Contacts/Contacts';

it('renders contacts correctly', () => {
  const tree = renderer.create(
    <Contacts />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
