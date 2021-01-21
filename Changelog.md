# Changelog
### v1.0.2
2020/XX/XX
- Fixed that `client.game.option.set` has an error when it was called.
- Added events `on.gameStart`，`on.gameFinish`，`on.playerMoved`，`on.playerVented`，`on.playerDead` and `on.playerDisconnected`.
- Changed the name of an event `on.update` → `on.gameUpdate`.

### v1.0.1
2020/01/20
- Fixed that `killDistance` and `taskBarUpdates` in the result of `client.game.option.get` were always `null`.
- Fixed that `on.update` event keeps firing even when `client.close` was called.

## v1.0.0
2021/01/17
- Released this package.
