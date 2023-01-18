declare class Database {
    path: string;
    constructor(path: string);
    static load(path: string): Promise<Database>;
    static get(path: string): Database;
    /**
     * 执行sql脚本
     * @param query
     * @param bindValues
     * @returns
     */
    execute(query: string, bindValues?: unknown[]): Promise<QueryResult>;
    /**
     * 执行sql查询语句
     * @param query
     * @param bindValues
     */
    select<T>(query: string, bindValues?: unknown[]): Promise<T>;
    /**
     * 关闭数据库链接
     * @param db
     */
    close(db?: string): Promise<boolean>;
}
export declare class SqlLoadRequest {
    path: string;
    constructor(path: string);
}
export declare class SqlExecuteRequest {
    path: string;
    query: string;
    bindValues?: unknown[];
    constructor(path: string, query: string, bindValues?: unknown[]);
}
/**
 * 加载 database 的响应类
 */
export declare class SqlLoadData {
    databaseId: string;
    constructor(databaseId: string);
}
export declare class SqlExecuteData implements QueryResult {
    rowsAffected: number;
    lastInsertId: number;
    constructor(rowsAffected: number, lastInsertId: number);
}
interface QueryResult {
    rowsAffected: number;
    lastInsertId: number;
}
export default Database;
