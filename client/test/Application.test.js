import './enzyme.config.js'
import React from 'react'
import { shallow } from 'enzyme'
import Application from '../src/components/Application/Application'


function testInitialState() {
    const app = shallow(<Application/>);

    let actualConfig = app.state().serverConfig;
    let expectedConfig = null;
    expect(actualConfig).toEqual(expectedConfig);

    let actualOptions = app.state().options;
    let expectedOptions = {
        units: { miles: 3959, kilometers: 6371 },
        unit: 'miles'
    };

    expect(actualOptions).toEqual(expectedOptions);
}

test("Testing Application's initial state", testInitialState);

function testUpdateOption() {
    const app = shallow(<Application/>);

    app.instance().updateOption("unit", "kilometers");

    let actualUnit = app.state().options.unit;
    let expectedUnit = "kilometers";
    expect(actualUnit).toEqual(expectedUnit);
}

test("Testing Application's updateOption function", testUpdateOption);
