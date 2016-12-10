Replay Table
=========

Transforms a csv file with season results into interactive standings:

![demo](https://s3-us-west-2.amazonaws.com/replay-table/images/github/demo.gif)

## Live Demos

* [Premier League](https://targetprocess.github.io/replayTable/#premier-league)
* [NBA](https://targetprocess.github.io/replayTable/#nba)
* [Formula One](https://targetprocess.github.io/replayTable/#f1)

## Quickstart
Put a `div` with `replayTable` class on your page and supply a link to your csv file using `data-csv` attribute.
```
<div class="replayTable"
     data-csv="/path/to/file.csv">
</div>
```
Include the script near the end of the `body` tag:
```
<body>
    ...
    <script type="text/javascript" src="//cdn.jsdelivr.net/replay-table/latest/replay-table.min.js"></script>
</body>
```
Finally, include the stylesheet inside the `head` tag:
```
<head>
    ...
    <link rel="stylesheet" type="text/css" link href="cdn.jsdelivr.net/replay-table/latest/replay-table.css">
</head>
```

There are ready to embed Replay Tables in our [gallery](https://targetprocess.github.io/replayTable/#examples-section) or you can make your own.


## Customization
* [Table Structure](#table-structure)
  * [Position](#position)
  * [Item](#item)
  * [Extra Columns](#extra-columns)
  * [Calculated Columns](#calculated-columns)
  * [Total](#total)
  * [Change](#change)
* [Input](#input)
  * [Points Table](#points-table)
  * [List of Matches](#list-of-matches)
* [Presets](#presets)
  * [Wins-Losses](#wins-losses)
  * [F1](#f1)
  * [ЧГК](#chgk)
* [Parameters](#parameters)
  * [Terms](#terms)
    * [seasonName](#season-name)
    * [roundName](#round-name)
    * [positionName](#position-name)
    * [itemName](#item-name)
    * [startRoundName](#start-round-name)
    * [totalName](#total-name)
  * [Data](#data)
    * [extraColumnsNumber](#extra-columns-number)
    * [roundsNames](#rounds-names)
    * [itemsToShow](#items-to-show)
  * [Playback](#playback)
    * [startFromRound](#start-from-round)
    * [animationDuration](#animation-duration)
    * [showChangeDuringAnimation](#show-change-during-animation)
  * [Appearance](#appereance)
    * [showProgressBar](#show-progress-bar)
    * [showSeasonRoundSwitch](#show-season-round-switch)
  * [Other](#other)
    * [tieBreaking](#tie-breaking)
    * [focusedItems](#focused-items)
    * [tableName](#table-name)

## Table Structure

### Position
| **Required** | **Examples** | **Customization** |
|-------------------|-------------------|-------------------|
| Yes |  `1, 2, 3, 4...`, `1, 2, 2, 4,...` | [`positionName`](#position-name)<br/>[`tieBreaking`](#tie-breaking)|

### Item
| **Required** | **Examples** | **Customization** |
|-------------------|-------------------|-------------------|
| Yes |  `Chelsea, Liverpool, Arsenal,...`, `Nico Rosberg, Lewis Hamilton, Daniel Ricciardo...` | [`itemName`](#item-name)<br/>[`itemsToShow`](#items-to-show)<br/>[`focusedItems`](#focused-items)|


## Input file
There's only one csv table format available for now: a column with item names followed by results of each round. Here's an example with the 2015–16 Premier League season results:
![csv-visual](https://s3-us-west-2.amazonaws.com/replay-table/images/github/csv-visual.PNG)

We recommend to use comma as separator and UTF-8 as encoding.
Feel free to download this [csv](https://s3-us-west-2.amazonaws.com/replay-table/csv/football/england/premier-league/2015-2016.csv).

## Presets
Default settings are suited for most of the team sports like football and hockey.
We've also built presets for other kinds of sports to make customization easy. Just add `data-preset="preset_name"` to replayTable `div` and the appropriate terms and settings will apply.

There are two options available at the moment:
* `F1`
* `ЧГК`

Feel free to suggest more presets.

You can check presets' settings in the [config file](https://github.com/TargetProcess/replayTable/blob/master/src/config.js).

## Customization
Replay Table can be easily customized via `div` `data-` attributes. You can specify your terms, adjust the animation duration, hide unnecessary elements and do other lovely things.

It is possible to use this options together with a preset: in this case they will override preset's settings.

### `seasonName`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-season-name` |  `String` | `Season` |
'Tournament', 'Saison' or a term of your choice.

### `roundName`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-round-name` |  `String` | `Game` |
'Game', 'Match', 'Round', 'Leg' or a term of your choice.

### `positionName`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-position-name` |  `String` | `#` |
'Position', 'Rank' or a term of your choice.

### `itemName`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-item-name` |  `String` or `undefined` | `undefined` |
'Team', 'Player', 'Driver' or a term of your choice. When undefined tries to get the name from data source.

### `roundsNames`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-rounds-names` |  `Array of Strings` or `undefined` | `undefined` |
['Australia', 'Bahrain',...] for F1, for example. When set to undefined gets names from data source if possible; if not uses rounds' numbers.

### `startRoundName`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-start-round-name` |  `String` or `undefined` | `0` |
If defined inserts a round before all other rounds with all items having total equal to zero.

### `totalName`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-total-name` |  `String` | `Points` |
'Points', 'Wins' or a term of your choice.

### `extraColumnsNumber`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-extra-columns-number` |  `Number` | `0` |
Number of columns with extra data about items like city they represent or team they are part of. The columns should go after the items column and before the results columns:

![extra columns](https://s3-us-west-2.amazonaws.com/replay-table/images/github/extra-colums.png)

### `focusedItems`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-focused-items` |  `Array of Strings` | `[]` |
Focus on particular items (teams, players or drivers). ['Liverpool', 'Everton'], for example.

### `showChangeDuringAnimation`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-show-change-during-animation` |  `Boolean` | `false` |
Show change in total (+3, +1, ...) during the animation. Might be useful when color coding is hard as in F1 (+25, +18,...).

### `showProgressBar`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-show-progress-bar` |  `Boolean` | `true` |
Show or hide the progress bar.

### `startFromRound`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-start-from-round` |  `Number` | `undefined` |
Number of round to start from. When set to undefined the last unempty round is used.

### `animationDuration`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-animation-duration` |  `Number` | `1800` |
Animation duration in ms.

### `tieBreaking`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-ties-resolution` |  `no ties`, `highest` or `range` | `no ties` |
Determines position when totals are equal. Can be 'no ties' (1, 2, 3, 4,...), 'highest' (1, 2, 2, 4,...) and 'range' (1, 2-3, 2-3, 4,...).

There is a chance we'll transfrom this option into a function to cope with complex cases when position depends on number of wins and other parameters.

### `tableName`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-table-name` |  `String` | `undefined` |
Name is required when you have several Replay Tables on one page.


## Contact
Feel free to suggest features and presets, offer tables for our public gallery and ask questions via [anton.iokov@targetprocess.com](mailto:anton.iokov@targetprocess.com) or [@antoniokov](https://twitter.com/antoniokov).