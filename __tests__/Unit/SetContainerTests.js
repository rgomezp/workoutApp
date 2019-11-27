
import 'react-native';
import React from 'react';
import _SetContainer from '../../components/SetContainer/SetContainer';
import {shallow, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

const SetContainer = _SetContainer.WrappedComponent;

configure({ adapter: new Adapter() });

describe('unitTets', () => {
    var SetContainerWrapper;

    beforeEach(() => {
        const props = {
            exercise : {
                sets : "5",
                reps : "10",
                weight : "10",
                difficulty : "5"
            },
            holdingArea : jest.fn()
        }
         SetContainerWrapper = shallow(<SetContainer {...props}/>);
    });

    it('invalidWeightValues', () => {
        expect(SetContainerWrapper.instance().validateWeight("10001.1")).toEqual("!");
        expect(SetContainerWrapper.instance().validateWeight(".11.5")).toEqual("!");
        expect(SetContainerWrapper.instance().validateWeight("10.2")).toEqual("!");
        expect(SetContainerWrapper.instance().validateWeight("-102")).toEqual("!");
    })
    
    it('validWeightValues', () => {
        expect(SetContainerWrapper.instance().validateWeight("10.5")).toEqual("10½");
        expect(SetContainerWrapper.instance().validateWeight("10")).toEqual("10");
        expect(SetContainerWrapper.instance().validateWeight("0.5")).toEqual("0½");
        // trims off for 3 digit nums
        expect(SetContainerWrapper.instance().validateWeight("100.5")).toEqual("100"); 
    })
});