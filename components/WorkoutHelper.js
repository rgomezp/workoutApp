import {AsyncStorage} from 'react-native';

export default class WorkoutHelper {
    /**
     * Saves Workout
     * @param {Object} payload 
     */
    static saveWorkout(payload) {
        const {navigate} = payload.navigation;
        const {reps, sets, weight, difficulty} = payload.holdingArea;
        const {notes, title, updateHistoryInRedux, updateDataInRedux} = payload;
        var {historyArr, exercises} = payload;

        this.saveData(title+":notes", notes);
        
        // save to history
        let date = new Date();
        let history = {sets, reps, weight, difficulty, date: JSON.stringify(date)};

        if (historyArr.length == 14) {
            historyArr = historyArr.slice(1);
        }

        historyArr.push(history);

        this.saveData(title+":history", JSON.stringify(historyArr));
        updateHistoryInRedux({[title]:historyArr});

        let exercise = {title, notes, reps, sets, weight, difficulty};
        exercises[title] = exercise;

        updateDataInRedux(exercises);
        navigate('Home');
    }

    static async saveData(key, text) {
        try {
            await AsyncStorage.setItem(key, text);
        } catch (error) {
            console.log("Error saving data:", error);
        } 
    }
}