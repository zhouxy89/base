import './enzyme.config.js'
import React from 'react'
import { shallow } from 'enzyme' // For shallow mounting a component without the sub-components rendered.
import Application from '../src/components/Application/Application'


function testInitialState() {
    const app = shallow(<Application/>); // Returns a shallow wrapper for the Application component.

    /* Get the initial properties of the rendered component (app) and compare them to expected values. */
    let actualConfig = app.state().serverConfig;
    let expectedConfig = null;
    expect(actualConfig).toEqual(expectedConfig);

    let actualOptions = app.state().planOptions;
    let expectedOptions = {
        units: { miles: 3959, kilometers: 6371 },
        unit: 'miles'
    };

    expect(actualOptions).toEqual(expectedOptions);
}

test("Testing Application's initial state", testInitialState);

function testUpdateOption() {
    const app = shallow(<Application/>);

    app.instance().updateOption("unit", "kilometers"); // Calls the rendered component's instance function.

    let actualUnit = app.state().planOptions.unit;
    let expectedUnit = "kilometers";
    expect(actualUnit).toEqual(expectedUnit);
}

test("Testing Application's updateOption function", testUpdateOption);
