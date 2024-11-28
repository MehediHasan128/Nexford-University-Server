import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    default_pass: process.env.DEFAULT_PASS,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
    default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
    jwt_access_secret_token: process.env.JWT_ACCESS_SECRET_TOKEN
}