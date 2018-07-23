Replay Table
=========

A library fo visualizing sport season results with interactive standings:

![sparklines-demo](https://replaytable.com/assets/images/sparklines_demo.gif)

## Live Demos

* [English Premier League](https://replaytable.com#replay-english-premier-league-2016-2017)
* [Formula One](https://replaytable.com#replay-formula-one-drivers-2016)
* [NBA](https://replaytable.com#replay-nba-western-2015-2016)

## Quickstart

1. Prepare an [input file](#input) with season results or download one from our [examples](https://replaytable.com/#examples).

2. Put a `div` with `replayTable` class on your page and supply a link to the input file using `data-source` attribute:

    ```
    <div class="replayTable"
         data-source="/path/to/file.csv">
    </div>
    ```
3. Include D3.js and Replay Table scripts (70+16 KB gzipped) and the stylesheet. Apply some magic to the body:

    ```
    <head>
        ...
        <script type="text/javascript" src="https://d3js.org/d3.v4.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/replay-table/dist/replay-table.min.js"></script>
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/replay-table/dist/replay-table.css">
    </head>
    <body>
        ...
        <script type="text/javascript">replayTable.magic()</script>
    </body>
    ```
    
4. Enjoy!

The library is highly customizable via `data-` attributes. Check out [customization](#customization) for the details.

Also feel free to embed ready-to-use Replay Tables from our [gallery](https://replayTable.com/#examples).


## Library

`npm install -S replay-table`

The only dependency is [D3.js](d3js.org). D3 is not included with the library so don't forget to plug it up. 

The library consists of 5 modules: configure → extract → transform → calculate → visualize.
Take a look at how we use them in the `magic` function:

```
return Array.from(document.getElementsByClassName('replayTable'))
        .map(table => {
            const config = replayTable.configure(table.id, table.dataset); //build a config from data- attributes

            return Promise.resolve(replayTable.extract(config.extract)) //fetch the input
                .then(raw => {
                    const transformed = replayTable.transform(raw, config.transform); //transform into predefined format
                    const calculated = replayTable.calculate(transformed, config.calculate); //calculate wins, goals, etc.
                    return replayTable.visualize(calculated, config.visualize); //render interactive standings
                })
                .catch(error => crash(error));
        });
```

Sometimes you won't need all the modules: for example, feel free to omit `configure` if you already have a config.
    
A Replay Table is returned from the `visualize` module. It has methods like `play()` and `to(roundIndex)` so you can control its behaviour from code. 


## Customization
* [Configure](#configure)
    * [Presets](#presets)
* [Extract](#extract)
* [Transfrom](#transform)
  * [List of Matches](#list-of-matches)
  * [Points Table](#points-table)
* [Calculate](#calculate)
* [Visualize](#visualize)
  * [Classic](#classic)
  * [Sparklines](#sparklines)

## Configure

Makes configs for other modules based on the div `data-` attributes. The output looks like this:

```
extract: {
    extractor: csv
},
transform: {
    transformer: 'pointsTable',
    changeToOutcome: {
        25: 'win'
    },
    insertStartRound: 'Start →'
},
calculate: {
    orderBy: ['points', 'wins']
},
visualize: {
    columns: ['position', 'item', 'points', 'points.change'],
    labels: ['#', 'Driver', 'Points']
}
```

### Presets

To save you some time and cognitive effort we've constructed presets 
that you can use via `data-preset` attribute: 
[matches](https://github.com/TargetProcess/replay-table/blob/master/src/configure/presets/matches.js), 
[f1](https://github.com/TargetProcess/replay-table/blob/master/src/configure/presets/f1.js), 
[winLoss](https://github.com/TargetProcess/replay-table/blob/master/src/configure/presets/win-loss.js), 
[chgk](https://github.com/TargetProcess/replay-table/blob/master/src/configure/presets/chgk.js).
 
So this table:

```
<div class="replayTable"
    data-source="/path/to/file.csv">
    data-transformer="listOfMatches"
    data-change-to-outcome="{ 1: 'win', 0: 'loss' }"
    data-order-by="winningPercentage,wins"
    data-visualizer="classic"
    data-columns="position,item,rounds,wins,losses,winningPercentage,outcome,match"
    data-labels="#,Team,G,W,L,Win %"
</div>
```

is identical to this:

```
<div class="replayTable"
    data-source="/path/to/file.csv">
    data-preset="winLoss"
</div>
```

## Extract

Fetches the input file, returns a promise.

  
| Parameter | Attribute | Required | Accepts | Default | Examples |
|-----------|-----------|----------|---------------|---------------|----------|
| source | `data-source` | yes | `string` | `null` | `/assets/data/football/2016-2017/english-premier-league.json` |
| extractor | `data-extractor` | no | [extractor](https://github.com/TargetProcess/replay-table/tree/master/src/extract/extractors) | `csv` | `csv`, `json` |

If extractor is not defined we try to guess it from the file extension.

## Transform

Transforms raw data into the predefined format:

```
[
    {
        name: 'round name',
        results: {
            [
                {
                    change: 25,
                    extras: {
                        item: {
                            team: 'Mercedes'
                        }
                    },
                    item: 'Lewis Hamilton',
                    outcome: 'win'
                },
                {
                    ...
                },
                ...
            ]
        }
    },
    {
        ...
    },
    ...
]
```

| Parameter | Attribute | Accepts | Parses | Default | Examples |
|-----------|-----------|---------|--------|---------------|----------|
| transformer | `data-transformer` | [transformer](https://github.com/TargetProcess/replay-table/tree/master/src/transform/transformers) | | `listOfMatches` | `listOfMatches`, `pointsTable` |
| changeToOutcome | `data-change-to-outcome` | `object` | JSON object | `{ 3: 'win', 1: 'draw', 0: 'loss'}` | `{ 1: 'win', 0: 'loss'}` |
| filterItems | `data-filter-items` | `array of strings` | comma-separated string | `[]` | `['Golden State Warriors', 'San Antonio Spurs', ...]` |
| insertStartRound | `data-insert-start-round` | `string` | | `0` | `Start` |


### List of Matches

The structure looks like this:

| Round name | First Item | First Item Score | Second Item | Second Item Score |
|------------|------------|------------------|-------------|-------------------|
| Round | Item | Score | Item | Score |

List should be sorted by round.

Here is an example:

| Match Week | Home | Points | Away | Points |
|------|------|--------|------|--------|
| 1 | Bournemouth | 0 | Aston Villa | 1 |
| 1 | Chelsea | 2 | Swansea | 2 |
| 1 | Everton | 2 | Watford | 2 |
| ... | ... | ... | ... | ... |

Also works with [football-data.org fixtures](http://api.football-data.org/v1/competitions/426/fixtures)
and [api.football-data.org/v2/competitions/{id}/matches (free API key is required)](https://www.football-data.org/documentation/quickstart#available-resources). 
To get free API key go to http://api.football-data.org/client/register


| Parameter | Attribute | Accepts | Default | Examples |
|-----------|-----------|---------|---------------|----------|
| format | `data-format` | `csv`, `football-data.org` or `football-data.org/v2` | `csv` | `csv`, `football-data.org`, `football-data.org/v2` |
| locationFirst | `data-location-first` | `home` or `away` | `home` | `home`, `away` |
| collapseToRounds | `data-collapse-to-rounds` | `boolean` | `false` | `true`, `false` |

Use `collapseToRounds` when you've got dates instead of match weeks: it groups each team's 1st, 2nd, 3rd, ... games.

### Points Table

The structure looks like this:

| Item name | [1st extra column name] | [2nd extra column name] | [...] | 1st round name | 2nd round name | ... | last round name |
|-----------|-------------------------|-------------------------|-----|----------------|----------------|-----|-----------------|
| item | [1st piece of extra info] | [2nd piece of extra info] | [...] | 1st round points | 2nd round points | ... | last round points |

The Formula One example ([csv](https://replaytable.com/assets/data/formula-one/2016/formula-one-drivers.csv)):

| Driver | Team | Australia | Bahrain | ... | Abu Dhabi |
|------|---|---|---|-----|----|
| Lewis Hamilton | Mercedes | 18 | 15 | ... | 25 |
| Nico Rosberg | Mercedes | 25 | 25 | ... | 18 |
| Daniel Ricciardo | Red Bull | 12 | 12 | ... | 10 |
| ... | ... | .... | ... | ... | ... |

Watch the [live demo](https://replaytable.com/#replay-formula-one-drivers-2016).

| Parameter | Attribute | Accepts | Default | Examples |
|-----------|-----------|---------|---------------|----------|
| extraColumnsNumber | `data-extra-columns-number` | `int` | `0` | `1`, `2` |


## Calculate

Calculates wins, goals, points, etc. and adds metadata. The output looks like this:
   
```
{
    meta: {
        lastRound: 38
    },
    results: {
        [
            {
                meta: {
                    index: 2,
                    isLast: false,
                    items: 20,
                    name: "2"
                },
                results: {
                    [
                        {
                            change: 3,
                            draws: {
                                change: 0,
                                total: 0
                            },
                            extras: {},
                            item: 'Leicester',
                            losses: {
                                change: 0,
                                total: 0
                            },
                            match: {
                                location: "away",
                                opponent: "West Ham",
                                opponentScore: 1,
                                score: 2
                            },
                            outcome: "win",
                            points: {
                                change: 3,
                                total: 6
                            },
                            position: {
                                highest: 1,
                                lowest: 4,
                                strict: 1
                            },
                            wins: {
                                change: 1,
                                total: 2
                            }
                            ...//goalsFor, goalsAgainst, goalsDifference, rounds, winningPercentage
                        },
                        ....
                    ]
                }
            },
            ...
        ]
    }
}
```

See the whole list of calculations in the [calculations.js](https://github.com/TargetProcess/replay-table/blob/master/src/calculate/calculations.js).


| Parameter | Attribute | Accepts | Parses | Default | Examples |
|-----------|-----------|---------|--------|---------------|----------|
| orderBy | `data-order-by` | `array` of calculations | comma-separated string | `['points']` | `['winningPercentage', 'wins']` |


## Visualize

Renders interactive standings out of calculated data.

Returns a class instance with useful methods:
* `first()`, `last()`, `next()`, `previous()` and `to(roundIndex)`
* `play()` and `pause()`
* `preview(roundIndex)` and `endPreview()`
* `drillDown(item)` and `endDrillDown()`


| Parameter | Attribute | Accepts | Parses | Default | Examples |
|-----------|-----------|---------|--------|---------------|----------|
| visualizer | `data-visualizer` | [visualizer](https://github.com/TargetProcess/replay-table/tree/master/src/visualize/visualizers) | | `classic` | `classic`, `sparklines` |
| controls | `data-conrols` | `array` of [controls](https://github.com/TargetProcess/replay-table/tree/master/src/visualize/controls) | comma-separated string | `['play', 'previous', 'next', 'slider']` | `['play', 'slider']` |
| startFromRound | `data-start-from-round` | `int` | | `null` | `0`, `15` |
| roundsTotalNumber | `data-rounds-total-number` | `int` | | `null` | `38`, `82` |
| positionWhenTied | `data-position-when-tied` | `int` | | `strict`, `highest`, `range` or `average` | `strict`, `highest` |
| animationSpeed | `data-animation-speed` | `float` | | `1.0` | `0.5`, `2.0` |


### Classic

![classic-f1-demo](https://replaytable.com/assets/images/classic_f1_demo.gif)

[Formula One](https://replaytable.com#replay-formula-one-drivers-2016)


A simple table with controls on top. Works for any sport and is highly customizable.

| Parameter | Attribute | Accepts | Parses | Default | Examples |
|-----------|-----------|---------|--------|---------------|----------|
| columns | `data-columns` | `array` of columns | comma-separated string | `['position', 'item', 'points']` | `['position', 'item', 'points', 'outcome', 'points.change]` |
| labels | `data-labels` | `array of strings` | comma-separated string | `['#', 'Team', 'Points']` | `['Position', 'Driver', 'Points']` |
| colors | `data-colors` | `object` | JSON object | `{ 'win': '#ACE680', 'draw': '#B3B3B3', 'loss': '#E68080' }` | `{ 'win': 'green', 'draw': 'gray', 'loss': 'red' }` |
| durations | `data-durations` | `object` | JSON object | `{ move: 750, freeze: 750, outcomes: 200}` | `{ move: 500, freeze: 400, outcomes: 250}` |

### Sparklines

![sparklines-demo](https://replaytable.com/assets/images/sparklines_demo.gif)

[English Premier League](https://replaytable.com#replay-english-premier-league-2016-2017)

A powerful interactive visualization for the sports with matches and points. Might be slow on old devices and in Firefox.

| Parameter | Attribute | Accepts | Parses | Default | Examples |
|-----------|-----------|---------|--------|---------------|----------|
| controls | `data-conrols` | `array` of [controls](https://github.com/TargetProcess/replay-table/tree/master/src/visualize/controls) | comma-separated string | `['play']` | `['play', 'previous', 'next']` |
| colors | `data-colors` | `object` | JSON object | `{ 'win': '#21c114', 'draw': '#828282', 'loss': '#e63131' }` | `{ 'win': 'green', 'draw': 'gray', 'loss': 'red' }` |
| sparkColors | `data-spark-colors` | `object` | JSON object | `{ 'win': '#D7E7C1', 'draw': '#F0F0F0', 'loss': '#EFCEBA' }` | `{ 'win': 'green', 'draw': 'gray', 'loss': 'red' }` |
| currentSparkColors | `data-current-spark-colors` | `object` | JSON object | `{ 'win': '#AAD579', 'draw': '#CCCCCC', 'loss': '#E89B77' }` | `{ 'win': 'green', 'draw': 'gray', 'loss': 'red' }` |
| durations | `data-durations` | `object` | JSON object | `{ move: 1000, freeze: 500, pre: 750}` | `{ move: 750, freeze: 750, pre: 375}` |
| pointsLabel | `data-points-label` | `string` | | `points` | `очков` |
| allLabel | `data-all-label` | `string` | | `All` | `Все` |

## Contribution

Please, post your suggestions and bugs via Github issues. PRs are also welcome!

If you own an API or a database with sports results we'd be happy to collaborate.

We'd also be happy to work with sport journalists to leverage Replay Table for a better season recap.

## Credits

The library was built using the [orange time](http://www.openwork.org/targetprocess/) at [Targetprocess](https://www.targetprocess.com/) 
by Anton Iokov ([@antoniokov](https://github.com/antoniokov)) and Daria Krupenkina ([@dariak](https://github.com/dariak)).

[Sparklines](#sparklines) prototype was made by Vitali Yanusheuski. 


## Contact

We're open to your ideas and are ready to help with integrating Replay Table into your website.  

Please, write us an email to [anton.iokov@targetprocess.com](mailto:anton.iokov@targetprocess.com) or ping on Twitter at [@antoniokov](https://twitter.com/antoniokov).
