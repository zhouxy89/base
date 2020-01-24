import './enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';
import Application from '../src/components/Application/Application';


function testInitialAppState() {

  const app = shallow(<Application/>);

  let actualMarkerPosition = app.state().markerPosition,
      actualMapCenter = app.state().mapCenter,
      expectedMarkerPosition = null,
      expectedMapCenter = [0,0,];

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
  expect(actualMapCenter).toEqual(expectedMapCenter);
}
test("Testing Application's Initial State", testInitialAppState);
