import { Response } from 'express';

type TRsponseData<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TRsponseData<T>) => {
  return res.status(data?.statusCode).json({
    statusCode: data?.statusCode,
    success: data?.success,
    message: data?.message,
    data: data?.data,
  });
};

export default sendResponse;
