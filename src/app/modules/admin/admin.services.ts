import QueryBuilder from "../../builder/QueryBuilder";
import { Admin } from "./admin.model";

const getAllAdminFromDB = async(query: Record<string, unknown>) => {
    const AdminQuery = new QueryBuilder(Admin.find(), query);

    const data = await AdminQuery.queryModel;
    return data;
};


export const AdminServices = {
    getAllAdminFromDB
}