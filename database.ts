import { DToolsRequest, DToolsResponse } from './ipc';

const API_SQL = 'sql';

class Database {
    path: string;
    constructor(path: string) {
        this.path = path;
    }
    // set id(id_ : string) {
    //     this.id = id_;
    // }
    // get id() {
    //     return this.id;
    // }

    static load(path: string): Promise<Database> {
        return new Promise<Database>((resolve, reject) => {
            const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_SQL, "load", new SqlLoadRequest(path)));
            window.__DTOOLS_IPC__.callback((event: MessageEvent<DToolsResponse<SqlLoadData>>) => {
                if (event.data.success) {
                    const database = new Database(path);
                    // database.id = event.data.data.databaseId;
                    resolve(database);
                } else {
                    reject(event.data.message);
                }
            }, messageId);
        });
    }

    static get(path: string): Database {
        return new Database(path);
    }

    /**
     * 执行sql脚本
     * @param query 
     * @param bindValues 
     * @returns 
     */
    execute(query: string, bindValues?: unknown[]): Promise<QueryResult> {
        return new Promise<QueryResult>((resolve, reject) => {
            const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_SQL, "execute", new SqlExecuteRequest(this.path, query, bindValues)));
            window.__DTOOLS_IPC__.callback((event: MessageEvent<DToolsResponse<SqlExecuteData>>) => {
                if (event.data.success) {
                    resolve({ lastInsertId: event.data.data.lastInsertId, rowsAffected: event.data.data.rowsAffected });
                } else {
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
    select<T>(query: string, bindValues?: unknown[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_SQL, "select", new SqlExecuteRequest(this.path, query, bindValues)))
            window.__DTOOLS_IPC__.callback((event: MessageEvent<DToolsResponse<any>>) => {
                if (event.data.success) {
                    resolve(event.data.data);
                } else {
                    reject(event.data.message);
                }
            }, messageId)
        });

    }

    /**
     * 关闭数据库链接
     * @param db 
     */
    close(db?: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_SQL, "close", { db: db }))
            window.__DTOOLS_IPC__.callback((event: MessageEvent<DToolsResponse<boolean>>) => {
                if (event.data.success) {
                    resolve(event.data.data);
                } else {
                    reject(event.data.message);
                }
            }, messageId)
        });
    }
}

export class SqlLoadRequest {
    path: string;
    constructor(path: string) {
        this.path = path;
    }
}

export class SqlExecuteRequest {
    path: string;
    query: string;
    bindValues?: unknown[];

    constructor(path: string, query: string, bindValues?: unknown[]) {
        this.path = path;
        this.query = query;
        this.bindValues = bindValues;
    }
}
/**
 * 加载 database 的响应类
 */
export class SqlLoadData {
    databaseId: string;
    constructor(databaseId: string) {
        this.databaseId = databaseId;
    }
}

export class SqlExecuteData implements QueryResult {
    rowsAffected: number;
    lastInsertId: number;

    constructor(rowsAffected: number, lastInsertId: number) {
        this.rowsAffected = rowsAffected;
        this.lastInsertId = lastInsertId;
    }
}

interface QueryResult {
    rowsAffected: number;
    lastInsertId: number;
}


export default Database;