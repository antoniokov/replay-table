Replay Table
=========

A script that transforms a csv-file with season results into interactive standings:
<gif>
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
