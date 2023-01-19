import { DToolsRequest } from './ipc';
const API_SQL = 'sql';
class Database {
    path;
    constructor(path) {
        this.path = path;
    }
    // set id(id_ : string) {
    //     this.id = id_;
    // }
    // get id() {
    //     return this.id;
    // }
    static load(path) {
        return new Promise((resolve, reject) => {
            const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_SQL, "load", new SqlLoadRequest(path)));
            window.__DTOOLS_IPC__.callback((event) => {
                if (event.data.success) {
                    const database = new Database(path);
                    // database.id = event.data.data.databaseId;
                    resolve(database);
                }
                else {
                    reject(event.data.message);
                }
            }, messageId);
        });
    }
    static get(path) {
        return new Database(path);
    }
    /**
     * 执行sql脚本
     * @param query
     * @param bindValues
     * @returns
     */
    execute(query, bindValues) {
        return new Promise((resolve, reject) => {
            const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_SQL, "execute", new SqlExecuteRequest(this.path, query, bindValues)));
            window.__DTOOLS_IPC__.callback((event) => {
                if (event.data.success) {
                    resolve({ lastInsertId: event.data.data.lastInsertId, rowsAffected: event.data.data.rowsAffected });
                }
                else {
                    reject(event.data.message);
                }
            }, messageId);
        });
    }
    /**
     * 执行sql查询语句
     * @param query
     * @param bindValues
     */
    select(query, bindValues) {
        return new Promise((resolve, reject) => {
            const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_SQL, "select", new SqlExecuteRequest(this.path, query, bindValues)));
            window.__DTOOLS_IPC__.callback((event) => {
                if (event.data.success) {
                    resolve(event.data.data);
                }
                else {
                    reject(event.data.message);
                }
            }, messageId);
        });
    }
    /**
     * 关闭数据库链接
     * @param db
     */
    close(db) {
        return new Promise((resolve, reject) => {
            const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_SQL, "close", { db: db }));
            window.__DTOOLS_IPC__.callback((event) => {
                if (event.data.success) {
                    resolve(event.data.data);
                }
                else {
                    reject(event.data.message);
                }
            }, messageId);
        });
    }
}
export class SqlLoadRequest {
    path;
    constructor(path) {
        this.path = path;
    }
}
export class SqlExecuteRequest {
    path;
    query;
    bindValues;
    constructor(path, query, bindValues) {
        this.path = path;
        this.query = query;
        this.bindValues = bindValues;
    }
}
/**
 * 加载 database 的响应类
 */
export class SqlLoadData {
    databaseId;
    constructor(databaseId) {
        this.databaseId = databaseId;
    }
}
export class SqlExecuteData {
    rowsAffected;
    lastInsertId;
    constructor(rowsAffected, lastInsertId) {
        this.rowsAffected = rowsAffected;
        this.lastInsertId = lastInsertId;
    }
}
export default Database;
