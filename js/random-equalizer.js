const heights = new Array(101);

for (let n = 0; n < 101; n++)
    heights[n] = n + `%`;

class Renderer {
    constructor() {
        this.nextFrame = () => this.render();
    }

    render() {
        for (let m = 0; m < bars.length; m++) {
            const e = bars[m];

            const c = Math.floor(Math.random() * 90);
            e.style.height = heights[c];
            e.style.backgroundColor = colors[c % colors.length];
        }
    }

    start() {
        for (const e of document.getElementsByClassName('bar'))
            e.style.transition = 'height .35s ease-in, background-color .35s ease-in';

        this.render();
        this.ref = setInterval(this.nextFrame, 300);
    }
    stop() {
        if (this.ref) {
            clearInterval(this.ref);
            delete this.ref;

            for (const e of document.getElementsByClassName('bar'))
                e.style.transition = 'height 1s ease-in, background-color .35s ease-in';

            for (let m = 0; m < bars.length; m++) {
                const e = bars[m];
                e.style.height = heights[0];
            }
        }

    }
}

