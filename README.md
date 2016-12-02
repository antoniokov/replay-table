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
  * [preset](#preset)
  * [name](#name)
  

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
Default settings work fine for most of the team sports like football and hockey. We also built presets for other kinds of sports to make customization easy. Just add `data-preset="preset_name"` to replayTable `div` and the appropriate terms and settings will apply.

There are two options available at the moment:
* `F1`
* `ЧГК`
Feel free to suggest more presets.

You can check presets' settings in the [config file](https://github.com/TargetProcess/replayTable/blob/master/src/config.js).

## Customization
Replay Table can be easily customized via `div` `data-` attributes. You can specify your terms, adjust the animation duration, hide unnecessary elements and do other lovely things.
It's possible to use this options together with a preset: in this case they will override preset's settings.

### `name`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-name` |  `String` | `undefined` |
Name is required when you have several Replay Tables on one page.

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

### `totalName`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-total-name` |  `String` | `Points` |
'Points', 'Wins' or a term of your choice.
