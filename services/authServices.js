import User from "../db/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import gravatar from "gravatar";
import { sendVerificationEmail } from "./emailService.js";
import { randomUUID } from "crypto";

const {JWT_SECRET} = process.env;

export const registerUser = async payload => {
    const hashPassword = await bcrypt.hash(payload.password, 10)
    const { email, ...rest } = payload;
    const avatarURL = gravatar.url(email, { s: '250', d: 'retro', r: 'g' }, true);
    const verificationToken = randomUUID();
    const user = await User.create({ ...rest, email, password: hashPassword, avatarURL, verificationToken, verify: false });
    try {
        await sendVerificationEmail(email, verificationToken);
    } catch (e) {
        console.error("Failed to send verification email:", e.message);
    }
    return user;
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

    if (!user.verify) return null;

    const token = jwt.sign({id: user.id}, JWT_SECRET);
    await user.update({token});
    return { email: user.email, subscription: user.subscription, token };
}

export const verifyUserByToken = async (token) => {
    const user = await User.findOne({ where: { verificationToken: token } });
    if (!user) return false;
    if (user.verify) return false;
    await user.update({ verify: true, verificationToken: null });
    return true;
}

export const resendVerificationEmailService = async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return { status: 404, message: 'User not found' };
    }
    if (user.verify) {
        return { status: 400, message: 'Verification has already been passed' };
    }
    let token = user.verificationToken;
    if (!token) {
        token = randomUUID();
        await user.update({ verificationToken: token });
    }
    await sendVerificationEmail(email, token);
    return { status: 200, message: 'Verification email sent' };
}

export const logoutUser = async payload => {
    const {id} = payload;
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.update({token: null});
    return true;
}