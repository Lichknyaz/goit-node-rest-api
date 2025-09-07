import User from "../db/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const {JWT_SECRET} = process.env;

export const registerUser = async payload => {
    const hashPassword = await bcrypt.hash(payload.password, 10)
    return User.create({...payload, password: hashPassword});
};

export const loginUser = async payload => {
    const { email, password } = payload;
    const user = await User.findOne({
        where: {
            email,
        },
    });
    if (!user) return null;

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) return null;

    const token = jwt.sign({id: user.id}, JWT_SECRET);
    await user.update({token});
    return { email: user.email, subscription: user.subscription, token };
}

export const logoutUser = async payload => {
    const {id} = payload;
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.update({token: null});
    return true;
}