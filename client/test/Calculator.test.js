import './enzyme.config.js';
import React from 'react';
import {mount} from 'enzyme';
import Calculator from '../src/components/Application/Calculator/Calculator';
import {Card, CardBody, CardHeader} from "reactstrap";

const startProperties = {
  'options': {
    'units': {'miles': 3959, 'kilometers': 6371},
    'activeUnit': 'miles',
    'serverPort': 'black-bottle.cs.colostate.edu:31400'
  }
};

function testCreateHeader() {
  const calculator = mount((
      <Calculator options={startProperties.options}/>
  ));

  let actual = calculator.instance().create_header();
  let expected = (
      <Card>
        <CardHeader>Calculator</CardHeader>
        <CardBody>
          Determine the distance between the origin and destination.
          Change the units on the <b>Options</b> page.
        </CardBody>
      </Card>);

  expect(actual).toEqual(expected);
}

test('Testing the createHeader() function in Calculator', testCreateHeader);

function testCreateInputFields() {
  const calculator = mount((
      <Calculator options={startProperties.options}/>
  ));

  let actualInputs = [];

  calculator.find('Input').map((input) => actualInputs.push(input.prop('name')));

  let expectedInputs = [
    'latitude',
    'longitude',
    'latitude',
    'longitude'
  ];

  expect(actualInputs).toEqual(expectedInputs);
}

/* Tests that create_input_fields() correctly renders 4 Input components
 * with the corresponding names of latitude and longitude
 */
test('Testing the create_input_fields() function in Calculator', testCreateInputFields);

function testInputOnChange() {
  const calculator = mount((
      <Calculator options={startProperties.options}/>
  ));

  let event = { target: { name: 'longitude', value: 32.563} };

  calculator.find('Input').at(0).simulate('change', event);
  calculator.update(); // Force an update

  let actualOriginLongitude = calculator.state().origin.longitude;
  let expectedOriginLongitude = 32.563;
  expect(actualOriginLongitude).toEqual(expectedOriginLongitude);
}

/* Create an onChange event targeting the Input 'longitude' with a
 * changed value of 32.563, then simulate the change on the first longitude
 * input field. Finally, update the component so that the changed state
 * is reflected.
 *
 * https://github.com/airbnb/enzyme/blob/master/docs/api/ShallowWrapper/simulate.md
 */
test('Testing the onChange event of longitude Input in Calculator', testInputOnChange);