# among.js
![npm](https://img.shields.io/npm/v/among.js) ![GitHub last commit](https://img.shields.io/github/last-commit/CantRunRiver/among.js) ![GitHub contributors](https://img.shields.io/github/contributors/CantRunRiver/among.js) ![Lines of code](https://img.shields.io/tokei/lines/github/CantRunRiver/among.js) ![supports Steam](https://img.shields.io/badge/supports-Steam-yellow)
## About
among.js is a npm package to monitor memory for [Among Us](https://store.steampowered.com/app/945360/Among_Us).

## Installation
⚠ This package will not install if the system does not have [memoryjs](https://github.com/Rob--/memoryjs) and its dependencies.
```
npm install among.js
```
It'll work fine on **Windows 64bit** but on any other system it won't work.

## Example
```javascript
// Include this package
const AmongUs = require("among.js");
const client = new AmongUs.Client();

// when among.js has been ready
client.on("ready", () => {
	console.log("Ready!")
	client.on("update", () => {

		// Reset
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
    console.clear();
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
- [Documentation](https://github.com/CantRunRiver/among.js/wiki)
- [NPM](https://www.npmjs.com/package/among.js)
