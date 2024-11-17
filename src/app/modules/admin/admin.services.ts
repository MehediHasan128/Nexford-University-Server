import QueryBuilder from "../../builder/QueryBuilder";
import { Admin } from "./admin.model";

const getAllAdminFromDB = async(query: Record<string, unknown>) => {
    
    const AdminQuery = new QueryBuilder(Admin.find(), query);

    const data = await AdminQuery.queryModel;
    return data;
};


const getSigleAdminFromDB = async (adminId: string) => {
    const data = await Admin.findOne({id: adminId});
    return data;
}


export const AdminServices = {
    getAllAdminFromDB,
    getSigleAdminFromDB
}