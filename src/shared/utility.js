export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
        const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        isValid = pattern.test(value) && isValid;
    }
    return isValid;
};

export const getErrorMessageFromCode = (code) => {
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
