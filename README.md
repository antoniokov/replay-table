Replay Table
=========

Transforms a csv file with season results into interactive standings:

![demo](https://s3-us-west-2.amazonaws.com/replay-table/images/github/demo2.gif)

## Live Demos

* [Premier League](https://replaytable.com/#english-premier-league)
* [NBA](https://replaytable.com/#nba-western)
* [Formula One](https://replaytable.com/#formula-one-drivers)

## Quickstart

1. Prepare a [csv file](#input) with season results or download one from our [gallery](https://replaytable.com/#examples).

2. Put a `div` with `replayTable` class on your page and supply a link to the csv file using `data-csv` attribute:

    ```
    <div class="replayTable"
         data-csv="/path/to/file.csv">
    </div>
    ```
3. Include Replay tables script and stylesheet:

    ```
    <head>
        ...
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/replay-table/latest/replay-table.css">
    </head>
    <body>
        ...
        <script type="text/javascript" src="//cdn.jsdelivr.net/replay-table/latest/replay-table.min.js"></script>
    </body>
    ```
    
4. Enjoy!

That was easy :)

Also feel free to embed ready-to-use Replay Tables from our [gallery](https://replayTable.com/#examples).


## Customization
* [Input](#input)
  * [List of Matches](#list-of-matches)
  * [Points Table](#points-table)
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
  * [Behaviour](#behaviour)
  * [Appearance](#appereance)
  * [Other](#other)

## Input

Replay Table only supports csv files for now. Please, use comma as separator and UTF-8 as encoding.

### List of Matches

The structure looks like this:

| Round name | Home Item | Home Item Score | Away Item | Away Item Score |
|------------|-----------|-----------------|-----------|-----------------|
| Round | Item | Score | Item | Score |

List should be sorted by round.

The Premier League example ([csv](https://replaytable.com/assets/csv/football/2015-2016/english-premier-league.csv)):

| Date | Home | Points | Away | Points |
|------|------|--------|------|--------|
| August 8 | Bournemouth | 0 | Aston Villa | 1 |
| August 8 | Chelsea | 2 | Swansea | 2 |
| August 8 | Everton | 2 | Watford | 2 |
| ... | ... | ... | ... | ... |

Watch the [live demo](https://replaytable.com/#english-premier-league).

Parameters:
* [`addStartRound`](#addstartround)
* [`useRoundsNumbers`](#useroundsnumbers)
* [`locationFirst`](#locationfirst)

[Modes](#modes): `season`, `round` (matches), `item`.

### Points Table

The structure looks like this:

| Item name | [1st extra column name] | [2nd extra column name] | [...] | 1st round name | 2nd round name | ... | last round name |
|-----------|-------------------------|-------------------------|-----|----------------|----------------|-----|-----------------|
| item | [1st piece of extra info] | [2nd piece of extra info] | [...] | 1st round points | 2nd round points | ... | last round points |

The Formula One example ([csv](https://replaytable.com/assets/csv/formula-one/2016/drivers.csv)):

| Driver | Team | Australia | Bahrain | ... | Abu Dhabi |
|------|---|---|---|-----|----|
| Lewis Hamilton | Mercedes | 18 | 15 | ... | 25 |
| Nico Rosberg | Mercedes | 25 | 25 | ... | 18 |
| Daniel Ricciardo | Red Bull | 12 | 12 | ... | 10 |
| ... | ... | .... | ... | ... | ... |

Watch the [live demo](https://replaytable.com/#formula-one-drivers).

Parameters:
* [`addStartRound`](#addstartround)
* [`extraColumnsNumber`](#extracolumnsnumber)

[Modes](#modes): `season`, `changes`, `item`.

## Table Structure

### Position
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| Yes |  `1, 2, 3, 4...`<br/>`1, 2, 2, 4,...` | [`terms`](#terms)<br/>[`positionWhenTied`](#positionwhentied)|

### Item
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| Yes |  `Chelsea, Liverpool, Arsenal,...`<br/>`Nico Rosberg, Lewis Hamilton, Daniel Ricciardo...` | [`terms`](#terms)<br/>[`itemsToShow`](#itemstoshow)<br/>[`focusedItems`](#focuseditems)|

Note: items should be unique for table to work properly.

### Extra Columns
| Required | Examples | Customization | Compatible input types |
|-------------------|-------------------|-------------------|-------------------|
| No |  `London, Liverpool, London,...`<br/>`Mercedes, Mercedes, Red Bull,...` | [`extraColumnsNumber`](#extracolumnsnumber) | [`pointsTable`](#pointstable) |

Columns with static info about items.

### Calculated Columns
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| No |  `rounds`, `wins`, `losses`, `goalsFor` | [`calculatedColumns`](#calculatedcolumns)<br/>[`resultMapping`](#resultmapping) |

Predefined calculated columns with stats.

### Total
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| Yes |  `81, 71, 70,...`<br/>`.890, .817, .671,...` | [`terms`](#terms)<br/>[`totalValue`](#totalvalue)<br/>[`resultMapping`](#resultmapping) |

Table is sorted using this column. When totals are equal position is determined by [`positionWhenTied`](#positionwhentied) parameter.

### Change
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| Yes |  `+3, +1, 0,...`<br/>`+25, +18, +15,...` | [`showChangeDuringAnimation`](#showchangeduringanimation) |

Total change since previous round, is shown in the same column as total.


## Presets
Default settings are suited to work with most of the team sports like football and hockey.
We've also built presets for other kinds of sports for a smooth customization.

Just add `data-preset="{PRESET_NAME}"` to replayTable `div` and the appropriate terms and settings will apply.

### `Wins-Losses`

This preset is built for major professional sport leagues in US and Canada.

| Parameter | Value |
|-----------|-------|
| [`inputType`](#inputtype) | `listOfMatches` |
| [`terms`](#terms) | `{ 'total': 'Win %' }` |
| [`totalValue`](#totalvalue) | `win %` |
| [`resultMapping`](#resultmapping) | `{ 1: 'win', 0: 'loss' }` |
| [`calculatedColumns`](#calculatedcolumns) | `{ 'rounds': 'Games', 'wins': 'Wins', 'losses': 'Losses' }` |

Watch the [NBA demo](https://replaytable.com/examples/basketball/2015-2016/#nba-eastern).

### `F1`

| Parameter | Value |
|-----------|-------|
| [`inputType`](#inputtype) | `pointsTable` |
| [`terms`](#terms) | `{ 'round': 'Race', 'item': 'Driver' }` |
| [`addStartRound`](#addstartround) | `Start →` |
| [`resultMapping`](#resultmapping) | `{ 25: win}` |
| [`tieBreaking`](#tiebreaking) | `wins` |

Watch the [2016 season demo](https://replaytable.com/examples/formula-one/2016/#formula-one-drivers).

### `ЧГК`

This is for the [intellectual game](https://en.wikipedia.org/wiki/What%3F_Where%3F_When%3F#Competitive_game) popular in the Russian-speaking world.

| Parameter | Value |
|-----------|-------|
| [`inputType`](#inputtype) | `pointsTable` |
| [`terms`](#terms) | `{ 'season': 'Турнир', 'round': 'Вопрос', 'changes': 'Вопрос', 'position': 'Место', 'item': 'Команда', 'total': 'Взято', 'change': 'Вопрос' }` |
| [`positionWhenTied`](#positionwhentied) | `range` |
| [`resultMapping`](#resultmapping) | `{ 1: 'win', 0: ' ' }` |

Watch the [2016 World Championship demo](https://replaytable.com/examples/chgk/2015-2016/#world-championship).


Feel free to [suggest](#contact) more presets.

## Parameters
Replay Table can be easily customized via `div` `data-` attributes. You can specify your terms, adjust the animation duration, hide unnecessary elements and do other lovely things.

It is possible to use this options together with a [preset](#presets): in this case they will override preset's settings.

* [Terms](#terms)
* [Data](#data)
  * [inputType](#inputtype)
  * [itemsToShow](#itemstoshow)
  * [totalValue](#totalvalue)
  * [resultMapping](#resultmapping)
  * [extraColumnsNumber](#extracolumnsnumber)
  * [calculatedColumns](#calculatedcolumns)
  * [useRoundsNumbers](#useroundsnumbers)
  * [roundsTotalNumber](#roundstotalnumber)
  * [tieBreaking](#tiebreaking)
  * [positionWhenTied](#positionwhentied)
  * [tableName](#tablename)
* [Behaviour](#behaviour)
  * [startFromRound](#startfromround)
  * [animationDuration](#animationduration)
  * [showChangeDuringAnimation](#showchangeduringanimation)
* [Appearance](#appereance)
  * [showProgressBar](#showprogressbar)
  * [showModeSwitch](#showseasonroundswitch)
  * [focusedItems](#focuseditems)


## Terms

Terms are great for localization and adapting table to a specific sport.

| Div attribute | Accepted type | Example |
|---------------|---------------|---------------|----------|
| `data-terms` |  `Object` with terms as keys and names as values | `{ 'round': 'Race', 'item': 'Driver' }`  |

The list of terms:

| Term | Default name | Examples |
|------|---------------|----------|
| `season` | `Season` | `Tournament`, `Saison`, `Сезон` |
| `round` | `Round` | `Game`, `Leg`, `Раунд` |
| `position` | `#` | `Position`, `Rank`, `Место` |
| `item` | `Team` | `Player` , `Driver`, `Команда` |
| `total` | `Points` | `Win %` , `Total`, `Очки` |
| `changes` | `Changes` | `Delta`, `Изменения` |
| `change` | `Change` | `Delta` , `Изменение` |

##Data

Data parameters help Replay table transform csv files correctly and insert extra data if needed.

### `inputType`
| Div attribute | Available options | Default value |
|---------------|-------------------|---------------|
| `data-input-type` |  [`listOfMatches`](#list-of-matches)<br/>[`pointsTable`](#points-table) | `listOfMatches` |

### `addStartRound`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-add-start-round` |  `String` or `undefined` | `0` | `Start`, `---` |

If defined inserts a start round with all items having totals equal to zero.

### `itemsToShow`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-items-to-show` |  `Comma-separated string` or `undefined` | `undefined` | `Golden State Warriors,San Antonio Spurs,...` |

Sometimes you don't want to include all items that appear in results in Replay table. For example, it makes sense to split the NBA regular season results into two separate tables for each conference.

### `totalValue`
| Div attribute | Available options | Default value |
|---------------|---------------|---------------|----------|
| `data-total-value` |  `cumulative`, `win %` | `cumulative` |

| Option | Formula |
|--------|---------|-------|
| `cumulative` | `total = previousRoundTotal + currentRoundPoints` | |
| `win %` | `total = wins/rounds` |

### `resultMapping`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-result-mapping` |  `Object` with points as keys and result as values | `{ 3: 'win', 1: 'draw', 0: 'loss' }` | `{ 1: 'win', 0: 'loss' }` |

Maps a change in points to a `win`, `draw` or `loss`. Makes sense for the [`pointsTable`](#[points-table) input type.

### `extraColumnsNumber`
| Div attribute | Available options | Default value | Examples | Compatible input types |
|---------------|---------------|---------------|----------|------------------------|
| `data-extra-columns-number` |  `Number` | `0` | `1`, `2` | [`pointsTable`](#points-table)

Number of [extra columns](#extra-columns) with info about items located between items and results.

### `calculatedColumns`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-calculated-columns` |  `Object` with metrics as keys and labels as values | `{}` | `{ 'rounds': 'G', 'wins': 'W', 'losses': 'L' }` |

Calculates additional stats about items' perfomance. Available metrics are: 
* `rounds`
* `wins`
* `draws`
* `losses`
* `goalsFor`
* `goalsAgainst`
* `goalsDifference`
* `rating` (for [ЧГК](#чгк) preset)

### `useRoundsNumbers`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-use-rounds-numbers` |  `Boolean` | `false` | `true` |

If set to `true` ignores rounds' names and counts the number of rounds passed for each item.

This is useful when you have [list Of matches](#list-of-matches) 
where rows are dates but you don't care that teams didn't play their Nth game simultaneously.

### `roundsTotalNumber`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-rounds-total-number` |  `Number` | `undefined` | `38`, `40` |

Helps to determine the correct value of the progress bar if season is not over yet.

When set to `undefined` counts the number of rounds with at least one result.

### `tieBreaking`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-tie-breaking` |  `Comma-separated string` | `` | `wins`, `goalsDifference,goalsFor` |

Breaks a tie when totals are equal.

Accepts a list of [`calculatedColumns`](#calculcatedcolumns) with the most important one being first.
They don't need to be visible so you can use this parameter independently from [`calculatedColumns`](#calculcatedcolumns).


### `positionWhenTied`
| Div attribute | Available options | Default value |
|---------------|-------------------|---------------|
| `data-position-when-tied` |  `previous round`, `highest`, `range` | `previous round` |

Determines position when totals are equal.

| Option | Positions |
|--------|-----------|
| `previous round` | `1, 2, 3, 4,...` |
| `highest` | `1, 2, 2, 4,...` |
| `range` | `1, 2-3, 2-3, 4,...` |

### `locationFirst`
| Div attribute | Available options | Default value |
|---------------|-------------------|---------------|
| `data-location-first` |  `home`, `away` | `home` |

Typically a home team goes first in Europe and second in the USA. 
This parameter is used in parsing [`list of matches`](#list-of-matches), showing match results
and calculating home-away related [`calculatedColumns`](#calculatedcolumns).


### `tableName`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-table-name` |  `String` | `undefined` | `Premier League`, `NBA`, `F1` |

Name is required when you have several Replay Tables on one page.


## Behaviour

### `modes`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-modes` |  `Comma-separated string` | All available for the [input](#input) | `season, round` |

Modes to show in the switch. If you don't need all the drill downs, specify only the desired modes using this parameter.
For available modes check out the [input](#input) section.

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

### `focusedItems`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-focused-items` |  `Comma-separated string` |  | `Liverpool, Everton` |

Highlights specific items.


## Contact
Feel free to suggest features and presets, offer tables for our public gallery and ask questions via [anton.iokov@targetprocess.com](mailto:anton.iokov@targetprocess.com) or [@antoniokov](https://twitter.com/antoniokov).
