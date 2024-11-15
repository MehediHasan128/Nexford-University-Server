import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponce } from '../interface/error';

const handelValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponce => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );

  console.log(errorSources);

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};

export default handelValidationError;
