import * as actionTypes from './actionTypes';
import axios from 'axios';
import {AUTH_LOGOUT} from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo6o7Ezbjb6cJnmyOoh5BX35Jcr0NEo8g';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo6o7Ezbjb6cJnmyOoh5BX35Jcr0NEo8g';
        }
        axios.post(url, authData)
            .then(res => {
                //console.log(res);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                const newErrObj = {
                    ...err.response.data.error,
                    message: getErrorMessageFromCode(err.response.data.error.message)
                };
                dispatch(authFail(newErrObj));
            })
    }
};

const getErrorMessageFromCode = (code) => {
    switch (code) {
        case 'EMAIL_EXISTS':
            return 'The email address is already in use by another account.';
        case 'OPERATION_NOT_ALLOWED':
            return 'Password sign-in is disabled for this project.';
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            return 'We have blocked all requests from this device due to unusual activity. Try again later.';
        case 'EMAIL_NOT_FOUND':
            return 'There is no user record corresponding to this identifier. The user may have been deleted.';
        case 'INVALID_PASSWORD':
            return 'The password is invalid or the user does not have a password.';
        case 'USER_DISABLED':
            return 'The user account has been disabled by an administrator.';
        default:
            return 'Something went wrong. Try again later.';
    }
};