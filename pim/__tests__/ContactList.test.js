import React from 'react';
import renderer from 'react-test-renderer';

import ContactList from '../components/ui/contacts/ContactList';

it('renders ContactList correctly', () => {
  const tree = renderer.create(
    <ContactList />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
