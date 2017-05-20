export default function (cell, roundIndex) {
    const classes = ['spark'];

    if (cell.roundMeta.index === roundIndex) {
        classes.push('current');
    } else if (cell.roundMeta.index > roundIndex) {
        classes.push('overlapped');
    }

    return classes.join(' ');
};
