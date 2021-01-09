# Among.js
### なにこれ？
Among.js はゲーム「Among Us」のメモリを監視するAPIを追加するnpmパッケージです。

### セットアップ
ターミナルで以下のコマンドを実行し、パッケージをインストールします。
```
npm i among.js
```

### 例
`こ↑こ↓` に among.js の関数を入力します。
```js
const { Client } = require("./index.js"/*"among.js"*/);
let client = new Client();

client.on("ready", () => {
	console.log("Ready!")
	client.on("update", (Game) => {
		// こ↑こ↓
	});
});

client.on("error", (error) => {
	throw new Error(error);
});

client.start();
```
