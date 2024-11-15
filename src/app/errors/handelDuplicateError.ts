/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources } from "../interface/error";

const handelDuplicateError = (err: any) => {

    const match = err.errorResponse.errmsg.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];

    const errorSources: TErrorSources = [{
        path: '',
        message: `${extractedMessage} is already exists`
    }];

    const statusCode = 400;

    return {
        statusCode,
        message: '',
        errorSources
    }

};


export default handelDuplicateError;