
window.onload = function load(){

var start_btn = document.getElementById("start");
var game_info=document.getElementById("game_info");
var level_select =  document.getElementById("level_select");
var img_link= "https://illustoon.com/photo/1947.png";
var selections_made_span = document.getElementById("selections_made");
var time_span = document.getElementById("time");
var highscore_span = document.getElementById("high_score");
var time1_span = document.getElementById("time1");
var selections_made , highscore ,time1;
var cards=[];
var cards_num;

var i;
var nums_array=[];
var colors_array =["red","red","yellow","yellow","green","green", "blue","blue","orange","orange","DeepPink","DeepPink","cyan","cyan","black","black","navy","navy","white","white","gray","gray","brown","brown","lightblue","lightblue","MediumSeaGreen","MediumSeaGreen"];
var levels_arr=[16,20,24];
var selected_level;
var generated_colors=[];
for ( i=1;i<=levels_arr[levels_arr.length-1];i++){
    cards.push(document.getElementById("card_" + i));
    cards[i-1].style.display="none";
}
start_btn.addEventListener("click",produce_colors);
level_select.addEventListener("change",function(){
    if(in_game){
        produce_colors ();
    }
});

var time_var;
var secs = 0;
var mins= 0;
var game_time_var;
var colors_shown;
var in_game;
var drawn_cards;
var first_card;
var second_card;
var checked_cards;
highscore = [0,0,0];
time1 = ["00:00","00:00","00:00"];
level_select.selectedIndex="1";
initialize();

function initialize(){

    card_numbers();
    nums_array=[];
    colors_shown=[];
    in_game=false;
    checked_cards=[];
    drawn_cards=0;
    start_btn.innerHTML="Start";
    game_info.innerHTML="";
    game_info.style.display="none";
    start_btn.disabled=false;      
    level_select.disabled = false; 
    document.getElementById("score_section").style.display = "none";
    
    for (i=0;i<=cards_num-1;i++){
        cards[i].style.backgroundImage="url("+img_link +")";
        cards[i].style.backgroundColor="#116370";
        cards[i].style.boxShadow="inset 0 0 5px #000000";
    }
    
}
function card_numbers(){
    for(i=0;i<=levels_arr[levels_arr.length-1]-1;i++){
        cards[i].style.display="none";
    }
        cards_num=levels_arr[level_select.value-1];
    for (i=0;i<= cards_num-1;i++){
        cards[i].style.display="inline-block";
    }
    
}
function produce_colors(){
   selected_level = level_select.value-1;
   highscore_span.innerHTML= highscore[selected_level];
   time1_span.innerHTML=time1[selected_level]; 
   document.getElementById("score_section").style.display="inline-block";
    selections_made=0;
    selections_made_span.innerHTML = selections_made;
    card_numbers();
    checked_cards=[];
    colors_shown=[];
    nums_array=[];
    drawn_cards=0;
    in_game=true;
    clearInterval(game_time_var);
    secs = 0;
    time_span.innerHTML = "00:00";
    clearTimeout(time_var);

    for (i=0;i<= cards_num-1;i++){
    cards[i].style.backgroundImage="url('')";
    cards[i].style.boxShadow="inset 0 0 5px #000000";
    var number;
    
    while ( nums_array.indexOf( number )  > -1){
    number = Math.floor((Math.random() * (cards_num)));
    }
    nums_array.push(number);
    }
    
    for(i=0;i<=cards_num-1;i++){
        if (nums_array.indexOf(i) == -1){
        nums_array[0]=i;
        }else{
        }
    }

    for (i=0;i<=cards_num-1;i++){
        generated_colors[i]=colors_array[nums_array[i]];
        cards[i].style.backgroundColor=generated_colors[i];
        colors_shown.push(1);
    }
    start_btn.innerHTML="Restart";
    game_info.innerHTML="";
    start_btn.disabled=true;
    level_select.disabled = true;
    time_var = setTimeout(hide_colors,5000);
    time_var = setTimeout(game_time,5000);
}

function hide_colors(){
    for (i=0;i<= cards_num-1;i++){
        if(checked_cards.indexOf(i)==-1){
            cards[i].style.backgroundImage="url("+img_link +")";
            cards[i].style.backgroundColor="lightblue";
            colors_shown[i]=0;
        }else{
        cards[i].style.backgroundColor="lightblue";
        cards[i].style.boxShadow="0 0 0 black";
        }
    }
    if(checked_cards.length==cards_num){
    clearInterval(game_time_var );
        game_info.style.display="block";
        alert('"Congratulations,you successfully completed!!')
       
      if((highscore[selected_level] == 0 )|| (highscore[selected_level] > selections_made)){
          highscore[selected_level] = selections_made;
          highscore_span.innerHTML = highscore[selected_level];
          time1[selected_level] = time_span .innerHTML ;
          time1_span.innerHTML = time1[selected_level] ;
      }
    setTimeout(function(){ initialize();},5000);
    }
    start_btn.disabled=false;
    level_select .disabled= false;
}


for (i=0;i<= levels_arr[levels_arr.length-1]-1;i++){  
    cards[i].addEventListener('click', function(wrap) { 
        return function() { test(wrap);} ;
        }(i)
    ); 
}




  function game_time(){
    
    game_time_var = setInterval(function(){
        secs++;
        writeTime(secs);
    },1000)
   }
    function writeTime(secs){
        mins = Math.floor(secs/60);
        secs = secs-(mins*60);
        if (mins < 10){
            mins="0"+mins
        }
        if (secs < 10){
            secs="0"+secs
        }
        time_span.innerHTML = mins + ":" + secs;
    }
    
    
    
function test(i){
    if (in_game==true){
        if (colors_shown[i]==0){
        selections_made++;
        selections_made_span.innerHTML = selections_made ;
            if (drawn_cards==0){
                hide_colors();
                clearTimeout(time_var);   
                 cards[i].style.backgroundImage="url('')";
                cards[i].style.backgroundColor=generated_colors[i];
                drawn_cards=1;
                colors_shown[i]=1;
                first_card=i;
            }else{
                cards[i].style.backgroundImage="url('')";
                cards[i].style.backgroundColor=generated_colors[i];
                colors_shown[i]=1;
                drawn_cards=0;
                second_card=i;
                if(generated_colors[first_card]==generated_colors[second_card]){
                    checked_cards.push(first_card);
                    checked_cards.push(second_card);
                }
                time_var = setTimeout(hide_colors,500);
            }
        }
    }
}


};