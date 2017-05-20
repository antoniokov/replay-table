export default function (cell, roundIndex, params) {
    if (!cell.result.outcome) {
        return 'transparent'
    }

    return cell.roundMeta.index === roundIndex
        ? params.currentSparkColors[cell.result.outcome]
        : params.sparkColors[cell.result.outcome];
};
