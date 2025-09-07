import {loginUser, logoutUser, registerUser} from "../services/authServices.js";

export const registerController = async (req, res, next) => {
  try {
    const { email, subscription } = await registerUser(req.body);

    res.status(201).json({
      user: {
        email,
        subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};


export const loginController = async (req, res, next) => {
    try {
        const result = await loginUser(req.body);
        if (!result) {
            return res.status(401).json({ message: "Email or password is wrong" });
        }
        const { email, subscription, token } = result;

        res.json({
            token,
            user: {
                email,
                subscription,
            },
        });
    } catch (err) {
        next(err);
    }
}

export const getCurrentController = async (req, res, next) => {
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription
    })

}

export const logoutController = async (req, res, next) => {
    try {
        const result = await logoutUser(req.user);
        if (!result) {
            return res.status(401).json({ message: "Not authorized" });
        }
        return res.sendStatus(204);
    } catch (err) {
        next(err);
    }
}