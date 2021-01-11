# Document

## `client.game`
### `.option`
#### `.set(structure)`
|key|Alias|Type|
|:--|:--|:-:|
|`.recommendedSettings`|Recommended Settings|`Boolean`|
|`.confirmEjects`|Confirm Ejects|`Boolean`|
|`.maxEmergencyMeetings`|Emergency Meetings|`Uint32`|
|`.emergencyCooldown`|Emergency Cooldown|`Uint32`|
|`.discussionTime`|Discussion Time|`Uint32`|
|`.votingTime`|Voting Time|`Uint32`|
|`.isAnonymousVotes`|Anonymous Votes|`Boolean`|
|`.playerSpeed`|Player Speed|`Float32`|
|`.crewmateVision`|Crewmate Vision|`Float32`|
|`.imposterVision`|Imposter Vision|`Float32`|
|`.killCooldown`|Kill Cooldown|`Uint32`|
|`.killDistance`|Kill Distance|`String`, `Byte`|
|`.isVisualTasks`|Visual Tasks|`Boolean`|
|`.taskBarUpdates`|TaskBar Updates|`String`, `Byte`|
|`.commonTasks`|Common Tasks|`Uint32`|
|`.longTasks`|Long Tasks|`Uint32`|
|`.shortTasks`|Short Tasks|`Uint32`|
#### `.get()`
```js
{
 	"recommendedSettings": Boolean,
	"confirmEjects": Boolean,
	"maxEmergencyMeetings": Uint32,
	"emergencyCooldown": Uint32,
	"discussionTime": Uint32,
	"votingTime": Uint32,
	"isAnonymousVotes": Boolean,
	"playerSpeed": Float32,
	"crewmateVision": Float32,
	"imposterVision": Float32,
	"killCooldown": Uint32,
	"killDistance": String,
	"isVisualTasks": Boolean,
	"taskBarUpdates": String,
	"commonTasks": Uint32,
	"longTasks": Uint32,
	"shortTasks": Uint32
}
```

### players


#### `.get()`
```js
[
	{
		"id": Uint32,
		"name": String,
		"color": String,
		"position": {
			"x": Float32,
			"y": Float32
		},
		"isImposter": Boolean,
		"isGhost": Boolean
	},
	{
		...
	},
]
```
