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
    * [inputType](#input-type)
    * [itemsToShow](#items-to-show)
    * [totalValue](#total-value)
    * [resultMapping](#result-mapping)
    * [extraColumnsNumber](#extra-columns-number)
    * [calculatedColumns](#calculated-columns)
    * [roundsNames](#rounds-names)
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
| Yes |  `1, 2, 3, 4...`<br/>`1, 2, 2, 4,...` | [`positionName`](#position-name)<br/>[`tieBreaking`](#tie-breaking)|

### Item
| **Required** | **Examples** | **Customization** |
|-------------------|-------------------|-------------------|
| Yes |  `Chelsea, Liverpool, Arsenal,...`<br/>`Nico Rosberg, Lewis Hamilton, Daniel Ricciardo...` | [`itemName`](#item-name)<br/>[`itemsToShow`](#items-to-show)<br/>[`focusedItems`](#focused-items)|

Note: items should be unique for table to work properly.

### Extra Columns
| **Required** | **Examples** | **Customization** | **Compatible input types** |
|-------------------|-------------------|-------------------|-------------------|
| No |  `London, Liverpool, London,...`<br/>`Mercedes, Mercedes, Red Bull,...` | [`extraColumnsNumber`](#extra-columns-number) | [`Points Table`](#points-table) |

Columns with static info about items.

### Calculated Columns
| **Required** | **Examples** | **Customization** |
|-------------------|-------------------|-------------------|
| No |  `rounds`, `wins`, `losses` | [`calculatedColumns`](#calculated-columns) |

Predefined calculated columns with stats.

### Total
| **Required** | **Examples** | **Customization** |
|-------------------|-------------------|-------------------|
| Yes |  `81, 71, 70,...`<br/>`.890, .817, .671,...` | [`totalName`](#total-name)<br/>[`totalValue`](#total-value) |

Table is sorted using this column. When totals are equal position is determined by [`tieBreaking`](#tie-breaking) parameter.

### Change
| **Required** | **Examples** | **Customization** |
|-------------------|-------------------|-------------------|
| Yes |  `+3, +1, 0,...`<br/>`+25, +18, +15,...` | [`showChangeDuringAnimation`](#show-change-during-animation) |

Total change since previous round, is shown in the same column as total.

## Input

### Points Table

The structure looks like this:

| Item name | [1st extra column name] | [2nd extra column name] | [...] | 1st round name | 2nd round name | ... | last round name |
|-----------|-------------------------|-------------------------|-----|----------------|----------------|-----|-----------------|
| item | [1st piece of extra info] | [2nd piece of extra info] | [...] | 1st round points | 2nd round points | ... | last round points |

The English Premier League example:

| Team | 1 | 2 | 3 | ... | 38 |
|------|---|---|---|-----|----|
| Chelsea | 1 | 0 | 3 | ... | 1 |
| Manchester City | 3 | 3 | 3 | ... | 1 |
| Arsenal | 0 | 3 | 1 | ... | 3 |
| ... | ... | .... | ... | ... | ... |

Watch the [live demo](https://targetprocess.github.io/replayTable/#premier-league).

Feel free to download this example as a [csv](https://s3-us-west-2.amazonaws.com/replay-table/csv/football/england/premier-league/2015-2016.csv).
We recommend you to also use comma as separator and UTF-8 as encoding.

### List of Matches

The structure looks like this:

| Round name | Home Item | Home Item Score | Away Item | Away Item Score |
|------------|-----------|-----------------|-----------|-----------------|
| Round | Item | Score | Item | Score |

List should be sorted by round.

The NBA example:

| Date | Home | Points | Away | Points |
|------|------|--------|------|--------|
| Tue Oct 27 2015 | Atlanta Hawks | 94 | Detroit Pistons | 106 |
| Tue Oct 27 2015 | Chicago Bulls | 97 | Cleveland Cavaliers | 95 |
| Tue Oct 27 2015 | Golden State Warriors | 111 | New Orleans Pelicans | 95 |
| ... | ... | ... | ... | ... |

Watch the [live demo](https://targetprocess.github.io/replayTable/#nba).

Feel free to download this example as a [csv](https://s3-us-west-2.amazonaws.com/replay-table/csv/basketball/nba/regular/2015-2016.csv).
We recommend you to also use comma as separator and UTF-8 as encoding.


## Presets
Default settings are suited to work with most of the team sports like football and hockey.
We've also built presets for other kinds of sports to make customization easy. Just add `data-preset="_preset_name_"` to replayTable `div` and the appropriate terms and settings will apply.

### `Wins-Losses`

This preset is built for major professional sport leagues in US and Canada.

| Parameter | Value |
|-----------|-------|
| [`inputType`](#input-type) | listOfMatches |
| [`itemName`](#item-name) | Team |
| [`totalName`](#total-name) | Win % |
| [`totalValue`](#total-value) | win % |
| [`resultMapping`](#result-mapping) | `{<br/>1: 'win',<br/>0: 'loss'<br/>}` |
| [`calculatedColumns`](#calculated-columns) | `{<br/>'rounds': 'Games',<br/>'wins': 'Wins',<br/>'losses': 'Losses'<br/>}` |

Watch the [NBA live demo](https://targetprocess.github.io/replayTable/#nba).

### `F1`


### `ЧГК`

Feel free to [suggest](#contact) more presets.

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