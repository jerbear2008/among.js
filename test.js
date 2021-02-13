// *** モジュールのインクルード *** //
const AmongUs = require("./index.js");
const client = new AmongUs.Client();

// *** クライアントの作成 *** //
client.on("ready", () => {

	// *** 更新時 *** //
	console.log("準備完了！！！");
	client.on("update", () => {
		console.log(client.game.option.get());
		client.close();
	});

});

// *** エラー発生時 *** //
client.on("error", (error) => {
	throw new Error(error);
});

// *** スタート *** //
client.start();
