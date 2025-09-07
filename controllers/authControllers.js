import {registerUser} from "../services/authServices.js";

export const registerController = async (req, res) => {
    const {email, username} = await registerUser(req.body);

    res.status(201).json({
        email,
        username,
    });

}
