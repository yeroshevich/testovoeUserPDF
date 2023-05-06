import { config } from 'dotenv';
import * as process from "process";
config({ path: `.env.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, DOMEN,DIR_PLACEMENT   } = process.env;

export const USER_FILES_PATH = DIR_PLACEMENT == 'docker'?`${process.cwd()}/src/public/user/`:`${process.cwd()}\\src\\public\\user\\`
export const ASSETS_PATH = DIR_PLACEMENT == 'docker'?`${process.cwd()}/src/assets/`:`${process.cwd()}\\src\\assets\\`

export const PLACEMENT_SEPARATOR = DIR_PLACEMENT=='docker'?'/':'\\'
