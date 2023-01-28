/**
 * 文件是否存在
 * @param path
 * @param options
 * @returns
 */
export declare function exists(path: string, options?: FsOptions): Promise<boolean>;
export declare class FsExistsRequest {
    path: string;
    options?: FsOptions;
    constructor(path: string, options?: FsOptions);
}
/**
 * @since 1.0.0
 */
interface FsOptions {
    dir?: BaseDirectory;
}
declare enum BaseDirectory {
    Audio = 1,
    Cache = 2,
    Config = 3,
    Data = 4,
    LocalData = 5,
    Desktop = 6,
    Document = 7,
    Download = 8,
    Executable = 9,
    Font = 10,
    Home = 11,
    Picture = 12,
    Public = 13,
    Runtime = 14,
    Template = 15,
    Video = 16,
    Resource = 17,
    App = 18,
    Log = 19,
    Temp = 20,
    AppConfig = 21,
    AppData = 22,
    AppLocalData = 23,
    AppCache = 24,
    AppLog = 25
}
export {};
