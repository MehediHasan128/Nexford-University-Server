import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponce";
import { AdminServices } from "./admin.services";
import httpStatus from 'http-status';

const getAllAdmin = catchAsync(async(req, res) => {
    const data = await AdminServices.getAllAdminFromDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get all admin successfully',
        data: data,
      });
});


const getAdminById = catchAsync(async(req, res) => {
    const {adminId} = req.params;

    const data = await AdminServices.getSigleAdminFromDB(adminId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get admin successfully',
        data: data,
      });
})


export const AdminController = {
    getAllAdmin,
    getAdminById
}