import * as actionTypes from './actionTypes';
import axios from 'axios';

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
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout());
    //     }, expirationTime * 1000);
    // };
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
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
