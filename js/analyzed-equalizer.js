const heights = Array.of(101);

for (let n = 0; n < 101; n++)
    heights[n] = n + `%`;

class Renderer {
    constructor() {
        this.nextFrame = () => this.render();
    }
    render() {
        this.analyzer.getByteFrequencyData(this.buffer);

        for (let m = 0; m < bars.length; m++) {
            const e = bars[m];
            const val = this.buffer[m];

            const c = Math.floor(val * 90 / 255);
            e.style.height = heights[c];
           e.style.backgroundColor = colors[Math.floor(c/9)];
        }

        this.ref = requestAnimationFrame(this.nextFrame);

    }

    start() {
        if(!this.analyzer) {
            const context = new AudioContext();
        const src = context.createMediaElementSource(player);
        this.analyzer = context.createAnalyser();
        src.connect(this.analyzer);
        this.analyzer.connect(context.destination);
        this.analyzer.fftSize = 1024;
        this.buffer = new Uint8Array(this.analyzer.frequencyBinCount);

        }
        
        this.render();
    }
    stop() {
        if (this.ref) {
            cancelAnimationFrame(this.ref);
            delete this.ref;

            for (let m = 0; m < bars.length; m++) {
                const e = bars[m];
                e.style.height = 0;
            }
        }
    }
}

