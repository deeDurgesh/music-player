const byId = id => document.getElementById(id);
const firstByClassName = cls => document.getElementsByClassName(cls)[0];


const player = byId('audio_player');
const dialedNumber = byId("dialed_number");

const playBtn = firstByClassName("btn play");
const pauseBtn = firstByClassName("btn pause");

const rightSide = byId('player');
const volume_slider = byId('volume_slider');
const visualization = byId('visualization');

const COLUMNS_COUNT = 512; 
/*
...
span.bar {
  background-color: white;
  display: inline-block;
  width: calc(100% / 515);
}
...
line 181 of style.css
width: calc(100% / ...); to  width: calc(100% / (COLUMNS_COUNT + 5));
*/

const bars = new Array(COLUMNS_COUNT);

for (let n = 0; n < COLUMNS_COUNT; n++) {
    const e = document.createElement('span');
    e.classList.add('bar');
    visualization.appendChild(e);
    bars[n] = e;
}

const colors = [
    "#C501E1",
    "#9A26F8",
    "#6564FE",
    "#2B97FA",
    "#02C4E7",
    "#16E6CC",
    "#2EF9A0",
    "#C6E501",
    "#E7C501",
    "#FF6A63",
    "#F82D98",
    "#E830CE"
];

const music_name = byId('playing_name');
const renderer = new Renderer();

class Progress {
    constructor() {
        const e = byId('progress_container');
        this.progress = e.getElementsByTagName('progress')[0];
        [this._passedTime, this._duration] = e.getElementsByTagName('span');
    }

    set timePassed(seconds) {
        this._passedTime.innerText = secondsToHms(seconds);
        this.progress.value = seconds;
    }
    set duration(seconds) {
        this.timePassed = 0;
        this._duration.innerText = secondsToHms(seconds);
        this.progress.max = seconds;
    }
}

function secondsToHms(d) {
    d = Math.floor(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? (h < 10 ? '0' : '') + h + '/' : "";
    var mDisplay = (m < 10 ? '0' : '') + m + '/';
    var sDisplay = (s < 10 ? '0' : '') + s;
    return hDisplay + mDisplay + sDisplay;
}

const progress = new Progress();

player.addEventListener('durationchange', function () {
    progress.duration = this.duration;
});

player.addEventListener('play', () => play(true));
player.addEventListener('pause', () => pause(true));

player.addEventListener('timeupdate', function () {
    progress.timePassed = this.currentTime;
});

function previous() {
    console.log("previous");
}

function play(playerStopped) {
    if (!playerStopped)
        player.play();
    else {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline';

        renderer.start();
    }

}
function pause(playerStopped) {
    if (!playerStopped)
        player.pause();
    else {
        playBtn.style.display = 'inline';
        pauseBtn.style.display = 'none';

        renderer.stop();
    }

}
function next() {
    console.log("next");
}
function stop() {
    player.pause();
    player.currentTime = 0;
}
function keypadClick(event) {
    event = event.target.innerText;

    if (event !== '*' && event !== '#' && (!dialedNumber.innerText || dialedNumber.innerText.length < 10))
        dialedNumber.innerText = dialedNumber.innerText + event;
}
function dialAction() {
    let k = dialedNumber.innerText;
    if (!k) {
        alert('no value specified');
        return;
    }

    let song = musicFiles[Number(k)];

    if (!song) {
        alert('no music file found for: ' + k);
        return;
    }

    load('./audio/85bpm/' + song);
    play();
}

function backspace() {
    const s = dialedNumber.innerText;
    if (s)
        dialedNumber.innerText = s.substring(0, s.length - 1);
}

function load(file) {
    player.src = file;
    player.load();
    player.play();
    music_name.innerText = file;
}

player.volume = Number(volume_slider.value) / 100;
volume_slider.addEventListener('change', function () {
    player.volume = Number(volume_slider.value) / 100;
});

function loadDefault() {
    load('audio/Kalimba.mp3');
}

byId('fileloader').onchange = function () {
    load(URL.createObjectURL(this.files[0]));
}