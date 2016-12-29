Replay Table
=========

Transforms a csv file with season results into interactive standings:

![demo](https://s3-us-west-2.amazonaws.com/replay-table/images/github/demo.gif)

## Live Demos

* [Premier League](https://targetprocess.github.io/replayTable/#premier-league)
* [NBA](https://targetprocess.github.io/replayTable/#nba)
* [Formula One](https://targetprocess.github.io/replayTable/#f1)

## Quickstart

1. Prepare a [csv file](#input) with season results or download one from our [gallery](https://targetprocess.github.io/replayTable#examples).

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
        <script type="text/javascript" src="//cdn.jsdelivr.net/replay-table/latest/replay-table.min.js"></script>
        <link rel="stylesheet" type="text/css" href="cdn.jsdelivr.net/replay-table/latest/replay-table.css">
    </head>
    ```

That was easy :)

Also feel free to embed ready-to-use Replay Tables from our [gallery](https://targetprocess.github.io/replayTable/#examples-section).


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
| Yes |  `1, 2, 3, 4...`<br/>`1, 2, 2, 4,...` | [`positionName`](#positionname)<br/>[`positionWhenTied`](#positionwhentied)|

### Item
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| Yes |  `Chelsea, Liverpool, Arsenal,...`<br/>`Nico Rosberg, Lewis Hamilton, Daniel Ricciardo...` | [`itemName`](#itemname)<br/>[`itemsToShow`](#itemstoshow)<br/>[`focusedItems`](#focuseditems)|

Note: items should be unique for table to work properly.

### Extra Columns
| Required | Examples | Customization | Compatible input types |
|-------------------|-------------------|-------------------|-------------------|
| No |  `London, Liverpool, London,...`<br/>`Mercedes, Mercedes, Red Bull,...` | [`extraColumnsNumber`](#extracolumnsnumber) | [`pointsTable`](#pointstable) |

Columns with static info about items.

### Calculated Columns
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| No |  `rounds`, `wins`, `losses` | [`calculatedColumns`](#calculatedcolumns)<br/>[`resultMapping`](#resultmapping) |

Predefined calculated columns with stats.

### Total
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| Yes |  `81, 71, 70,...`<br/>`.890, .817, .671,...` | [`totalName`](#totalname)<br/>[`totalValue`](#totalvalue)<br/>[`resultMapping`](#resultmapping) |

Table is sorted using this column. When totals are equal position is determined by [`positionWhenTied`](#positionWhenTied) parameter.

### Change
| Required | Examples | Customization |
|-------------------|-------------------|-------------------|
| Yes |  `+3, +1, 0,...`<br/>`+25, +18, +15,...` | [`showChangeDuringAnimation`](#showchangeduringanimation) |

Total change since previous round, is shown in the same column as total.


## Presets
Default settings are suited to work with most of the team sports like football and hockey.
We've also built presets for other kinds of sports to make customization easy.

Just add `data-preset="_preset_name_"` to replayTable `div` and the appropriate terms and settings will apply.

### `Wins-Losses`

This preset is built for major professional sport leagues in US and Canada.

| Parameter | Value |
|-----------|-------|
| [`inputType`](#inputtype) | `listOfMatches` |
| [`itemName`](#itemname) | `Team` |
| [`totalName`](#totalname) | `Win %` |
| [`totalValue`](#totalvalue) | `win %` |
| [`resultMapping`](#resultmapping) | `{ 1: 'win', 0: 'loss' }` |
| [`calculatedColumns`](#calculatedcolumns) | `{ 'rounds': 'Games', 'wins': 'Wins', 'losses': 'Losses' }` |

Watch the [NBA demo](https://targetprocess.github.io/replayTable/#nba).

### `F1`

| Parameter | Value |
|-----------|-------|
| [`roundName`](#roundname) | `Race` |
| [`itemName`](#itemname) | `Driver` |
| [`startRoundName`](#startroundname) | `Start →` |
| [`resultMapping`](#resultmapping) | `{ 25: win}` |

Watch the [2015-2016 season demo](https://targetprocess.github.io/replayTable/#f1).

### `ЧГК`

This is for the [intellectual game](https://en.wikipedia.org/wiki/What%3F_Where%3F_When%3F#Competitive_game) popular in russian speaking world.

| Parameter | Value |
|-----------|-------|
| [`seasonName`](#seasonname) | `Турнир` |
| [`roundName`](#roundname) | `Вопрос` |
| [`itemName`](#itemname) | `Команда` |
| [`totalName`](#totalname) | `Взято` |
| [`positionWhenTied`](#positionWhenTied) | `range` |
| [`resultMapping`](#resultmapping) | `{ 1: 'win', 0: ' ' }` |

Watch the [2016 World Championship demo](https://targetprocess.github.io/replayTable/#chgk).


Feel free to [suggest](#contact) more presets.

## Parameters
Replay Table can be easily customized via `div` `data-` attributes. You can specify your terms, adjust the animation duration, hide unnecessary elements and do other lovely things.

It is possible to use this options together with a [preset](#presets): in this case they will override preset's settings.

* [Terms](#terms)
  * [seasonName](#seasonname)
  * [roundName](#roundname)
  * [startRoundName](#startroundname)
  * [positionName](#positionname)
  * [itemName](#itemname)
  * [totalName](#totalname)
* [Data](#data)
  * [inputType](#inputtype)
  * [itemsToShow](#itemstoshow)
  * [totalValue](#totalvalue)
  * [resultMapping](#resultmapping)
  * [extraColumnsNumber](#extracolumnsnumber)
  * [calculatedColumns](#calculatedcolumns)
  * [useRoundsNumbers](#useroundsnumbers)
  * [positionWhenTied](#positionWhenTied)
  * [tableName](#tablename)
* [Playback](#playback)
  * [startFromRound](#startfromround)
  * [animationDuration](#animationduration)
  * [showChangeDuringAnimation](#showchangeduringanimation)
* [Appearance](#appereance)
  * [showProgressBar](#showprogressbar)
  * [showModeSwitch](#showseasonroundswitch)
  * [focusedItems](#focuseditems)


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
| `data-calculated-columns` |  `Object` with metrics as keys and terms as values | `{}` | `{ 'rounds': 'G', 'wins': 'W', 'losses': 'L' }` |

Calculates additional stats about items' perfomance. Available metrics are `rounds`, `wins`, `draws` and `losses`.

### `useRoundsNumbers`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-use-rounds-numbers` |  `Boolean` | `false` | `true` |

If set to `true` ignores rounds' names and uses numbers.

It is useful when you have [list Of matches](#list-of-matches) where rows are dates but you don't care that teams didn't play their Nth game simultaneously.

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

### `tableName`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-table-name` |  `String` | `undefined` | `Premier League`, `NBA`, `F1` |

Name is required when you have several Replay Tables on one page.


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

### `showModeSwitch`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-show-mode-switch` |  `Boolean` | `true` | `true`, `false` |

Shows or hides the season/round switch.

### `focusedItems`
| Div attribute | Accepted type | Default value | Examples |
|---------------|---------------|---------------|----------|
| `data-focused-items` |  `Comma-separated string` |  | `Liverpool, Everton` |

Highlights specific items.


## Contact
Feel free to suggest features and presets, offer tables for our public gallery and ask questions via [anton.iokov@targetprocess.com](mailto:anton.iokov@targetprocess.com) or [@antoniokov](https://twitter.com/antoniokov).
