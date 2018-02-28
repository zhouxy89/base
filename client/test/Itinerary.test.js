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
import Itinerary from '../src/Itinerary'

/* Both of these tests are functionally identical although the standard way
 *  of writing tests uses lambda or anonymous functions. These are useful
 *  for defining functions that will only be in your code once but may be
 *  called multiple times by whatever they are passed to.
*/

/* Test example using a pre-defined function */
function testExample() {
  const startProps = {
      'options': {
        'distance': ""
        },
      'distances': [12, 23, 34, 45, 65, 19],
      'places': []
    };
  const itinerary = shallow((
      <Itinerary trip={startProps}/>
    ));

  const expected = startProps.distances.map((item) => <td>{item}</td>);
  const actual = itinerary.instance().createTable();

  expect(actual.dists).toEqual(expected);
}

test('Check to see if table gets made correctly (Function)', testExample);

/*--------------------------------------------------------------------------*/

/* Test example using an anonymous function */
test('Check to see if table gets made correctly (Lambda)', () => {
  /* First we create the props that normally would be passed to the component (1).
   *  Afterwards, we create a shallow version of our Itinerary component (2). With our
   *  new shallow component we can call ShallowComponent.instance() to gain access
   *  to it's methods (3).  Lastly, we check to see if the table layout created by the
   *  Itinerary component matches what we would expect (4).
  */

  const startProps = {                        // (1)
      'options': {
        'distance': ""
        },
      'distances': [12, 23, 34, 45, 65, 19],
      'places': []
    };
  const itinerary = shallow((                 // (2)
      <Itinerary trip={startProps}/>
    ));

  const expected = startProps.distances.map((item) => <td>{item}</td>);
  const actual = itinerary.instance().createTable();                      // (3)

  expect(actual.dists).toEqual(expected);                                 // (4)
});
