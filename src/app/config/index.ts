import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    default_pass: process.env.DEFAULT_PASS,
    default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
    default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
}