import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import Atlas from '../src/components/Atlas/Atlas';

function testInitialAtlasState() {

  const atlas = shallow(<Atlas />);

  let actualMarkerPosition = atlas.state().markerPosition;
  let expectedMarkerPosition = null;

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
}

test("Testing Atlas's Initial State", testInitialAtlasState);
