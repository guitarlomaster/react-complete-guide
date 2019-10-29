import {put, delay} from 'redux-saga/effects';
import axios from 'axios';

import * as actionTypes from "../actions/actionTypes";
import * as actions from '../actions'
import {getErrorMessageFromCode} from '../../shared/utility';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo6o7Ezbjb6cJnmyOoh5BX35Jcr0NEo8g';
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo6o7Ezbjb6cJnmyOoh5BX35Jcr0NEo8g';
    }
    try {
        const res = yield axios.post(url, authData);
        const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', res.data.localId);
        yield put(actions.authSuccess(res.data.idToken, res.data.localId));
        yield put(actions.checkAuthTimeout(res.data.expiresIn));   
    } catch (err) {
        const newErrObj = {
            ...err.response.data.error,
            message: yield getErrorMessageFromCode(err.response.data.error.message)
        };
        yield put(actions.authFail(newErrObj));
    }
}
