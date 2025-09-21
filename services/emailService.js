import nodemailer from "nodemailer";

const { UKRNET_USER, UKRNET_PASS, BASE_URL } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKRNET_USER,
    pass: UKRNET_PASS,
  },
});

export const sendVerificationEmail = async (to, token) => {
  const verifyLink = `${BASE_URL}/api/auth/verify/${token}`;
  const mailOptions = {
    from: `GoIT Contacts <${UKRNET_USER}>`,
    to,
    subject: "Verify your email",
    html: `<p>Дякуємо за реєстрацію!</p>
<p>Будь ласка, підтвердіть ваш email, перейшовши за посиланням:</p>
<p><a href="${verifyLink}">Підтвердити email</a></p>`
  };
  await transporter.sendMail(mailOptions);
};
