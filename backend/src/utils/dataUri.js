import DataUriParser from "datauri/parser.js";
import path from "path";
import mime from "mime-types";

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname);
    const mimeType = mime.lookup(extName); // 'application/pdf' or 'image/jpeg'
    return parser.format(mimeType, file.buffer);
};

export default getDataUri;
