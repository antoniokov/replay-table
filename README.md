Replay Table
=========

This is a script that transforms a csv file with season results into interactive standings:

This is a place for gif

Watch the [live demo](https://targetprocess.github.io/replayTable/) for football, Formula One and other sports.

## Table of Contents
* [Quickstart](#quickstart)
* [Input File](#input-file)
* [Customization](#customization)
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

## Customization
### `name`
| **Div Attribute** | **Accepted Type** | **Default Value** |
|-------------------|-------------------|-------------------|
| `data-name` |  `String` | `undefined` |
Name is required when you have several Replay Tables on one page.
