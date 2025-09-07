import User from "../db/user.js";

export const registerUser = async payload => {
    return User.create(payload);
}

