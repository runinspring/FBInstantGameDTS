#API 说明 v1.1

##FBInstant

Instant Games SDK 的顶级命名空间.

##FBInstant.locale

获取用户的地域信息。 例如 **zh_CN**、 **en_US**
全部的地域信息数据，请看此链接 https://www.facebook.com/translations/FacebookLocales.xml 。
注意，只有FBInstant.initializeAsync()获得回调以后，才能调用这个api。

##FBInstant.platform
当前游戏运行在哪个平台，返回值为：'iOS', 'android' 和 'web'。
注意，只有FBInstant.initializeAsync()获得回调以后，才能调用这个api。
##FBInstant.sdkVersion
获取SDK的版本号，例如 "1.1"。
##FBInstant.initializeAsync
获取SDK初始化结束的回调方法，应当在其他API使用前调用。
代码示例：
```
FBInstant.initializeAsync().then(function() {
  console.log(FBInstant.locale);
  console.log(FBInstant.platform);
  console.log(FBInstant.player.id);
});
```
当sdk 初始化结束会返回一个 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

##FBInstant.setLoadingProgress
告诉平台游戏初始化资源加载的进度
代码示例：

```
FBInstant.setLoadingProgress(50); // 50%的资源被加载了
```
**参数**
•	percentage **number**  0到100之间的数字

##FBInstant.startGameAsync
这表明游戏已完成加载资源，用户准备好开始玩了。
代码示例：
```
FBInstant.startGameAsync().then(function() {
  //在这我们可以确定用户点击了开始游戏的按钮
  myGame.start();
});
```
当游戏应当开始玩的时候会返回一个 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
收到这个信号说明用户已经明确的准备好玩游戏了，在此之后，游戏里不应该再有另一个“点击开始”的步骤。

##FBInstant.player
获取用户信息，返回类型：Object

##FBInstant.player.id
玩家的唯一标识ID。一个Facebook用户的id是不会改变的。目前暂时只在同一设备上保持一致，未来最终会在不同的设备之间保持一致。同一个Facebook的用户，在不同的游戏里会有不用的id。

##FBInstant.player.getDataAsync
取回当前用户在平台储存的数据
**参数**
•	keys  **Array &lt;String>**  要获取的数据的key值
返回值 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) &lt;Object> 如果发送的Key存在，则通过Promise 返回储存的数据对象.

##FBInstant.player.setDataAsync
把当前用户的数据储存在平台上。
**参数**
•	data  **Object**  包含key-value的数据对象.
返回值 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 数据储存成功会返回一个promise

##FBInstant.context
当前游戏的来源信息

##FBInstant.context.id
当前游戏来源的唯一id。例如你的信息流中有很多好友都发了这个游戏，通过这个id来知道你玩的是哪一个。注意，必须在FBInstant.startGameAsync的回调后才能得到这个id。在FBInstant.endGameAsync的回调后可能会更新这个id。如果平台不支持，或者是在独立页面玩的游戏，这个id值为null


##FBInstant.setScore

向平台上传分数，最终的分数会在游戏结束后显示

代码示例：
```
FBInstant.setScore(42);
```
**参数**
•	score **number**  玩家在游戏里的分数

##FBInstant.endGameAsync
显示平台统一的游戏结束画面。

代码示例：
```
FBInstant.endGameAsync().then(function() {
  // 在这里我们可以确定，玩家点击了重玩的按钮
  myGame.restartWithoutTutorial();
});
```
当游戏重新开始的时候，返回一个 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)。


##FBInstant.takeScreenshot
进行截屏，用户以后可以分享给好友。
代码示例：
```
myGame.displayFinalScore();
FBInstant.takeScreenshot();
```
##FBInstant.sendScreenshot
发送分享给好友的截屏画面。

代码示例：
```
FBInstant.sendScreenshot(base64picture);
```
**参数**

•	base64picture **string** 把截图进行 base64 编码后的字符串
##FBInstant.abort

遇到错误中止游戏。只有当游戏进入不可恢复的状态时才被调用。

代码示例：
```
FBInstant.abort(e);
```
**参数**

•	e [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) 具体的错误信息。