# Shake <br>
A Behavior that shakes the object. <br>

Author: piranha305 <br>
<sub>Made using [c3ide2-framework](https://github.com/ConstructFund/c3ide2-framework) </sub><br>

## Table of Contents
- [Usage](#usage)
- [Examples Files](#examples-files)
- [Properties](#properties)
- [Actions](#actions)
- [Conditions](#conditions)
- [Expressions](#expressions)
## Usage
To build the addon, run the following commands:

```
npm i
node ./build.js
```

To run the dev server, run

```
npm i
node ./dev.js
```

The build uses the pluginConfig file to generate everything else.
The main files you may want to look at would be instance.js and scriptInterface.js
## Examples Files
- [piranha305_shake_examples](./examples/piranha305_shake_examples.c3p)
## Properties
| Property Name | Description
| --- | --- |
| [Enabled](#enabled) | Enable or disable the shake behavior. |
| [Duration](#duration) | Duration of the shake in seconds. |
| [Magnitude](#magnitude) | Magnitude of the shake. |
| [Magnitude Mode](#magnitude-mode) | Magnitude mode. |
| [Shake Axis](#shake-axis) | Shake axis. |
---
### Enabled
**Description:** Enable or disable the shake behavior. </br>
**Type:** check
### Duration
**Description:** Duration of the shake in seconds. </br>
**Type:** float
### Magnitude
**Description:** Magnitude of the shake. </br>
**Type:** float
### Magnitude Mode
**Description:** Magnitude mode. </br>
**Type:** combo
**Options:**
- Constant: Constant
- Decay: Decay
### Shake Axis
**Description:** Shake axis. </br>
**Type:** combo
**Options:**
- XY: Shake XY Axis
- X: Shake Only X Axis
- Y: Shake Only Y Axis
## Actions
| Action | Description |
| --- | --- |
| [Enable](#enable) | Enable the behavior. |
| [Start Shake](#start-shake) | Start the shake. |
| [Stop Shake](#stop-shake) | Stop the shake. |
| [Set Duration](#set-duration) | Set the duration of the shake. |
| [Set Magnitude](#set-magnitude) | Set the magnitude of the shake. |
| [Set Magnitude Mode](#set-magnitude-mode) | Set the magnitude mode of the shake. |
| [Set Shake Axis](#set-shake-axis) | Set the axis of the shake. |
---
### Enable
**Description:** Enable the behavior. </br>
#### Parameters:
| Name | Type | Description |
| --- | --- | --- |
| Enabled | boolean | Enable or disable the shake behavior. |
### Start Shake
**Description:** Start the shake. </br>
### Stop Shake
**Description:** Stop the shake. </br>
### Set Duration
**Description:** Set the duration of the shake. </br>
#### Parameters:
| Name | Type | Description |
| --- | --- | --- |
| Duration | number | Duration of the shake in seconds. |
### Set Magnitude
**Description:** Set the magnitude of the shake. </br>
#### Parameters:
| Name | Type | Description |
| --- | --- | --- |
| Magnitude | number | Magnitude of the shake. |
### Set Magnitude Mode
**Description:** Set the magnitude mode of the shake. </br>
#### Parameters:
| Name | Type | Description |
| --- | --- | --- |
| Magnitude Mode | combo | Magnitude mode. |
### Set Shake Axis
**Description:** Set the axis of the shake. </br>
#### Parameters:
| Name | Type | Description |
| --- | --- | --- |
| Shake Axis | combo | Shake axis. |
## Conditions
| Condition | Description |
| --- | --- |
| [On Shake End](#on-shake-end) | Triggered when the shake ends. |
| [Is Shaking](#is-shaking) | Check if the shake is in progress. |
---
### On Shake End
**Description:** Triggered when the shake ends. </br>
**Is Trigger:** true </br>
### Is Shaking
**Description:** Check if the shake is in progress. </br>

## Expressions
| Expression | Description |
| --- | --- |
| [Duration](#duration) | Get the duration of the shake. |
| [RemainingDuration](#remainingduration) | Get the remaining duration of the shake. |
| [OriginX](#originx) | Get the origin X of the shake. |
| [OriginY](#originy) | Get the origin Y of the shake. |
---
### Duration
**Description:** Get the duration of the shake. </br>
**Return Type:** number </br>
### RemainingDuration
**Description:** Get the remaining duration of the shake. </br>
**Return Type:** number </br>
### OriginX
**Description:** Get the origin X of the shake. </br>
**Return Type:** number </br>
### OriginY
**Description:** Get the origin Y of the shake. </br>
**Return Type:** number </br>