import './enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';

import Home from '../src/components/Application/Home';

function testInitialAppState() {

  const app = shallow(<Home />);

  let actualMarkerPosition = app.state().markerPosition;
  let actualMapCenter = app.state().mapCenter;

  let expectedMarkerPosition = null;
  let expectedMapCenter = [0, 0];

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
  expect(actualMapCenter).toEqual(expectedMapCenter);
}
test("Testing Home's Initial State", testInitialAppState);