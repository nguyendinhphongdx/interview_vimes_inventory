
const env = process.env.NODE_ENV || "development";

import dbConfig from '../config/db.config.json';
import { Dialect, Sequelize } from 'sequelize';
import { IDBConfiguration, environment } from '../types';



const config: IDBConfiguration = dbConfig[env as environment];



async function creatDatabase() {
    const sequelize = new Sequelize(`postgres://${config.username}:${config.password}@${config.host}:${config.port}/postgres`);
    try {
        const [_, res]: any = await sequelize.query(`SELECT FROM pg_database WHERE datname = '${config.database}'`);
        if (res.rowCount == 0) {
            await sequelize.query(`CREATE DATABASE ${config.database}`);
        }
        return res;
    } catch (e) {
        console.log(e);
    }
    return null;
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect as Dialect,
    port: 15432,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    },
    logging: true
});

export {
    sequelize,
    creatDatabase
};