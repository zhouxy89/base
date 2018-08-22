// Note the name of this file has X.test.js. Jest looks for any files with this pattern.

/*  First we import our Enzyme configuration (1), this is defined in a different
 *    file and is require to use Enzyme for components. In addition to the standard
 *    imports you've seen before, we are using Enzyme.shallow (2), this "renders"
 *    your component but only for the first layer in the DOM (ie. <Itinerary/> will
 *    just render <Itinerary/> even though it may have more components under it.).
 *    Shallow rendering prevents problems with lower components from showing up in
 *    the tests of parent components.
*/

import './enzyme.config.js'                   // (1)
import React from 'react'
import { shallow } from 'enzyme'              // (2)
import Itinerary from '../src/components/Application/Trip/Itinerary'

/* Both of these tests are functionally identical although the standard way
 *  of writing tests uses lambda or anonymous functions. These are useful
 *  for defining functions that will only be in your code once but may be
 *  called multiple times by whatever they are passed to.
*/

/* A test response for our client to use;
 * this object represents the props that would be passed to the Itinerary
 * component on construction.
 */
const startProps = {
  'options': {
    'distance': ""
  },
  'distances': [12, 23, 34, 45, 65, 19],
  // Note how the places array does not contain properly formatted values here
  // (no JSON objects with fields like name, etc.)
  'places': ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz']
};

/* Test example using a pre-defined function */
function testExample() {
  const itinerary = shallow((
      <Itinerary trip={startProps}/>
    ));

  // Extract the distances entries from the component under test,
  // and convert their text to numbers
  const actual = itinerary.find('#distances').find('td').map((dist) => {
      return Number(dist.text());
    });

  // We expect the actual list of numbers that was rendered to be the same
  // as what the example props contained
  expect(actual).toEqual(startProps.distances);
}

test('Check to see if table gets made correctly (Function)', testExample);

/*--------------------------------------------------------------------------*/

/* Test example using an anonymous function */
test('Check to see if table gets made correctly (Lambda)', () => {
  /*  First, we create a shallow version of our Itinerary component, using the
   *  startProps object defined above for its props (1). With our new shallow
   *  component, we can call ShallowComponent.find() to extract a certain part
   *  of the component and its children (2). Lastly, we check to see if the
   *  table of distance values created by the component is what we expect,
   *  given the example input (3).
  */

  const itinerary = shallow((                 // (1)
      <Itinerary trip={startProps}/>
    ));

  // Here, '#distances' will refer to the <tr> tag with id 'distances', and
  // all of its children. Then finding 'td' will return an array of all the
  // <td> tags created within the '#distances' <tr> tag.
  const actual = itinerary.find('#distances').find('td').map((dist) => { // (2)
    // Need to convert text to numbers
    return Number(dist.text());
  });

  expect(actual).toEqual(startProps.distances); // (3)
});
