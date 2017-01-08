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

export default function (change, maxAbsChange, animationDuration) {
    const color = change >= 0 ? 'green' : 'red';
    if (animationDuration) {
        return {
            animation: `${colors[color]}-${calculateColorIntensity(change, maxAbsChange)} ${animationDuration}ms`
        }
    } else {
        return {
            backgroundColor: `rgba(${colors[color]},${calculateColorIntensity(change, maxAbsChange)})`
        }
    }
}
