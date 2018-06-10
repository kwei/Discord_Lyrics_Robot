# Discord_Lyrics_Robot

[![NPM version][shield-npm]](#)
[![Node.js version support][shield-node]](#)
[![Build status][shield-build]](#)
[![Code coverage][shield-coverage]](#)
[![Dependencies][shield-dependencies]](#)
[![MIT licensed][shield-license]](#)



[shield-coverage]: https://img.shields.io/badge/coverage-100%25-brightgreen.svg
[shield-dependencies]: https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg
[shield-node]: https://img.shields.io/badge/node.js%20support-0.10–5-brightgreen.svg
[shield-npm]: https://img.shields.io/badge/npm-v3.2.0-blue.svg
[shield-build]: https://img.shields.io/badge/build-passing-brightgreen.svg

## 簡介
```JavaScript
這是一個專屬於 Discord 的聊天機器人，利用 Discord 官方的 API 自己架設一台 BOT 並實作出搜尋歌詞的功能。
可參照 index.js 裡面的指令引用方式自行擴增指令集。command 資料夾內是指令的檔案而 function 資料夾內是會用到的函式。
若要自己創造一台機器人必須透過 Discord 官方申請然後取得 token 與 id 才能使用。
``` 
[Discord developers](https://discordapp.com/developers/docs/intro)

#### 可以藉由[此網址](https://discordapp.com/oauth2/authorize?client_id=448479589132402698&scope=bot)將機器人引入至自己的伺服器中
</br>引入伺服器</br>
![link](https://github.com/kwei/Discord_Lyrics_Robot/blob/master/linkBOT.PNG)</br>
</br>使用說明</br>
```
打上 $help 將能看到使用方法
```
</br>
![help](https://github.com/kwei/Discord_Lyrics_Robot/blob/master/help.PNG)</br>
</br>查詢歌詞</br>
![search](https://github.com/kwei/Discord_Lyrics_Robot/blob/master/lyrics.PNG)</br></br>

#### 當申請完 Discord 的機器人後填入下方的連結並於瀏覽器開啟，就能將自己的機器人加入伺服器中。 
```
https://discordapp.com/oauth2/authorize?client_id=你申請到的id&scope=bot
```

#### 測試
下載並移至專案目錄下
```
git clone https://github.com/kwei/Discord_Lyrics_Robot.git
cd Discord_Lyrics_Robot
```
安裝所需套件 (request：請求 HTML & jssoup：爬蟲用)
```
npm install request jssoup
```
手動新增 config 檔案，如下：
```JSON
{
  "token": "你申請到的tocken",
  "prefix": "$"
}
```
執行
```
npm start
```

____

## 未來目標
  * 增加功能，使得多樣化
  * 將伺服器架於 GCP

## 版本 :clock9:

### version 0.0.1 

|version|infomation|
| :---: |  :----:  |
|      0.0.1      | 最基本的查詢歌詞與一些防呆措施，但仍有可能出現問題，還請多多包涵與回應，謝謝。|

<b><a href="#">回到頂部</a></b>

License
-------

Paddington is licensed under the [MIT](#) license.  
Copyright &copy; 2018, KW

