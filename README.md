# Among.js
A npm package to monitor memory for Among Us.

### Install
Run the following command in a terminal to install this package.
```
npm i among.js
```

### Document
[Here](https://github.com/CantRunRiver/among.js/blob/main/Document.md)!

### Sample
```js
const { Client } = require("among.js");
let client = new Client();

// when among.js has been ready
client.on("ready", () => {
	console.log("Ready!")
	client.on("update", () => {

		// Get all players information
		console.clear();
		let imposterPlayers = new Array();
		let ghostPlayers = new Array();
		let players = client.game.players.get();
		for (let player of players) {
			if (player.isImposter) {
				imposterPlayers.push(player.color);
			}
			if (player.isGhost) {
				ghostPlayers.push(player.color);
			}
		}

		// Result
		console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
		console.log("                                                                        ");
		console.log(` Imposter: ${imposterPlayers.join(", ")}`);
		console.log(` Dead: ${ghostPlayers.join(", ")}`);
		console.log("                                                                        ");
		console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

	});
});

// when among.js has problem
client.on("error", (error) => {
	throw new Error("[Among.js], error);
});

// start
client.start();

```
