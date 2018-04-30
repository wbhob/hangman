import * as alphabet from 'alphabet';
import * as $ from 'jquery';
import * as  randomWords from 'random-words';

let letters: string[] = [];
let threats = 0;
let classes = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
let word: string;
let correctLetters = 0;

$(document).ready(() => {
    generateWord();

    for (let letter of alphabet.upper) {
        let button = document.createElement('button');
        button.innerText = letter;
        button.onclick = function () {
            letters.push(letter);
            (<HTMLButtonElement>this).disabled = true;
            let blanks = $('.blank.' + letter);
            console.log(blanks);

            if (blanks.length > 0) {
                blanks.each(function () {
                    correctLetters++;
                    $(this).css('color', 'black');
                });
            } else {
                addThreat();
            }

            if (correctLetters == word.length) {
                setTimeout(() => {
                    alert('YOU WIN!');
                    reset();
                }, 500)
            }
        }
        $('.keyboard').append(button);
    }
});

function addThreat() {
    let threat: HTMLDivElement = document.querySelector('.' + classes[threats]);
    threat.style.visibility = 'visible';
    if (threats >= classes.length - 1) {
        setTimeout(() => {
            alert('YOU LOSE!');
            reset();
        }, 400);
        return;
    }
    threats++;

}

function generateWord() {
    word = randomWords();
    $(document).ready(() => {
        for (let letter of word) {
            letter = letter.toUpperCase();
            let blank = document.createElement('div');
            blank.classList.add('blank');
            blank.classList.add(letter);
            blank.style.color = 'white';
            blank.innerText = letter;
            $('.blanks').append(blank);
        }
    });
}

async function reset() {
    threats = 0;
    correctLetters = 0;
    letters = [];
    $('.blank').remove();
    $('button').removeAttr('disabled');
    for (let c of classes) {
        $('.' + c).css('visibility', 'hidden');
    }
    await generateWord();
}