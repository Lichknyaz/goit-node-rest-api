import {loginUser, logoutUser, registerUser, verifyUserByToken, resendVerificationEmailService} from "../services/authServices.js";

export const registerController = async (req, res, next) => {
  try {
    const { email, subscription, avatarURL } = await registerUser(req.body);

    res.status(201).json({
      user: {
        email,
        subscription,
        avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const verifyEmailController = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const ok = await verifyUserByToken(verificationToken);
    if (!ok) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'Verification successful' });
  } catch (err) {
    next(err);
  }
};

export const resendVerifyController = async (req, res, next) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ message: 'missing required field email' });
    }
    const result = await resendVerificationEmailService(email);
    return res.status(result.status).json({ message: result.message });
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
    const {email, subscription, avatarURL} = req.user;

    res.json({
        email,
        subscription,
        avatarURL,
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