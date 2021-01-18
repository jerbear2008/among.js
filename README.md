# among.js
## About
~~Please understand my broken English, I'm not very good at [English](https://www.deepl.com/translator) lmao~~
among.js is a npm package to monitor memory for [Among Us](https://store.steampowered.com/app/945360/Among_Us).

## Installation
⚠ This package isn't installed if the system hasn't the file that [memoryjs](https://github.com/Rob--/memoryjs) need.
```
npm install among.js
```
It'll work fine on **Windows 64bit** but by others system, it won't be not working.

## Example
```js
// Include this package
const AmongUs = require("among.js");
const client = new AmongUs.Client();

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
		console.log("");
		console.log(` Player: ${(_players.length - players.ghost.length - players.disconnected.length)} / ${_players.length}`);
		console.log("");
		console.log(` Crewmate: ${players.crewmate.join(", ")}`);
		console.log(` Imposter: ${players.imposter.join(", ")}`);
		console.log("");
		console.log(` Dead: ${players.ghost.join(", ")}`);
		console.log("");
		console.log(` Disconnected: ${players.disconnected.join(", ")}`);

	});
});

// when among.js has a problem
client.on("error", (error) => {
	throw new Error(error);
});

// start
client.start();
```

## Links
- [Github](https://github.com/CantRunRiver/among.js)
- [Document](https://github.com/CantRunRiver/among.js/blob/main/Document.md)
- [Among.js Server](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

## Help
If you don't understand something in the documentation, please join to our official [Among.js Server](https://www.youtube.com/watch?v=dQw4w9WgXcQ)!
