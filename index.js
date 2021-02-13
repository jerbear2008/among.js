// *** モジュールのインクルード *** //
const os = require("os")
const events = require("events");
const memoryJS = require("memoryjs");

const Language = require("./Modules/Language.js");
const Address = require("./Modules/Address.js");

// *** 変数宣言 *** //
const CodeChars = "QWXRTYLPESDFGHUJKZOCVBINMA";

// *** クライアント *** //
class Client extends events {

	// *** 初期処理 *** //	
	constructor(updateTick = Math.round(1000 / 60)) {

		// *** 初期化 *** //
		super();
		this.reset();
		this.updateTick = updateTick;

		// *** 環境 *** //
		this.isWindows = (os.platform().search("win") != -1);
		this.is64bit = (os.arch().search("x64") != -1);
		if ((!this.isWindows) || (!this.is64bit)) {
			console.warn("[Among.js]", Language.unsupportedSystem);
		}

	}

	// *** 終了 *** //
	close() {
		this.reset();
	}

	// *** 初期化 *** //
	reset() {
		this.open = false;
		this.ready = false;
		this.application = {
			process: null,
			module: null,
			game: {}
		};
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
	}

	// *** 実行 *** //
	start() {
		if (!this.open) {

			// *** チェック *** //
			this.check();

			// *** リアルタイム処理 *** //
			this.open = true;
			this.interval = setInterval(() => {
				if (this.ready) {

					// *** アドレス *** //
					this.application.address = {
						client: this.getAddressFromOffsets(Address.client.baseAddress, Address.client.offsets),
						arena: this.getAddressFromOffsets(Address.arena.baseAddress, Address.arena.offsets),
						mine: this.getAddressFromOffsets(Address.mine.baseAddress, Address.mine.offsets),
						players: this.getAddressFromOffsets(Address.players.baseAddress, Address.players.offsets),
					};

					// *** 更新 *** //
					super.emit("update");

				}
			}, this.updateTick);

		}
	}

	// *** チェック *** //
	check() {

		// *** プロセス *** //
		memoryJS.openProcess("Among Us.exe", (error, process) => {

			// *** エラーチェック *** //
			if (error.length > 0) {
				super.emit("error", Language.failedToFindProcess);
			}
			this.application.process = {
				handle: process.handle,
				id: process.th32ProcessID,
				baseAddress: process.modBaseAddr
			};

			// *** モジュール *** //
			memoryJS.findModule("GameAssembly.dll", this.application.process.id, (error, module) => {

				// *** エラーチェック *** //
				if (error.length > 0) {
					super.emit("error", Language.failedToFindModule);
				}
				this.application.module = {
					handle: module.hModule,
					id: module.th32ProcessID,
					baseAddress: module.modBaseAddr
				};

				// *** 準備完了 *** //
				if (!this.ready) {
					this.ready = true;
					super.emit("ready");
				}

			});

		});

	}

	// *** オフセットからアドレスを取得 *** //
	getAddressFromOffsets(address, offsets) {
		address = (this.application.module.baseAddress + address);
		for (let offset of offsets) {
			address = memoryJS.readMemory(this.application.process.handle, (address + offset), "Uint32");
		}
		return address;
	}

	// *** ゲームの設定 *** //
	get game() {
		return {

			// *** 招待コード *** //
			code: {

				// *** 設定 *** //
				set: (code) => {
					super.emid("error", Language.unsupportedFunction);
				},

				// *** 取得 *** //
				get: () => {
					const code = memoryJS.readMemory(this.application.process.handle, (this.application.address.client + 64), "Uint32");
					const a = (code & 0x000003FF);
					const b = ((code >> 10) & 0x000FFFFF);
					const data = [
						CodeChars[Math.floor((a / (CodeChars.length ** 0)) % CodeChars.length)],
						CodeChars[Math.floor((a / (CodeChars.length ** 0)) / CodeChars.length)],
						CodeChars[Math.floor((b / (CodeChars.length ** 0)) % CodeChars.length)],
						CodeChars[Math.floor((b / (CodeChars.length ** 1)) % CodeChars.length)],
						CodeChars[Math.floor((b / (CodeChars.length ** 2)) % CodeChars.length)],
						CodeChars[Math.floor((b / (CodeChars.length ** 3)) % CodeChars.length)]
					];
					return data.join("");
				}

			},

			// *** ホスト *** //
			isHost: () => {
				return (memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 72), "Uint32") == memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 64), "Uint32"));
			},

			// *** ゲームの情報 *** //
			information: {

				// *** 取得 *** //
				get: () => {
					this.check();
					return {
						// *** 最大プレイヤー数 *** //
						maxPlayerCount: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 8), "Uint32");
						})(),
						// *** 最大インポスター数 *** //
						maxImposterCount: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 56), "Uint32");
						})()
					}
				}

			},

			// *** ゲームの設定 *** //
			option: {

				// *** 設定 *** //
				set: (structure) => {
					this.check();
					// *** 推奨設定 *** //
					if (structure.hasOwnProperty("recommendedSettings")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 84), structure.recommendedSettings, "Boolean");
					}
					// *** 追放結果 *** //
					if (structure.hasOwnProperty("confirmEjects")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 76), structure.confirmEjects, "Boolean");
					}
					// *** 最大緊急会議回数 *** //
					if (structure.hasOwnProperty("maxEmergencyMeetings")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 48), structure.maxEmergencyMeetings, "Uint32");
					}
					// *** 緊急会議のクールダウン *** //
					if (structure.hasOwnProperty("emergencyCooldown")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 52), structure.emergencyCooldown, "Uint32");
					}
					// *** 討論時間 *** //
					if (structure.hasOwnProperty("discussionTime")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 68), structure.discussionTime, "Uint32");
					}
					// *** 投票時間 *** //
					if (structure.hasOwnProperty("votingTime")) {
						let value = structure.votingTime;
						if (value == Infinity) {
							value = 0;
						}
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 72), value, "Uint32");
					}
					// *** 匿名投票 *** //
					if (structure.hasOwnProperty("isAnonymousVotes")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 78), structure.isAnonymousVotes, "Boolean");
					}
					// *** プレイヤーの移動速度 *** //
					if (structure.hasOwnProperty("playerSpeed")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 20), structure.playerSpeed, "Float");
					}
					// *** クールメイトの視野 *** //
					if (structure.hasOwnProperty("crewmateVision")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 24), structure.crewmateVision, "Float");
					}
					// *** インポスターの視野 *** //
					if (structure.hasOwnProperty("imposterVision")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 28), structure.imposterVision, "Float");
					}
					// *** キルのクールダウン *** //
					if (structure.hasOwnProperty("killCooldown")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 32), structure.killCooldown, "Float");
					}
					// *** キル可能範囲 *** //
					if (structure.hasOwnProperty("killDistance")) {
						let value = structure.killDistance;
						switch (value) {
							case "short":
								value = 0;
								break;
							case "medium":
								value = 1;
								break;
							case "long":
								value = 2;
								break;
						}
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 64), value, "Byte")
					}
					// *** 可視タスク *** //
					if (structure.hasOwnProperty("isVisualTasks")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 77), structure.isVisualTasks, "Boolean");
					}
					// *** タスクバーの表示設定 *** //
					if (structure.hasOwnProperty("taskBarUpdates")) {
						let value = structure.taskBarUpdates;
						if (typeof value == "string") {
							switch (value.toLowerCase()) {
								case "always":
									value = 0;
									break;
								case "meetings":
									value = 1;
									break;
								case "never":
									value = 2;
									break;
							}
						}
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 80), value, "Byte")
					}
					// *** タスク *** //
					if (structure.hasOwnProperty("commonTasks")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 36), structure.commonTasks, "Uint32");
					}
					// *** タスク(長) *** //
					if (structure.hasOwnProperty("longTasks")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 40), structure.longTasks, "Uint32");
					}
					// *** タスク(短) *** //
					if (structure.hasOwnProperty("shortTasks")) {
						memoryJS.writeMemory(this.application.process.handle, (this.application.address.arena + 44), structure.shortTasks, "Uint32");
					}
				},

				// *** 取得 *** //
				get: () => {
					this.check();
					return {
						// *** 推奨設定 *** //
						recommendedSettings: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 84), "Boolean");
						})(),
						// *** 追放結果 *** //
						confirmEjects: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 76), "Boolean");
						})(),
						// *** 最大緊急会議回数 *** //
						maxEmergencyMeetings: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 48), "Uint32");
						})(),
						// *** 緊急会議のクールダウン *** //
						emergencyCooldown: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 52), "Uint32");
						})(),
						// *** 討論時間 *** //
						discussionTime: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 68), "Uint32");
						})(),
						// *** 投票時間 *** //
						votingTime: (() => {
							const value = memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 72), "Uint32");
							if (value == 0) {
								value = Infinity;
							}
							return value;
						})(),
						// *** 匿名投票 *** //
						isAnonymousVotes: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 78), "Boolean");
						})(),
						// *** プレイヤーの移動速度 *** //
						playerSpeed: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 20), "Float");
						})(),
						// *** クールメイトの視野 *** //
						crewmateVision: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 24), "Float");
						})(),
						// *** インポスターの視野 *** //
						imposterVision: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 28), "Float");
						})(),
						// *** キルのクールダウン *** //
						killCooldown: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 32), "Float");
						})(),
						// *** キル可能範囲 *** //
						killDistance: (() => {
							const value = memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 64), "Byte");
							switch (value) {
								case 0:
									return "short";
								case 1:
									return "medium";
								case 2:
									return "long";
							}
							return null;
						})(),
						// *** 可視タスク *** //
						isVisualTasks: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 77), "Boolean");
						})(),
						// *** タスクバーの表示設定 *** //
						taskBarUpdates: (() => {
							const value = memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 80), "Byte");
							switch (value) {
								case 0:
									return "always";
								case 1:
									return "meetings";
								case 2:
									return "never";
							}
							return null;
						})(),
						// *** タスク *** //
						commonTasks: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 36), "Uint32");
						})(),
						// *** タスク(長) *** //
						longTasks: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 40), "Uint32");
						})(),
						// *** タスク(短) *** //
						shortTasks: (() => {
							return memoryJS.readMemory(this.application.process.handle, (this.application.address.arena + 44), "Uint32");
						})()
					};
				}

			},

			// *** プレイヤー *** //
			players: {

				// *** 設定 *** //
				set: (id, structure) => {

					// *** 取得 *** //
					if (this.game.code.get()) {
						const playerCount = memoryJS.readMemory(this.application.process.handle, (this.application.address.players + 0x0000000C), "Uint32");
						const address = (memoryJS.readMemory(this.application.process.handle, (this.application.address.players + 0x00000008), "Uint32") + 0x00000010);
						for (let i = 0; i < playerCount; i++) {
							if (id == i) {
								this.playerStructure.encode(memoryJS.readMemory(this.application.process.handle, address, "Uint32"), structure);
							}
							address += 4;
						}
					}
					return;

				},

				// *** 取得 *** //
				get: () => {

					// *** 取得 *** //
					const playerCount = memoryJS.readMemory(this.application.process.handle, (this.application.address.players + 0x0000000C), "Uint32");
					const address = (memoryJS.readMemory(this.application.process.handle, (this.application.address.players + 0x00000008), "Uint32") + 0x00000010);
					let players = new Array();
					if (this.game.code.get()) {
						for (let i = 0; i < playerCount; i++) {
							players.push(this.playerStructure.decode(memoryJS.readMemory(this.application.process.handle, (address + (i * 4)), "Uint32")));
						}
					}
					return players;

				}

			},

			// *** 自分 *** //
			mine: {

				// *** 設定 *** //
				set: (structure) => {
					this.check();
					return this.playerStructure.encode(this.application.address.mine, structure);
				},

				// *** 取得 *** //
				get: () => {
					this.check();
					return this.playerStructure.decode(this.application.address.mine);
				}

			}

		}
	}

	// *** プレイヤー情報 *** //
	get playerStructure() {
		return {

			// *** エンコード *** //
			encode: (baseAddress, structure) => {
				// *** ID *** //
				if (structure.hasOwnProperty("id")) {
					memoryJS.writeMemory(this.application.process.handle, (baseAddress + 8), structure.id, "Uint32");
				}
				// *** 名前 *** //
				if (structure.hasOwnProperty("name")) {
					let address = memoryJS.readMemory(this.application.process.handle, (baseAddress + 12), "Uint32");
					memoryJS.writeMemory(this.application.process.handle, (address + 0x00000008), structure.name.length, "Uint32");
					memoryJS.writeBuffer(this.application.process.handle, (address + 0x0000000C), Buffer.from(structure.name, "utf16le"));
				}
				// *** 色 *** //
				if (structure.hasOwnProperty("color")) {
					let value = structure.color;
					if (typeof value == "string") {
						switch (value.toLowerCase()) {
							case "red":
								value = 0;
								break;
							case "blue":
								value = 1;
								break;
							case "green":
								value = 2;
								break;
							case "pink":
								value = 3;
								break;
							case "orange":
								value = 4;
								break;
							case "yellow":
								value = 5;
								break;
							case "black":
								value = 6;
								break;
							case "white":
								value = 7;
								break;
							case "purple":
								value = 8;
								break;
							case "brown":
								value = 9;
								break;
							case "cyan":
								value = 10;
								break;
							case "lime":
								value = 11;
								break;
						}
					}
					memoryJS.writeMemory(this.application.process.handle, (baseAddress + 16), value, "Byte");
				}
				// *** 座標 *** //
				if (structure.hasOwnProperty("position")) {
					let address = memoryJS.readMemory(this.application.process.handle, (baseAddress + 44), "Uint32");
					address = memoryJS.readMemory(this.application.process.handle, (address + 96), "Uint32");
					if (structure.position.hasOwnProperty("x")) {
						memoryJS.writeMemory(this.application.process.handle, (address + 80), structure.position.x, "Float");
					}
					if (structure.position.hasOwnProperty("y")) {
						memoryJS.writeMemory(this.application.process.handle, (address + 84), structure.position.y, "Float");
					}
				}
				// *** インポスター *** //
				if (structure.hasOwnProperty("isImposter")) {
					memoryJS.writeMemory(this.application.process.handle, (baseAddress + 40), structure.isImposter, "Boolean");
				}
				// *** ゴースト *** //
				if (structure.hasOwnProperty("isGhost")) {
					memoryJS.writeMemory(this.application.process.handle, (this.application.address.mine + 41), structure.isGhost, "Boolean");
				}
				// *** 切断済み *** //
				if (structure.hasOwnProperty("isDisconnected")) {
					memoryJS.writeMemory(this.application.process.handle, (this.application.address.mine + 32), structure.isDisconnected, "Boolean");
				}
			},

			// *** デコード *** //
			decode: (baseAddress) => {
				return {
					// *** ID *** //
					id: (() => {
						return memoryJS.readMemory(this.application.process.handle, (baseAddress + 8), "Uint32");
					})(),
					// *** 名前 *** //
					name: (() => {
						let address = memoryJS.readMemory(this.application.process.handle, (baseAddress + 12), "Uint32");
						let length = (memoryJS.readMemory(this.application.process.handle, (address + 0x00000008), "Uint32"));
						let buffer = memoryJS.readBuffer(this.application.process.handle, (address + 0x0000000C), (length * 2));
						return buffer.toString("binary").replace(/\0/g, "");
					})(),
					// *** 色 *** //
					color: (() => {
						let value = memoryJS.readMemory(this.application.process.handle, (baseAddress + 16), "Byte");
						switch (value) {
							case 0:
								return "red";
							case 1:
								return "blue";
							case 2:
								return "green";
							case 3:
								return "pink";
							case 4:
								return "orange";
							case 5:
								return "yellow";
							case 6:
								return "black";
							case 7:
								return "white";
							case 8:
								return "purple";
							case 9:
								return "brown";
							case 10:
								return "cyan";
							case 11:
								return "lime";
						}
						return null;
					})(),
					// *** 座標 *** //
					position: (() => {
						let address = memoryJS.readMemory(this.application.process.handle, (baseAddress + 44), "Uint32");
						address = memoryJS.readMemory(this.application.process.handle, (address + 96), "Uint32");
						return {
							x: memoryJS.readMemory(this.application.process.handle, (address + 80), "Float"),
							y: memoryJS.readMemory(this.application.process.handle, (address + 84), "Float"),
							spawn: {
								x: memoryJS.readMemory(this.application.process.handle, (address + 60), "Float"),
								y: memoryJS.readMemory(this.application.process.handle, (address + 64), "Float")
							}
						};
					})(),
					// *** インポスター *** //
					isImposter: (() => {
						return memoryJS.readMemory(this.application.process.handle, (baseAddress + 40), "Boolean");
					})(),
					// *** ゴースト *** //
					isGhost: (() => {
						return memoryJS.readMemory(this.application.process.handle, (baseAddress + 41), "Boolean");
					})(),
					// *** 切断済み *** //
					isDisconnected: (() => {
						return memoryJS.readMemory(this.application.process.handle, (baseAddress + 32), "Boolean");
					})()
				};
			}

		}
	}

}

// *** モジュールのエクスポート *** //
module.exports = {
	Client: Client
};
