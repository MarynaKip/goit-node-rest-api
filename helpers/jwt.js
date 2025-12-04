import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "./variables.js";

export const createToken = payload => jwt.sign(payload, JWT_TOKEN, { expiresIn: "24h" });

export const verifyToken = token => {
    try {
        const data = jwt.verify(token, JWT_TOKEN);
        return {data, error: null}
    } catch(error) {
        return {error, data: null}
    }
}