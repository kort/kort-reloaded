import ActionTypes from '../constants/ActionTypes';

import MissionLoader from '../data/MissionLoader';
import ValidationLoader from '../data/ValidationLoader';

import AppDispatcher from '../dispatcher/AppDispatcher';

function _onMissionsLoaded(missions) {
  AppDispatcher.dispatch({
    actionType: ActionTypes.MISSIONS_LOAD,
    data: missions,
  });
}

function _onValidationsLoaded(validations) {
  AppDispatcher.dispatch({
    actionType: ActionTypes.VALIDATIONS_LOAD,
    data: validations,
  });
}

function _onTasksLoaded(tasks) {
  AppDispatcher.dispatch({
    actionType: ActionTypes.TASKS_LOAD,
    data: tasks,
  });
}

export default class TaskActions {
  static loadTasks(latitude, longitude) {
    let tasks = [];
    let missionsLoaded = false;
    // let validationsLoaded = false;

    MissionLoader.getMissions(latitude, longitude, (missions) => {
      _onMissionsLoaded(missions);

      tasks = tasks.concat(missions);
      missionsLoaded = true;
// Don't load validations until API works again
      _onTasksLoaded(tasks);
    });
      /* if (validationsLoaded) {
        _onTasksLoaded(tasks);
      }
    });
    ValidationLoader.getValidations(latitude, longitude, (validations) => {
      _onValidationsLoaded(validations);

      tasks = tasks.concat(validations);
      validationsLoaded = true;
      if (missionsLoaded) {
        _onTasksLoaded(tasks);
      }
    });*/
  }
}
