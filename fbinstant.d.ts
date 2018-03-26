

//Copyright (c) 2014-present, Egret Technology.
//for fbinstant.4.0.js
declare class FBInstant {
    /**
     * 获取用户信息
     */
    static player: FBPlayer;
    /**
     * 当前游戏的来源信息
     */
    static context: Context;
    /**
     * 获取用户的地域信息，例如:zh_CN en_US
     */
    static getLocale(): string;
    /**
     * 获取运行的平台信息: IOS | ANDROID | WEB | MOBILE_WEB
     */
    static getPlatform(): string;
    /**
     * SDK 的版本号，例如: '4.0'
     */
    static getSDKVersion(): string;
    /**
     * SDK 初始化结束会返回一个 Promise 方法
     * 应当在其他 API 使用前调用
     */
    static initializeAsync(): Promise<void>;
    /**
     * 通知平台资源加载的百分比
     * @param percentage 0-100
     */
    static setLoadingProgress(percentage: number): void;
    /**
     * 获取平台支持的 api 列表
     */
    static getSupportedAPIs(): string[];
    /**
     * 获取入口点数据
     */
    static getEntryPointData(): object;
    /**
     * 设置会话数据
     */
    static setSessionData(sessionData: object): void;
    /**
     * 游戏已完成加载资源，用户点击了开始游戏的按钮
     * 返回一个 Promise 方法
     */
    static startGameAsync(): Promise<void>;
    /**
     * 分享游戏
     */
    static shareAsync(payload: SharePayload): Promise<void>;
    /**
     * 通知 Facebook 在游戏中发生的更新
     */
    static updateAsync(payload: CustomUpdatePayload): Promise<void>;
    /**
     * 退出游戏
     */
    static quit(): void;
    /**
     * 使用 Facebook 的分析功能来分析应用。
     * @param eventName 要分析的事件名称
     * @param valueToSum 可选，FB分析可以计算它。
     * @param parameters 可选，它可以包含多达25个 key-value，以记录事件。key 必须是2-40个字符，只能包含'_', '-', ' '和字母数字的字符。 Value 必须少于100个字符。
     */
    static logEvent(eventName: string, valueToSum?: number, parameters?: object): void;
    /**
     * 设置一个暂停触发的方法
     */
    static onPause(func: Function): void;
}
interface FBPlayer {
    /**
     * 用户的唯一标识ID
     */
    getID(): string;
    /**
     * 获取用户在Facebook上的的名字，使用用户的语言种类显示
     */
    getName(): string;
    /**
     * 获取用户在Facebook上的头像的url，头像为正方形，最小尺寸为200x200
     */
    getPhoto(): string;
    /**
     * 取回在FB平台储存的当前用户的数据
     * @param keys 数据的 key 的数组
     */
    getDataAsync(keys: string[]): Promise<void>;
    /**
     * 把当前用户的数据储存在FB平台上。
     * @param data 包含key-value的数据对象.
     */
    setDataAsync(data: Object): Promise<void>;
    /**
     * 立刻保存数据
     */
    flushDataAsync(): Promise<void>;
    /**
     * 获取玩家好友的信息
     */
    getConnectedPlayersAsync(): Promise<ConnectedPlayer[]>;
}
/**
 * 当前游戏的来源信息
 */
interface Context {
    /**
     * 当前游戏来源的唯一id
     */
    getID(): string;
    /**
     * 游戏的来源类型：'post', 'thread', 'group', or 'solo'
     */
    getType(): string;
    /**
     * 切换游戏场景
     */
    switchAsync(): Promise<void>;
    /**
     * 选择游戏场景
     */
    chooseAsync(): Promise<void>;
    /**
     * 创建游戏场景
     */
    createAsync(): Promise<void>;
}
/**
 * 游戏好友的信息
 */
interface ConnectedPlayer {
    /**
     * 关联用户的ID
     */
    getID(): string;
    /**
     * 关联用户的名字
     */
    getName(): string;
    /**
     * 关联用户的头像 ulr 地址
     */
    getPhoto(): string;
}
/**
 * 要分享的内容
 */
interface SharePayload {
    /**
     * 表示共享的目标
     * "INVITE" | "REQUEST" | "CHALLENGE" | "SHARE"
     */
    intent: string;
    /**
     * 要分享的图像，使用 base64 编码
     */
    image: string;
    /**
     * 要分享的文字
     */
    text: string;
    /**
     * 一个附加到分享上的数据。
     * 所有从这个分享启动的游戏都可以通过  FBInstant.getEntryPointData() 方法获取到该数据。
     */
    data: string;
}
/**
 * 自定义更新内容
 */
interface CustomUpdatePayload {
    /**
     * 对于自定义更新来说，该值应该为 'CUSTOM'.
     */
    action: string;
    /**
     * 自定义更新使用的模板的ID，模板应该在 fbapp-config.json 中预定义。
     * 查看配置文件说明：https://developers.facebook.com/docs/games/instant-games/bundle-config
     */
    template: string
}