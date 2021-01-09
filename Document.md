# Document
`Game` から得られる関数の一覧です。

## Client
### `.ServerIsPublic`
#### `.set(Boolean)` `.get()`
|Value|Status|
|:-:|:-:|
|`true`|Public|
|`false`|Private|

## Arena
### (Customize)
### `.RecommendedSettings`
#### `.set(Boolean)` `.get()`
おすすめ設定「Recommended Setting」のチェック

### `.ConfirmEjects`
#### `.set(Boolean)` `.get()`
役職結果「Confirm Ejects」のチェック

### `.MaxEmergencyMeetings`
#### `.set(Uint32)` `.get()`
最大緊急会議回数「Emergency Meetings」の値

### `.EmergencyCooldown`
#### `.set(Uint32)` `.get()`
緊急会議のクールダウン「Emergency Cooldown」の値

### `.DiscussionTime`
#### `.set(Uint32)` `.get()`
会議時間「Discussion Time」の値

### `.VotingTime`
#### `.set(Uint32)` `.get()`
投票時間「VotingTime Time」の値

### `.AnonymousVotes`
#### `.set(Boolean)` `.get()`
匿名投票「Anonymous Votes」のチェック

### `.PlayerSpeed`
#### `.set(Float32)` `.get()`
プレイヤーの移動速度「Player Speed」の値

### `.CrewmateVision`
#### `.set(Float32)` `.get()`
クルーメイトの視野「Crewmate Vision」の値

### `.ImposterVision`
#### `.set(Float32)` `.get()`
インポスターの視野「Imposter Vision」の値

### `.KillCooldown`
#### `.set(Float32)` `.get()`
キルのクールダウン「Kill Cooldown」の値

### `.KillDistance`
#### `.set(Byte)` `.get()`
キル可能範囲「Kill Distance」のレベル
|Value|Type|
|:-:|:-:|
|`0`|Short|
|`1`|Medium|
|`2`|Long|

### `.VisualTasks`
#### `.set(Boolean)` `.get()`
可視タスク「Visual Tasks」のチェック

### `.TaskBarUpdates`
#### `.set(Byte)` `.get()`
タスクバーの表示設定「Task Bar Updates」のレベル
|Value|Type|
|:-:|:-:|
|`0`|Always|
|`1`|Meetings|
|`2`|Never|

### `.CommonTasks`
#### `.set(Uint32)` `.get()`
タスクの数「Common Tasks」の値

### `.LongTasks`
#### `.set(Uint32)` `.get()`
タスクの数「Long Tasks」の値

### `.ShortTasks`
#### `.set(Uint32)` `.get()`
タスクの数「Short Tasks」の値

### Others
### `.ID`
#### `.set(Uint32)` `.get()`
アリーナの種類
|Value|Stage|
|:-:|:-:|
|`0`|The Skeld|
|`1`|Mirahq|
|`2`|Polus|
