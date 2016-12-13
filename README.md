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
* [Input](#input)
  * [Points Table](#points-table)
  * [List of Matches](#list-of-matches)
* [Table Structure](#table-structure)
  * [Position](#position)
  * [Item](#item)
  * [Extra Columns](#extra-columns)
  * [Calculated Columns](#calculated-columns)
  * [Total](#total)
  * [Change](#change)
* [Presets](#presets)
  * [Wins-Losses](#wins-losses)
  * [F1](#f1)
  * [ЧГК](#чгк)
* [Parameters](#parameters)
  * [Terms](#terms)
  * [Data](#data)
  * [Playback](#playback)
  * [Appearance](#appereance)
  * [Other](#other)

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


## Table Structure

### Position
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| Yes |  `1, 2, 3, 4...`<br/>`1, 2, 2, 4,...` | [`positionName`](#position-name)<br/>[`tieBreaking`](#tie-breaking)|

### Item
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| Yes |  `Chelsea, Liverpool, Arsenal,...`<br/>`Nico Rosberg, Lewis Hamilton, Daniel Ricciardo...` | [`itemName`](#item-name)<br/>[`itemsToShow`](#items-to-show)<br/>[`focusedItems`](#focused-items)|

Note: items should be unique for table to work properly.

### Extra Columns
| Required | Examples | Customization | Compatible input types |
|-------------------|-------------------|-------------------|-------------------|
| No |  `London, Liverpool, London,...`<br/>`Mercedes, Mercedes, Red Bull,...` | [`extraColumnsNumber`](#extra-columns-number) | [`pointsTable`](#points-table) |

Columns with static info about items.

### Calculated Columns
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| No |  `rounds`, `wins`, `losses` | [`calculatedColumns`](#calculated-columns) |

Predefined calculated columns with stats.

### Total
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| Yes |  `81, 71, 70,...`<br/>`.890, .817, .671,...` | [`totalName`](#total-name)<br/>[`totalValue`](#total-value)<br/>[`resultMapping`](#result-mapping) |

Table is sorted using this column. When totals are equal position is determined by [`tieBreaking`](#tie-breaking) parameter.

### Change
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| Yes |  `+3, +1, 0,...`<br/>`+25, +18, +15,...` | [`showChangeDuringAnimation`](#show-change-during-animation) |

Total change since previous round, is shown in the same column as total.


## Presets
Default settings are suited to work with most of the team sports like football and hockey.
We've also built presets for other kinds of sports to make customization easy.

Just add `data-preset="_preset_name_"` to replayTable `div` and the appropriate terms and settings will apply.

### `Wins-Losses`

This preset is built for major professional sport leagues in US and Canada.

| Parameter | Value |
|-----------|-------|
| [`inputType`](#input-type) | `listOfMatches` |
| [`itemName`](#item-name) | `Team` |
| [`totalName`](#total-name) | `Win %` |
| [`totalValue`](#total-value) | `win %` |
| [`resultMapping`](#result-mapping) | `{ 1: 'win', 0: 'loss' }` |
| [`calculatedColumns`](#calculated-columns) | `{ 'rounds': 'Games', 'wins': 'Wins', 'losses': 'Losses' }` |

Watch the [NBA demo](https://targetprocess.github.io/replayTable/#nba).

### `F1`

| Parameter | Value |
|-----------|-------|
| [`roundName`](#round-name) | `Race` |
| [`itemName`](#item-name) | `Driver` |
| [`startRoundName`](#start-round-name) | `Start →` |

Watch the [2015-2016 season demo](https://targetprocess.github.io/replayTable/#f1).

### `ЧГК`

This is for the [intellectual game](https://en.wikipedia.org/wiki/What%3F_Where%3F_When%3F#Competitive_game) popular in russian speaking world.

| Parameter | Value |
|-----------|-------|
| [`seasonName`](#season-name) | `Турнир` |
| [`roundName`](#round-name) | `Вопрос` |
| [`itemName`](#item-name) | `Команда` |
| [`totalName`](#total-name) | `Взято` |
| [`tieBreaking`](#tie-breaking) | `range` |
| [`resultMapping`](#result-mapping) | `{ 1: 'win' }` |

Watch the [2016 World Championship demo](https://targetprocess.github.io/replayTable/#chgk).


Feel free to [suggest](#contact) more presets.

## Parameters
Replay Table can be easily customized via `div` `data-` attributes. You can specify your terms, adjust the animation duration, hide unnecessary elements and do other lovely things.

It is possible to use this options together with a preset: in this case they will override preset's settings.

* [Terms](#terms)
  * [seasonName](#season-name)
  * [roundName](#round-name)
  * [startRoundName](#start-round-name)
  * [positionName](#position-name)
  * [itemName](#item-name)
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
  * [focusedItems](#focused-items)
* [Other](#other)
  * [tieBreaking](#tie-breaking)
  * [tableName](#table-name)


## Terms

Terms are great for adapting table to a specific sport or localizing it.

### `seasonName`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-season-name` |  `String` | `Season` | `Tournament`, `Saison` |

### `roundName`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-round-name` | `String` | `Game` | `Match` , `Round` , `Leg`  |

### `startRoundName`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-start-round-name` |  `String` or `undefined` | `0` | `Start`, `---` |
If defined inserts a round before all other rounds with all items having total equal to zero.

### `positionName`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-position-name` |  `String` | `#` | `Position` , `Rank`  |

### `itemName`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-item-name` |  `String` or `undefined` | `undefined` | `Team` , `Player` , `Driver`  |

When undefined tries to get the name from data source.

### `totalName`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-total-name` |  `String` | `Points` | `Win %` , `Total`  |


##Data

Data parameters help Replay table transform csv file correctly and insert extra data if needed.

### `inputType`
| Div attribute | Available options | Default value |
|---------------|-------------------|---------------|
| `data-input-type` |  [`pointsTable`](#points-table)<br/>[`listOfMatches`](#list-of-matches) | `pointsTable` |

### `itemsToShow`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-items-to-show` |  `Comma-separated string` or `undefined` | `undefined` | `Golden State Warriors,San Antonio Spurs,...` |

Sometimes you don't want to include all items that appear in results in Replay table. For example, it makes sense to split the NBA regular season results into two separate tables for each conference.

### `totalValue`
| Div attribute | Available options | Default value |
|---------------|---------------|---------------|----------|
| `data-total-value` |  `cumulative`, `win %` | `cumulative` |

| Option | Formula | Notes |
|--------|---------|-------|
| `cumulative` | `total = previousRoundTotal + currentRoundPoints` | |
| `win %` | `total = wins/rounds` | A win is determined by match result or using [`resultMapping`](#result-mapping) parameter |

### `resultMapping`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-result-mapping` |  `Object` with points as keys and result as value | `{ 3: 'win', 1: `draw`, 0: 'loss' }` | `{ 1: 'win', 0: 'loss' }` |

Maps a change in points to a `win`, `draw` or `loss`. Makes sense for the [`pointsTable`](#[points-table) input type.

### `extraColumnsNumber`
| Div attribute | Accepted type | Default value | Examples | Compatible input types |
|---------------|---------------|---------------|----------|------------------------|
| `data-extra-columns-number` |  `Number` | `0` | `1`, `2` | `[pointsTable](#points-table)`

Number of [extra columns)[#extra-columns] with info about items located between items and results.

### `roundsNames`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-rounds-names` |  `Comma-separated string` or `undefined` | `undefined` | `Australia, Bahrain, China...` |

When set to undefined tries to get names from data source. If fails uses rounds' numbers.


## Playback

### `startFromRound`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-start-from-round` |  `Number` | `undefined` | `0`, `42` |

Number of round to start from. When set to undefined the last round containing at least one non-null result is used.

### `animationDuration`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-animation-duration` |  `Number` | `1800` | `2600`, `1200` |

Animation duration in ms.

### `showChangeDuringAnimation`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-show-change-during-animation` |  `Boolean` | `false` | `true`, `false` |

If checked shows change in total (+3, +1, ...) during the animation. This ss useful when color coding is hard as in F1 (+25, +18,...).


## Appearance

### `showProgressBar`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-show-progress-bar` |  `Boolean` | `true` | `true`, `false` |

### `showSeasonRoundSwitch`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-season-round-switch` |  `Boolean` | `true` | `true`, `false` |

### `focusedItems`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-focused-items` |  `Comma-separated string` | `` | `Liverpool, Everton` |


## Other

### `tieBreaking`
| Div attribute | Available options | Default value |
|---------------|-------------------|---------------|
| `data-tie-breaking` |  `no ties`, `highest`, `range` | `no ties` |

Determines position when totals are equal.

| Option | Positions |
|--------|-----------|
| `no ties` | `1, 2, 3, 4,...` |
| `highest` | `1, 2, 2, 4,...` |
| `range` | `1, 2-3, 2-3, 4,...` |

### `tableName`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-table-name` |  `String` | `undefined` | `Premier League`, `NBA`, `F1` |

Name is required when you have several Replay Tables on one page.


## Contact
Feel free to suggest features and presets, offer tables for our public gallery and ask questions via [anton.iokov@targetprocess.com](mailto:anton.iokov@targetprocess.com) or [@antoniokov](https://twitter.com/antoniokov).