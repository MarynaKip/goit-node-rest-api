import ctrlWrapper from "../helpers/ctrlWrapper.js"
import { registerUser, loginUser, refreshUser, logoutUser, uploadAvatar } from "../services/authServices.js"

export const registerController = ctrlWrapper(async(req, res) => {
    const newUser = await registerUser(req.body)
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription
    })
})

export const loginController = ctrlWrapper(async(req, res) => {
    const result = await loginUser(req.body)

    res.json(result)
})

export const getCurrentController = ctrlWrapper(
    async(req, res) => {
        const result = await refreshUser(req.user)
        res.json(result)
    }
)

export const logoutController = ctrlWrapper(
    async(req, res) => {
        await logoutUser(req.user);
        res.status(204).send()
    }
)

export const uploadAvatarController = ctrlWrapper(
    async(req, res) => {
        const url = await uploadAvatar(req.user, req.file);
        res.json(url)
    }
)