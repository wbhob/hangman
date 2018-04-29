import * as alphabet from 'alphabet';
import * as $ from 'jquery';

let letters: string[] = [];
let threats = 0;
let classes = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
let word: string;

$(document).ready(async () => {
    await generateWord();

    for (let letter of alphabet.upper) {
        let button = document.createElement('button');
        button.innerText = letter;
        button.onclick = function () {
            letters.push(letter);
            (<HTMLButtonElement>this).disabled = true;
            let blanks = document.querySelectorAll('.blank.' + letter);
            if (blanks.length > 0) {
                blanks.forEach((el: any) => {
                    el.style.color = 'black';
                });
            } else {
                addThreat();
            }
        }
        $('.keyboard').append(button);
    }
});

function addThreat() {
    let threat: HTMLDivElement = document.querySelector('.' + classes[threats]);
    threat.style.visibility = 'visible';
    if (threats >= classes.length - 1) {
        alert('YOU LOSE!');
        reset();
        return;
    }
    threats++;

}

async function generateWord() {
    let headers = new Headers();
    headers.append('X-Mashape-Key', 'ut0KzXyAVSmsh6regp5PLZ5jofkrp1BtW6cjsnk1MvhbJjR21p')
    headers.append('Accept', 'application/json');
    let word = (await (await fetch('https://wordsapiv1.p.mashape.com/words/?random=true', { headers })).json()).word;
    $(document).ready(() => {
        for (let letter of word) {
            letter = letter.toUpperCase();
            if (letter != ' ') {
                let blank = document.createElement('div');
                blank.classList.add('blank');
                blank.classList.add(letter);
                blank.style.color = 'white';
                blank.innerText = letter;
                $('.blanks').append(blank);
            }

        }
    })
}

async function reset() {
    threats = 0;
    letters = [];
    $('.blank').remove();
    $('button').removeAttr('disabled');
    for (let c of classes) {
        $('.' + c).css('visibility', 'hidden');

    }
    await generateWord();
}