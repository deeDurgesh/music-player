const player = document.getElementById('audio_player');
const dialedNumber = document.getElementById("dialed_number");

function previous() {
    console.log("previous");
}
function play() {
    player.play();
}
function pause() {
    player.pause();
}
function next() {
    console.log("next");
}
function stop() {
    console.log("stop");
}
function keypadClick(n) {
    n = n.target.innerText;
    if (n !== '*' && n !== '#')
        dialedNumber.innerText = dialedNumber.innerText + n;
}
function dialAction() {
    console.log("dialAction");
}

function backspace() {
    const s = dialedNumber.innerText;
    if (s)
        dialedNumber.innerText = s.substring(0, s.length - 1);
}

const bars = Array.from(document.getElementById('visualization').getElementsByClassName('bar'));
const heights = Array.of(101);

for (let n = 0; n < 101; n++)
    heights[n] = n + `%`;

function render() {
    for (const e of bars)
        e.style.height = heights[Math.floor(Math.random() * 70)];
}

setInterval(render, 500);

render();
