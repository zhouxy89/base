import './enzyme.config.js'                   // (1)
import React from 'react'
import { shallow } from 'enzyme'              // (2)
import Application from '../src/components/Application/Application'

function testInitialState() {
    const app = shallow(<Application/>);

    let actualConfig = app.state().config;
    let expectedConfig = null;
    expect(actualConfig).toEqual(expectedConfig);

    let actualOptions = app.state().options;
    let expectedOptions = {
        units: { miles: 3959, kilometers: 6371 },
        unit: 'miles',
        serverPort: 'localhost:'
    };

    expect(actualConfig).toEqual(expectedConfig);
}

test("Testing Application's initial state", testInitialState);

function testTrue() {
    expect(true).toEqual(true);
}

test("Testing basic boolean equivalency", testTrue);
