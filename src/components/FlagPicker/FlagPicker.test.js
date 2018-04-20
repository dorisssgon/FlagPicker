import React from 'react';
import FlagPicker from '../FlagPicker';
import renderer from 'react-test-renderer';

test('click list is correct',()=>{
    const component = renderer.create(
        <FlagPicker/>
    );
    let picker = component.toJSON();
    expect(picker).toMatchSnapshot();
})