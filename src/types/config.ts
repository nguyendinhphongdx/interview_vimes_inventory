export type environment = 'development' | 'test' | 'production';

export interface IDBConfiguration {
    username: string,
    password: string,
    database: string,
    host: string,
    dialect: string,
    port: number,
    "operatorsAliases": boolean,
    "pool": {
        "max": number,
        "min": number,
        "acquire": number,
        "idle": number
    }
}