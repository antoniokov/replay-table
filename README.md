Replay Table
=========

This is a script that transforms a csv file with season results into interactive standings:

This is a place for gif

Watch the [live demo](https://targetprocess.github.io/replayTable/) for football, Formula One and other sports.

## Table of Contents
* [Quickstart](#quickstart)
* [Input File](#input-file)
* [Presets](#presets)
* [Customization](#customization)
  * [seasonName](#seasonname)
  * [roundName](#roundname)
  * [positionName](#positionname)
  * [itemName](#itemname)
  * [roundsNames](#roundsnames)
  * [startRoundName](#startroundname)
  * [totalName](#totalname)
  * [focusedItems](#focuseditems)
  * [showChangeDuringAnimation](#showchangeduringanimation)
  * [showProgressBar](#showprogressbar)
  * [startFromRound](#startfromround)
  * [animationDuration](#animationduration)
  * [tiesResolution](#tiesresolution)
  * [tableName](#tablename)
  

## Quickstart
Put a `div` with `replayTable` class on your page and supply a link to your csv file using `data-csv` attribute.
```
<div class="replayTable"
     data-csv="/csv/football/england/premier-league/2015-2016.csv">
</div>
```
Include the script near the end of the `body` tag:
```
<body>
    ...
    <script type="text/javascript" src="/replayTable/static/js/main.38b8fdef.js"></script>
</body>
```
Finally, include the stylesheet inside the `head` tag:
```
<head>
    ...
    <link rel="stylesheet" type="text/css" link href="/replayTable/static/css/main.bd0bd88b.css">
</head>
```

## Input file
There's only one csv table format available for now: a column with item names followed by results of each round. Here's an example with the 2015–16 Premier League season results:
![csv-visual](https://s3-us-west-2.amazonaws.com/replay-table/images/github/csv-visual.PNG)
Feel free to download this [csv](https://s3-us-west-2.amazonaws.com/replay-table/csv/football/england/premier-league/2015-2016.csv).

## Presets
Default settings are suited for most of the team sports like football and hockey.
We also built presets for other kinds of sports to make customization easy. Just add `data-preset="preset_name"` to replayTable `div` and the appropriate terms and settings will apply.

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

### `tiesResolution`
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
