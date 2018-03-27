

//Copyright (c) 2014-present, Egret Technology.
//for fbinstant.4.0.js
declare class FBInstant {
    /**
     * 获取用户信息.
     * Contains functions and properties related to the current player.
     */
    static player: FBPlayer;
    /**
     * 当前游戏的来源信息
     * Contains functions and properties related to the current game context.
     */
    static context: Context;
    /**
     * 获取用户的语言设置，例如:zh_CN en_US
     * The current locale
     */
    static getLocale(): string;
    /**
     * 获取运行的平台信息: IOS | ANDROID | WEB | MOBILE_WEB
     * The platform on which the game is currently running
     */
    static getPlatform(): Platform;
    /**
     * SDK 的版本号，例如: '4.1'
     * The string representation of this SDK version.
     */
    static getSDKVersion(): string;
    /**
     * SDK 初始化结束会返回一个 Promise 方法，应当在其他 API 使用前调用
     * Initializes the SDK library.
     */
    static initializeAsync(): Promise<void>;
    /**
     * 通知平台资源加载的百分比
     * Report the game's initial loading progress.
     * @param percentage 0-100
     */
    static setLoadingProgress(percentage: number): void;
    /**
     * 获取平台支持的 api 列表
     * Provides a list of API functions that are supported by the client.
     */
    static getSupportedAPIs(): string[];
    /**
     * 获取入口点数据
     * Returns any data object associated with the entry point that the game was launched from.
     */
    static getEntryPointData(): Object;
    /**
     * 用户从哪个入口进入的游戏
     * Returns the entry point that the game was launched from
     */
    static getEntryPointAsync(): string;
    /**
     * 设置会话数据
     * Sets the data associated with the individual gameplay session for the current context.
     */
    static setSessionData(sessionData: Object): void;
    /**
     * 游戏已完成加载资源，用户点击了开始游戏的按钮
     * 返回一个 Promise 方法
     * This indicates that the game has finished initial loading and is ready to start. Context information will be up-to-date when the returned promise resolves.
     */
    static startGameAsync(): Promise<void>;
    /**
     * 分享游戏
     * This invokes a dialog to let the user share specified content, either as a message in Messenger or as a post on the user's timeline. 
     */
    static shareAsync(payload: SharePayload): Promise<void>;
    /**
     * 通知 Facebook 在游戏中发生的更新
     * Informs Facebook of an update that occurred in the game. 
     */
    static updateAsync(payload: CustomUpdatePayload): Promise<void>;
    /**
     * 请求客户端切换到另一个小游戏
     * Request that the client switch to a different Instant Game. 
     */
    static switchGameAsync(appID: string, data?: string): Promise<void>;
    /**
     * 退出游戏
     * Quits the game.
     */
    static quit(): void;
    /**
     * 使用 Facebook 的分析功能来分析应用。
     * Log an app event with FB Analytics
     * @param eventName 要分析的事件名称
     * @param valueToSum 可选，FB分析可以计算它。
     * @param parameters 可选，它可以包含多达25个 key-value，以记录事件。key 必须是2-40个字符，只能包含'_', '-', ' '和字母数字的字符。 Value 必须少于100个字符。
     */
    static logEvent(eventName: string, valueToSum?: number, parameters?: Object): APIError;
    /**
     * 设置一个暂停触发的方法
     * Set a callback to be fired when a pause event is triggered.
     */
    static onPause(func: Function): void;
    /**
     * 创建交互广告
     * Attempt to create an instance of interstitial ad. This instance can then be preloaded and presented.
     * @param placementID 在 Audience Network 设置的位置ID
     */
    static getInterstitialAdAsync(placementID: String): Promise<void>;
    /**
     * 创建激励视频广告
     * Attempt to create an instance of rewarded video. This instance can then be preloaded and presented.
     * @param placementID 在 Audience Network 设置的位置ID
     */
    static getRewardedVideoAsync(placementID: String): Promise<void>;
}
interface FBPlayer {
    /**
     * 玩家的唯一标识ID.
     * A unique identifier for the player.
     */
    getID(): string;
    /**
     * 获取玩家的唯一ID和一个签名，签名用来验证该 ID 来自 Facebook ，没有被篡改。
     * Fetch the player's unique identifier along with a signature that verifies that the identifier indeed comes from Facebook without being tampered with
     */
    getSignedPlayerInfoAsync(requestPayload: string): Promise<SignedPlayerInfo>;
    /**
     * 获取用户在Facebook上的的名字，使用用户的语言种类显示
     * The player's localized display name.
     */
    getName(): string;
    /**
     * 获取用户在Facebook上的头像的url，头像为正方形，最小尺寸为200x200.
     * A url to the player's public profile photo.
     */
    getPhoto(): string;
    /**
     * 取回在FB平台储存的当前用户的数据
     * Retrieve data from the designated cloud storage of the current player
     * @param keys 数据的 key 的数组
     */
    getDataAsync(keys: string[]): Promise<Object>;
    /**
     * 把当前用户的数据储存在FB平台上。
     * Set data to be saved to the designated cloud storage of the current player. 
     * @param data 包含key-value的数据对象.
     */
    setDataAsync(data: Object): Promise<void>;
    /**
     * 立刻保存数据
     * Immediately flushes any changes to the player data to the designated cloud storage. 
     */
    flushDataAsync(): Promise<void>;
    /**
     * 获取当前玩家数据
     * Retrieve stats from the designated cloud storage of the current player.
     * @param keys 数据的 key 的数组
     */
    getStatsAsync(keys: string[]): Promise<void>;
    /**
     * 把当前用户的数据储存在FB平台上。
     * Set stats to be saved to the designated cloud storage of the current player.
     * @param data 包含key-value的数据对象.
     */
    setStatsAsync(stats: Object): Promise<void>;
    /**
     * 把当前玩家数据增量更新储存到FB平台上。
     * Increment stats saved in the designated cloud storage of the current player.
     * @param data 包含key-value的数据对象.
     */
    incrementStatsAsync(increments: Object): Promise<void>;
    /**
     * 获取玩家好友的信息
     * Fetches an array of ConnectedPlayer objects containing information about players that are connected to the current player.
     */
    getConnectedPlayersAsync(): Promise<ConnectedPlayer[]>;
}
/**
 * 当前游戏的来源信息
 */
interface Context {
    /**
     * 当前游戏来源的唯一id
     * A unique identifier for the current game context. 
     */
    getID(): string;
    /**
     * 游戏的来源类型："POST" | "THREAD" | "GROUP" | "SOLO"
     * The type of the current game context.
     */
    getType(): string;
    /**
     * 用这个方法来判断当前游戏环境中游戏参与者的数量是否介于指定的最小值和最大值之间。
     * This function determines whether the number of participants in the current game context is between a given minimum and maximum, inclusive.
     */
    isSizeBetween(minSize: number, maxSize: number): { answer: boolean, minSize: number, maxSize: number };
    /**
     * 切换游戏场景
     * Request a switch into a specific context. 
     */
    switchAsync(id: string): Promise<void>;
    /**
     * 选择游戏场景
     * Opens a context selection dialog for the player. 
     */
    chooseAsync(options?: { filter?: ContextFilter[], maxSize?: number, minSize?: number }): Promise<void>;
    /**
     * 创建游戏场景
     * Attempts to create or switch into a context between a specified player and the current player. 
     */
    createAsync(playerID: string): Promise<void>;
    /**
     * 获取当前环境中正在玩游戏的玩家列表，它可能包含当前玩家的信息。
     * Gets an array of #contextplayer objects containing information about active players
     */
    getPlayersAsync(): Promise<ContextPlayer[]>;
}
/**
 * 游戏好友的信息
 */
interface ConnectedPlayer {
    /**
     * 关联用户的ID
     * Get the id of the connected player.
     */
    getID(): string;
    /**
     * 关联用户的名字
     * Get the player's full name.
     */
    getName(): string;
    /**
     * Get the player's public profile photo.
     * 关联用户的头像 ulr 地址
     */
    getPhoto(): string;
}
/**
 * 游戏环境中的玩家
 */
interface ContextPlayer {
    /**
     * 关联用户的ID
     * Get the id of the context player.
     */
    getID(): string;
    /**
     * 关联用户的名字
     * Get the player's localized display name.
     */
    getName(): string;
    /**
     * 关联用户的头像 ulr 地址
     * Get the player's public profile photo.
     */
    getPhoto(): string;
}
/**
 * 玩家的签名信息
 */
interface SignedPlayerInfo {
    /**
     * 玩家的id
     * Get the id of the player.
     */
    getPlayerID(): string;
    /**
     * 验证这个对象的签名确实来自Facebook。该字符串是base64url编码的，使用 HMAC 对您应用的 Sccret 进行签名，基于 OAuth 2.0 规范，
     * A signature to verify this object indeed comes from Facebook.
     */
    getSignature(): string;

}
/**
 * 要分享的内容
 */
interface SharePayload {
    /**
     * 表示共享的目标
     * Indicates the intent of the share.
     * "INVITE" | "REQUEST" | "CHALLENGE" | "SHARE"
     */
    intent: string;
    /**
     * 要分享的图像，使用 base64 编码
     * A base64 encoded image to be shared.
     */
    image: string;
    /**
     * 要分享的文字
     * A text message to be shared.
     */
    text: string;
    /**
     * 一个附加到分享上的数据。
     * 所有从这个分享启动的游戏都可以通过  FBInstant.getEntryPointData() 方法获取到该数据。
     *  A blob of data to attach to the share.
     */
    data?: Object;
}
/**
 * 自定义更新内容
 */
interface CustomUpdatePayload {
    /**
     * 对于自定义更新来说，该值应该为 'CUSTOM'.
     * For custom updates, this should be 'CUSTOM'.
     */
    action: string;
    /**
     * 自定义更新使用的模板的ID，模板应该在 fbapp-config.json 中预定义。
     * 查看配置文件说明：https://developers.facebook.com/docs/games/instant-games/bundle-config
     * ID of the template this custom update is using. 
     */
    template: string;
    /**
     * 可选，按钮文字。默认情况下，我们本地化的 'Play' 作为按钮文字。
     * Optional call-to-action button text. 
     */
    cta?: string;
    /**
     * base64 编码的图像信息
     * Data URL of a base64 encoded image.
     */
    image: string;
    /**
     * 文本信息
     * A text message, or an object with the default text as the value of 'default' and another object mapping locale keys to translations as the value of 'localizations'.
     */
    text: string;
    /**
     * 附加到更新上的数据。当游戏通过分享启动时，可以通过 FBInstant.getEntryPointData() 方法获取。
     * 该数据必须少于1000个字符。
     * A blob of data to attach to the update. 
     */
    data?: Object;
    /**
     * 指定更新的方式。
     *  Specifies how the update should be delivered. 
     * 'IMMEDIATE' - 默认值，立即发布更新
     * 'LAST' - 当游戏结束时，发布更新
     * 'IMMEDIATE_CLEAR' - 立即发布更新，并清除任何其他正在等待的更新
     */
    strategy?: string;
    /**
     * 指定自定义更新的通知设置。可以是“NO_PUSH”或“PUSH”，默认为“NO_PUSH”。
     * Specifies notification setting for the custom update.
     */
    notification?: string;
}
interface APIError {
    /**
     * 错误码
     * The relevant error code
     */
    code: string;
    /**
     * 错误信息
     * A message describing the error
     */
    message: string;
}
type ContextFilter = "NEW_CONTEXT_ONLY" | "INCLUDE_EXISTING_CHALLENGES";
type Platform = "IOS" | "ANDROID" | "WEB" | "MOBILE_WEB";

