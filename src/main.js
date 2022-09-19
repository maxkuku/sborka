import { diffDates, diffToHtml } from "./datecalc.js";
import { formatError, formatSuccess } from "./utils.js"; 
import { tabSwitcher } from "./switch_tabs.js";


/** about calculator */
const dateCalcForm = document.getElementById("datecalc");
const dateCalcResult = document.getElementById("datecalc__result");

dateCalcForm.addEventListener("submit", handleCalcDates);

function handleCalcDates(event) {
    dateCalcResult.innerHTML = "";
    event.preventDefault();

    let { firstDate, secondDate } = event.target.elements;
    firstDate = firstDate.value, secondDate = secondDate.value;

    if (firstDate && secondDate) {
        const diff = diffDates(firstDate, secondDate); // 3
        dateCalcResult.innerHTML = diffToHtml(diff); // 4
    }
    else dateCalcResult.innerHTML = formatError("Для расчета промежутка необходимо заполнить оба поля"); // 5
}


/** about timer */


let sound = new Howl({
    src: './ding-sound-effect_2.mp3'
});
let tick = new Howl({
    src: './tick.mp3'
});


const timerStart = document.getElementById("timerStart");
const timerEnd = document.getElementById("timerEnd");
const timerStopText = document.getElementById("timer__stop");
const howManySecs = document.getElementById("howManySecs");

let cur = 1;

const runTimer = (last) => {


    /*** 1000 sec max */
    if(cur < 1000 && last > 0) { 

        if(cur <= last) { 

            if (cur !== last)
                tick.play();
            

            if (cur === last) {   
                timerStopText.innerHTML = formatSuccess(`Таймер закончился ${last}`);
                clearInterval(window.S);
                sound.play();
            }

            document.getElementById("timer__result").innerHTML = `${cur++}:00`;

            

        } 
        
    }
    else {
        clearInterval(window.S);
        timerStopText.innerHTML = formatError("Максимальное время таймера закончилось или не установлено окончание");
    }

    timerEnd.addEventListener("click", () => { 
        clearInterval(window.S);
        cur = 1;
        document.getElementById("timer__result").innerHTML = '0:00' 
    });


}




timerStart.addEventListener("click", () => { 

    window.S = setInterval(()=>{ 
        runTimer(+howManySecs.value)
    },1000);     

}); 





/** change tabs */

let tabsSpan = document.querySelectorAll('.tabs > div > span');
let tab = document.querySelectorAll('.tab');



tabsSpan.forEach((element, idx) => {
    
    element.addEventListener("click", (ev)=>{ 
         
        tabSwitcher(ev.target, tabsSpan);
        tabSwitcher(document.querySelectorAll('.tab')[idx], tab);
    })
    
});

