// Note the name of this file has X.test.js. Jest looks for any files with this pattern.

import './enzyme.config.js'
import React from 'react'
import { mount } from 'enzyme'
import Units from '../src/components/Application/Options/Units'

const startProperties = {
  'config': { 'units': {'miles':3959, 'kilometers':6371} },
  'units': { 'unit': 'miles' },
};

function testButtonValues() {
  const units = mount((
      <Units options={startProperties.config} units={startProperties.units}/>
    ));

  let actual = [];
  units.find('Button').map((element) => actual.push(element.prop('value')));
  let expected = Object.keys(startProperties.config.units);

  expect(actual.sort()).toEqual(expected.sort());
}

/* Deep render (mount) Units to be able to test the properties of the Buttons
 * that get rendered inside of it.
 */
test('Check to see if a Button is rendered for each unit', testButtonValues);
