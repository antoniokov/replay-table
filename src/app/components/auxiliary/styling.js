const colors = {
    'green': '94,179,26',
    'red': '179,82,82'
};


function calculateColorIntensity (change, maxChange) {
    if (!change) {
        return 0;
    }

    return Math.max(Math.round(10*Math.abs(change)/maxChange)/10, 0.1);
}

export function getRowColor (change, maxAbsChange) {
    const color = change >= 0 ? 'green' : 'red';
    return `rgba(${colors[color]},${calculateColorIntensity(change, maxAbsChange)})`;
}

export function getRowAnimation (change, maxAbsChange, animationDuration, isFading = true) {
    const color = change >= 0 ? 'green' : 'red';
    const intensity = 100*calculateColorIntensity(change, maxAbsChange);
    return `replay-table-${color}${isFading ? '-fading' : ''}-${intensity} ${animationDuration}ms`;
}

export function getClassesString (classCandidates) {
    return classCandidates
        .filter(element => element.condition)
        .map(element => element.class)
        .join(' ');
}