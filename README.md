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

		// Reset
		console.clear();
		let players = {
			crewmate: new Array(),
			imposter: new Array(),
			ghost: new Array(),
			disconnected: new Array()
		};

		// Get all players information
		const _players = client.game.players.get();
		for (let player of _players) {
			if (!player.isDisconnected) {
				if (!player.isGhost) {
					if (!player.isImposter) {
						players.crewmate.push(player.color);
					} else {
						players.imposter.push(player.color);
					}
				} else {
					players.ghost.push(player.color);
				}
			} else {
				players.disconnected.push(player.color);
			}
		}

		// Result
		console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
		console.log("");
		console.log(` Player: ${(_players.length - ghostPlayers.length - disconnectedPlayers.length)} / ${players.length}`);
		console.log(` Crewmate: ${crewmatePlayers.join(", ")}`);
		console.log(` Imposter: ${imposterPlayers.join(", ")}`);
		console.log(` Dead: ${ghostPlayers.join(", ")}`);
		console.log("");
		console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

	});
});

// when among.js has a problem
client.on("error", (error) => {
	throw new Error(error);
});

// start
client.start();

```
