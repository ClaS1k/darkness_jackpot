var jackpot_sum_last=0;
var last_symbols=["?", "?", "?", "?", "?", "?"];
var margins=['-130px', '-110px', '-90px', '-60px', '-35px', '0px'];
var id_list=['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
var money_elems_num=5;

window.onload=function(){
    setInterval(update_summa, 2000);
}

function update_summa(){

let xhr = new XMLHttpRequest();
xhr.open('GET', 'update_sum.php', true);
xhr.send();

/*let now=new Date();
let hrs=now.getHours();
let mins=now.getMinutes();

if(hrs>20){
    document.location="http://escdarkness.ru/jackpot/winner";
}*/

xhr.onload=function(){
    let jackpot_sum=xhr.responseText;
    if (jackpot_sum!=jackpot_sum_last){
        let sum_helper=jackpot_sum;
        
        while(sum_helper.length<6){
            sum_helper=" "+sum_helper;
            money_elems_num--;
        }
        
        for(let init=0; init<6; init++){
            document.getElementById(id_list[init]).style.marginLeft=margins[money_elems_num];
        }
        
        
        if(last_symbols[0]!=sum_helper[0]){
            var container = document.getElementById('first');
            updateNumber(container, sum_helper[0]);
            last_symbols[0]=sum_helper[0];
        }
        if(last_symbols[1]!=sum_helper[1]){
            var container = document.getElementById('second');
            updateNumber(container, sum_helper[1]);
            last_symbols[1]=sum_helper[1];
        }
        if(last_symbols[2]!=sum_helper[2]){
            var container = document.getElementById('third');
            updateNumber(container, sum_helper[2]);
            last_symbols[2]=sum_helper[2];
        }
        if(last_symbols[3]!=sum_helper[3]){
            var container = document.getElementById('fourth');
            updateNumber(container, sum_helper[3]);
            last_symbols[3]=sum_helper[3];
        }
        if(last_symbols[4]!=sum_helper[4]){
            var container = document.getElementById('fifth');
            updateNumber(container, sum_helper[4]);
            last_symbols[4]=sum_helper[4];
        }
        if(last_symbols[5]!=sum_helper[5]){
            var container = document.getElementById('sixth');
            updateNumber(container, sum_helper[5]);
            last_symbols[5]=sum_helper[5];
        }
        jackpot_sum_last=jackpot_sum;
        money_elems_num=6;
    }
}
}


function win(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'update_winner.php', false);
    xhr.send();
    if (xhr.status != 200) {
      alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
      let jackpot_sum=xhr.responseText;
      let k=document.getElementsByClassName('jackpot_header');
      k[0].innerHTML="Джекпот получает "+jackpot_sum;
    }

}


var hoursContainer = document.querySelector('.hours')
var minutesContainer = document.querySelector('.minutes')
var secondsContainer = document.querySelector('.seconds')

function updateNumber (element, number) {
  element.lastElementChild.textContent = number
  var second = element.lastElementChild.cloneNode(true)
  second.textContent = number
  
  element.appendChild(second)
  element.classList.add('move')

  setTimeout(function () {
    element.classList.remove('move')
  }, 990)
  setTimeout(function () {
    element.removeChild(element.firstElementChild)
  }, 990)
}

