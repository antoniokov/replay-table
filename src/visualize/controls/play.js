export default class {
    constructor (selector, roundMeta, play, pause) {
        this.isLast = roundMeta.isLast;

        this.button = selector.append('div')
            .on('click', () => {
                if (this.isPlaying) {
                    pause();
                } else {
                    play();
                }
            });

        this.updateClass();

        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
        this.onRoundChange = this.onRoundChange.bind(this);
    }

    onPlay () {
        this.isPlaying = true;
        this.updateClass();
    }

    onPause () {
        this.isPlaying = false;
        this.updateClass();
    }

    onRoundChange (roundMeta) {
        this.isLast = roundMeta.isLast;
        this.updateClass();
    }

    updateClass () {
        const className = this.isPlaying
            ? 'pause'
            : this.isLast ? 'replay' : 'play';

        this.button
            .classed('play', className === 'play')
            .classed('pause', className === 'pause')
            .classed('replay', className === 'replay');
    }
};
