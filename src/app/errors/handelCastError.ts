import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponce } from "../interface/error";

const handelCastError = (err: mongoose.Error.CastError): TGenericErrorResponce => {

    const errorSources: TErrorSources = [{
        path: err?.path,
        message: err?.message
    }];

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid Id',
        errorSources
    }

};

export default handelCastError;