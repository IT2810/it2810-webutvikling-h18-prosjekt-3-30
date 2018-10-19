import React from 'react';
import renderer from 'react-test-renderer';

import ContactDetails from '../components/ui/Contacts/ContactDetails';

// This test failed because jest don't understand the property 'state'
it('renders contacts correctly', () => {
  const tree = renderer.create(
    <ContactDetails/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
