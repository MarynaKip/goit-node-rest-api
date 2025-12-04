import HttpError from "../helpers/HttpError.js";
import {findUser} from "../services/authServices.js";
import { verifyToken } from "../helpers/jwt.js";

const authenticate = async(req, res, next) => {
    try {
        const {authorization} = req.headers;
        if(!authorization) throw HttpError(401, "Authorization header missing")
        const [bearer, token] = authorization.split(" ")
        if(bearer != "Bearer") throw HttpError(401, "Authorization must have bearer type")

        const {data, error} = verifyToken(token)
        if(error) throw HttpError(401, error.message)

        const user = await findUser({id: data.id, token})
        if(!user) throw HttpError(401, "User not found")

        if(!user.token) throw HttpError(401, "User already logout")
        
        req.user = user
        next()
    } catch(error) {
        next(error);
    }
};

export default authenticate;