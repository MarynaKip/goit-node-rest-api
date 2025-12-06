import multer from "multer";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";

const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`
        const fileName = `${uniquePrefix}_${file.originalname}`

        cb(null, fileName)
    }
});

const limits = {
    filesize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb) => {
    const extension = file.originalname.split(".").pop();
    if(extension === "exe") {
        return cb(HttpError(400, ".exe extension not allowed"))
    }
    cb(null, true)
};

const upload = multer({
    storage,
    limits,
    fileFilter,
})

export default upload;