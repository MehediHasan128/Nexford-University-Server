import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    default_pass: process.env.DEFAULT_PASS,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    clodinary_api_key: process.env.CLOUDINARY_API_KEY,
    default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
    default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
    clodinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    clodinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    reset_password_ui_link: process.env.RESET_PASSWORD_UI_LINK,
    jwt_access_secret_token: process.env.JWT_ACCESS_SECRET_TOKEN,
    smtp_secreat_credential: process.env.SMTP_SECREAT_CREDENTIAL,
    jwt_refresh_secret_token: process.env.JWT_REFRESH_SECRET_TOKEN,
}