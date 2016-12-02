Replay Table
=========

A script that transforms a csv-file with season results into interactive standings:
---This is a place for gif---
Watch the [live demo](https://targetprocess.github.io/replayTable/) for football, Formula One and other sports.
## Usage
Put a `div` with `replayTable` class inside the `body` and supply a link to your csv file using `data-csv` attribute:
```
<body>
    <div class="replayTable"
         data-csv="/csv/football/england/premier-league/2015-2016.csv">
    </div>
</body>
```

There's only one csv table format available for now: a column with item names followed by results of each round. Here's an example with the 2015–16 Premier League season results:
![csv-visual](https://s3-us-west-2.amazonaws.com/replay-table/images/github/csv-visual.PNG)
Feel free to download this [csv](https://s3-us-west-2.amazonaws.com/replay-table/csv/football/england/premier-league/2015-2016.csv).
