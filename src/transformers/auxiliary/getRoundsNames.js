export default function (rawRoundsNames, numberOfRounds) {
    if(!rawRoundsNames) {
        return [...new Array(numberOfRounds).keys()];
    }

    if(rawRoundsNames.every(roundName => !isNaN(roundName))) {
        return rawRoundsNames.map(roundName => Number.parseInt(roundName, 10));
    } else {
        return rawRoundsNames;
    }
}