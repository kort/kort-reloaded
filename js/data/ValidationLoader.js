import Config from '../constants/Config';

import DataLoader from './DataLoader';

import TaskReward from '../dto/TaskReward';
import UserBadge from '../dto/UserBadge';
import Validation from '../dto/Validation';

import authenticationStore from '../stores/AuthenticationStore';

const validationsGetRestPath = Config.VALIDATIONS_GET_PATH;
const validationPostRestPath = Config.VALIDATION_POST_PATH;

const limit = Config.VALIDATIONS_LIMIT;
const radius = Config.RADIUS;

export default class ValidationLoader extends DataLoader {
  static _initValidations(rawValidations) {
    const validations = [];
    rawValidations.return.forEach((rawValidation) => {
      if (rawValidation.fix_user_id === authenticationStore.getUserId()) {
        validations.push(
          new Validation(rawValidation.id, rawValidation.type, rawValidation.title,
            rawValidation.bug_question, rawValidation.view_type, rawValidation.latitude,
            rawValidation.longitude, rawValidation.vote_koin_count, rawValidation.promo_id,
            rawValidation.extra_coins, rawValidation.fix_user_id, rawValidation.fixmessage,
            rawValidation.falsepositive, rawValidation.upratings, rawValidation.downratings,
            rawValidation.required_votes, rawValidation.osm_id, rawValidation.osm_type,
            rawValidation.geom, rawValidation.txt1, rawValidation.txt2, rawValidation.txt3,
            rawValidation.txt4, rawValidation.txt5
          )
        );
      }
    });

    return validations;
  }

  static _initJsonValidation(validation, valid) {
    return JSON.stringify({
      id: validation.id,
      fix_id: validation.id,
      user_id: authenticationStore.getUserId(),
      valid,
    });
  }

  static _initTaskReward(rawTaskReward) {
    const badges = [];
    rawTaskReward.badges.forEach((rawBadge) => {
      badges.push(new UserBadge(null, rawBadge.name, null, null, null, null, true, Date.now()));
    });

    return new TaskReward(badges, rawTaskReward.koin_count_new, rawTaskReward.koin_count_total);
  }

  static getValidations(latitude, longitude, onSuccess, onError) {
    const parameters = [];
    if (limit !== null) parameters.push(`limit=${limit}`);
    if (radius !== null) parameters.push(`radius=${radius}`);
    const requestUrl = super.createRequestUrl(
      validationsGetRestPath, [latitude, longitude], parameters);
    super.makeGetRequest(
      requestUrl,
      true,
      (rawValidations) => onSuccess(ValidationLoader._initValidations(rawValidations)),
      onError
    );
  }

  static postValidation(validation, valid, onSuccess, onError) {
    const requestUrl = super.createRequestUrl(validationPostRestPath, null, null);
    super.makePostRequest(
      requestUrl,
      ValidationLoader._initJsonValidation(validation, valid),
      (rawTaskReward) => onSuccess(ValidationLoader._initTaskReward(rawTaskReward)),
      onError
    );
  }
}
