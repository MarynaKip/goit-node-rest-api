import * as fs from "node:fs/promises";
import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";
import path from "node:path";
import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";
import sendEmail from "../helpers/sendEmail.js";

const avatarsDir = path.resolve("public", "avatars");

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);
  const avatarURL = gravatar.url(payload.email);
  const verificationToken = uuidv4();

  const user = await User.create({
    ...payload,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  await sendEmail({
    to: payload.email,
    subject: "Verify your email",
    html: `
          <a href="http://localhost:3000/api/auth/verify/${verificationToken}">
            Verify email
          </a>
        `,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or Password is wrong");
  }
  if (!user.verify) throw HttpError(401, "Email not verified");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or Password is wrong");
  }
  const payload = { id: user.id };
  const token = createToken(payload);

  await user.update({ token });
  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const getCurrent = async (user) => {
  await findUser({ email: user.email });
  return {
    email: user.email,
    subscription: user.subscription,
    avatarURL: user.avatarURL,
  };
};

export const logoutUser = async (user) => {
  await user.update({ token: null });
  return true;
};

export const uploadAvatar = async (user, file) => {
  let avatar = null;
  if (file) {
    const newPath = path.join(avatarsDir, file.filename);
    await fs.rename(file.path, newPath);
    avatar = path.join("avatars", file.filename);
  }
  user.update({ avatarURL: avatar });
  return { avatarURL: avatar };
};

export const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ where: { verificationToken } });

  if (!user) {
    throw HttpError(404, "Invalid verification token");
  }

  await user.update({
    verify: true,
    verificationToken: null,
  });

  return true;
};

export const resendVerifyUser = async ({email}) => {
    const user = await findUser({ email });
    if(!user) throw HttpError(404, "User not found");
    if(user.verify) throw HttpError(400, "Verification has already been passed");

    const verificationToken = uuidv4();
    await user.update({verificationToken})
    await sendEmail({
        to: email,
        subject: "Verify your email",
        html: `
              <a href="http://localhost:3000/api/auth/verify/${verificationToken}">
                Verify email
              </a>
            `,
      });
};