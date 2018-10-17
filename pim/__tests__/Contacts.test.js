import React from 'react';
import renderer from 'react-test-renderer';

import Contacts from '../components/ui/contacts/Contacts';

it('renders contacts correctly', () => {
  const tree = renderer.create(
    <Contacts />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
