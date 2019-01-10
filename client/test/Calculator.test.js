import './enzyme.config.js';
import React from 'react';
import {mount} from 'enzyme';
import Calculator from '../src/components/Application/Calculator/Calculator';
import {getOriginalServerPort} from "../src/api/restfulAPI";
import {Card, CardBody, CardHeader} from "reactstrap";

// Fake starting props to mount Calculator
const startProps = {
  'options': {
    'units': {'miles': 3959, 'kilometers': 6371},
    'unit': 'miles',
    'serverPort': 'black-bottle.cs.colostate.edu:31400'
  }
};

// Tests that createHeader() correctly returns a card with the expected contents
test('Testing the createHeader() function in Calculator', () => {

  const calculator = mount((
      <Calculator options={startProps.options}/>
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
});

/* Tests that create_input_fields() correctly renders 4 Input components
 * with the corresponding names of latitude and longitude
 */
test('Testing the create_input_fields() function in Calculator', () => {

  const calculator = mount((
      <Calculator options={startProps.options}/>
  ));

  let actualInputs = [];

  /* Takes every 'Input' component found in Calculator and pushes its 'name'
   * prop into the actualInputs array.
   */
  calculator.find('Input').map((input) => actualInputs.push(input.prop('name')));

  /* There should be 4 Input components with lat/long as 'name' prop (2 for
   * destination and 2 for origin).
   */
  let expectedInputs = [
      'latitude',
      'longitude',
      'latitude',
      'longitude'
  ];

  expect(actualInputs).toEqual(expectedInputs);

});


/* Tests that create_input_fields() correctly renders 4 Input components
 * with the corresponding names of latitude and longitude
 */
test('Testing the onChange event of longitude Input in Calculator', () => {

  const calculator = mount((
      <Calculator options={startProps.options}/>
  ));

  /* Create an onChange event targeting the Input 'longitude' with a
   * changed value of 32.563.
   */
  let event = { target: { name: 'longitude', value: 32.563} };

  /* Find all 'Input' components (Should be 4), and choose the first one,
   * corresponding to the Input mapped to the origin: longitude field in state.
   * Simulate the onChange event using Enzyme's simulate function:
   * https://github.com/airbnb/enzyme/blob/master/docs/api/ShallowWrapper/simulate.md
   * Finally, update the component so that the changed state is reflected.
   */
  calculator.find('Input').at(0).simulate('change', event);
  calculator.update(); // Force an update

  /* Grab the new origin state and compare it to the expected value
   */
  let actualOriginLongitude = calculator.state().origin.longitude;
  let expectedOriginLongitude = 32.563;
  expect(actualOriginLongitude).toEqual(expectedOriginLongitude);

});