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