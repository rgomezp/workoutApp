
import 'react-native';
import React from 'react';
import _WorkoutSelector from '../../components/WorkoutSelector/WorkoutSelector';
import {shallow, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

const WorkoutSelector = _WorkoutSelector.WrappedComponent;

configure({ adapter: new Adapter() });

describe('unitTets', () => {
    var WorkoutSelectorWrapper;

    beforeEach(() => {
        const props = {
            screenProps : {
                store : {
                    subscribe : jest.fn()
                }
            }
        }
         WorkoutSelectorWrapper = shallow(<WorkoutSelector {...props}/>);
    });

    it('didSortExercises', () => {
        const exercises = {
            "Benchpress":{
                title:"Benchpress",
            },
            "9,8 Curls":{
                title:"9,8 Curls",
            },
            "Dumbells":{
                title:"Dumbells",
            },
            "Abs":{
                title:"Abs",
            }
        }

        const targetExercises = [{ title:"9,8 Curls"}, { title:"Abs" }, { title:"Benchpress" }, { title:"Dumbells" }];
        expect(WorkoutSelectorWrapper.instance().sortExercises(exercises)).toStrictEqual(targetExercises);
    })
});