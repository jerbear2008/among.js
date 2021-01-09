# Among.js
### What's this?
Among.js is a npm package to monitor memory for Among Us.

### Setup
Run the following command in a terminal to install this package.
```
npm i among.js
```

### Example
For `your code`, insert a function from among.js.
```js
const { Client } = require("./index.js"/*"among.js"*/);
let client = new Client();

client.on("ready", () => {
	console.log("Ready!")
	client.on("update", (Game) => {
		// your code
	});
});

client.on("error", (error) => {
	throw new Error(error);
});

client.start();
```
