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
  

const renderer = new Renderer();
renderer.start();