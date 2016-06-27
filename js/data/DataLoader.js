import I18n from 'react-native-i18n';

import AvailableDbLanguages from '../constants/i18n/AvailableDbLanguages';
import Config from '../constants/Config';
import authenticationStore from '../stores/AuthenticationStore';

const Buffer = require('buffer').Buffer;

function getLanguageCode() {
  let code = I18n.currentLocale().substring(0, 2);
  if (AvailableDbLanguages.indexOf(code) === -1) code = 'en';
  return code;
}

const requestLocation = `${Config.SERVER}${Config.API_PATH}`;
const languageCode = getLanguageCode();

export default class DataLoader {
  static _getQueryParametersString(queryParameters) {
    let queryParametersString;
    queryParametersString = queryParameters[0];
    for (let i = 1; i < queryParameters.length; i++) {
      queryParametersString += `,${queryParameters[i]}`;
    }
    return queryParametersString;
  }

  static _getParametersString(parameters) {
    let parametersString;
    parametersString = `?lang=${languageCode}`;
    if (parameters !== null && parameters.length !== 0 && parameters[0] !== null) {
      for (let i = 0; i < parameters.length; i++) {
        parametersString += `&${parameters[i]}`;
      }
    }
    return parametersString;
  }

  static _createAuthorizationHash() {
    const userLoggedIn = authenticationStore.isLoggedIn();
    if (!userLoggedIn) {
      return null;
    }

    const authenticatedUser = authenticationStore.getUserCredential();
    const userId = authenticatedUser.userId;
    const secret = authenticatedUser.secret;
    const hash = new Buffer(`${userId}:${secret}`).toString('base64');
    return hash;
  }

  static _createHeaders(requestMethod) {
    const authorizationHash = DataLoader._createAuthorizationHash();

    if (requestMethod === 'GET') {
      return { Authorization: `Basic ${authorizationHash}` };
    } else if (requestMethod === 'POST' || requestMethod === 'PUT') {
      return {
        Authorization: `Basic ${authorizationHash}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }

    return null;
  }

  static createRequestUrl(apiPath, queryParameters, parameters) {
    let requestUrl = requestLocation;

    if (!apiPath.startsWith('/')) requestUrl += '/';
    requestUrl = requestUrl + apiPath;

    if (queryParameters !== null && queryParameters.length !== 0 && queryParameters[0] !== null) {
      if (!requestUrl.endsWith('/')) requestUrl += '/';
      requestUrl += DataLoader._getQueryParametersString(queryParameters);
    }

    requestUrl += DataLoader._getParametersString(parameters);

    return requestUrl;
  }

  static makeGetRequest(requestUrl, authorized, onSuccess, onError) {
    let authorizationHeader = {};
    if (authorized === true) {
      authorizationHeader = this._createHeaders('GET');
    }

    fetch(requestUrl, { headers: authorizationHeader })
      .then((response) => {
        if (!response.ok) {
          onError(new Error(`Bad Request.\n
            URL: ${requestUrl}\n
            Status: ${response.status}\n
            Status Text: ${response.statusText}`));
          return null;
        }

        return response.json();
      })
      .then((responseData) => responseData)
      .then((data) => onSuccess(data))
      .catch((error) => {
        if (onError !== null) onError(error);
      })
      .done();
  }

  static _makePutOrPostRequest(requestUrl, jsonBody, onSuccess, onError, requestMethod) {
    if (requestMethod !== 'PUT' && requestMethod !== 'POST') {
      throw new Error('Request method needs to be of type \'PUT\' or \'POST\'.');
    }

    const headers = this._createHeaders(requestMethod);
    fetch(requestUrl, {
      headers,
      method: requestMethod,
      body: jsonBody,
    })
      .then((response) => {
        if (!response.ok) {
          onError(new Error(`Bad Request.\n
            URL: ${requestUrl}\n
            Body: ${jsonBody}\n
            Status: ${response.status}\n
            Status Text: ${response.statusText}`));
          return null;
        }

        return response.json();
      })
      .then((responseData) => responseData)
      .then((data) => onSuccess(data))
      .catch((error) => {
        if (onError != null) onError(error);
      })
      .done();
  }

  static makePostRequest(requestUrl, jsonBody, onSuccess, onError) {
    const requestMethod = 'POST';
    DataLoader._makePutOrPostRequest(requestUrl, jsonBody, onSuccess, onError, requestMethod);
  }

  static makePutRequest(requestUrl, jsonBody, onSuccess, onError) {
    const requestMethod = 'PUT';
    DataLoader._makePutOrPostRequest(requestUrl, jsonBody, onSuccess, onError, requestMethod);
  }
}
