# Changelog
### v1.0.2
2020/XX/XX
- Added function `client.game.statistics`.
- Added events `on.gameJoin`, `on.gameLeave`, `on.gameStart`，`on.gameFinish`，`on.playerMove`，`on.playerDeath`，`on.playerDisconnect` and `on.playerVent`.
- Changed the name of an event `on.update` → `on.gameUpdate`.
- Fixed that `client.game.option.set` has an error when it was called.
- Fixed that `isGhost` of `client.game.players.get` was always `isGhost` of `client.game.mine.get`.

### v1.0.1
2020/01/20
- Fixed that `killDistance` and `taskBarUpdates` in the result of `client.game.option.get` were always `null`.
- Fixed that `on.update` event keeps firing even when `client.close` was called.

## v1.0.0
2021/01/17
- Released this package.
