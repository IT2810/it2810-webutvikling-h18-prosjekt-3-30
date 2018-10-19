import React from 'react';
import renderer from 'react-test-renderer';

import AddNew from '../components/ui/Contacts/AddNew';

it('renders ContactList correctly', () => {
  const tree = renderer.create(
    <AddNew />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Testing changeing state in contact-form', () => {
  it('should change state if name is entered', () => {
    const instanceOf = renderer.create(<AddNew/>).getInstance();
    instanceOf.onChangeName('Brannmann Sam');
    expect(instanceOf.state.name).toEqual('Brannmann Sam');
  });

  it('should change state if phonenumber is entered', () => {
    const instanceOf = renderer.create(<AddNew/>).getInstance();
    instanceOf.onChangePhone('112');
    expect(instanceOf.state.phone).toEqual('112');
  });
});
