let hitbox = document.querySelector("#hitbox");
let score = 0;
///call this function with 2 arguments in one arguments send a message then in other argument
//send a color like green or red;
function GenerateToastMessage(message, color) {
  let toast_message = document.querySelector("#toast_message");

  toast_message.textContent = message;
  toast_message.style.backgroundColor = color;

  // Show with transition
  toast_message.classList.remove("hidden", "opacity-0", "-translate-y-5");
  toast_message.classList.add("opacity-100", "translate-y-0");

  // Hide after 2s
  setTimeout(() => {
    toast_message.classList.remove("opacity-100", "translate-y-0");
    toast_message.classList.add("opacity-0", "-translate-y-5");

    // fully hide after transition (300ms)
    setTimeout(() => {
      toast_message.classList.add("hidden");
    }, 300);
  },  1000);
}
  
function getBubbleCount() {
  if (window.innerWidth < 640) { 
    // mobile screens
    return 54; 
  } else if (window.innerWidth < 1024) {
    // tablet / medium screens
    return 72;
  } else {
    // large screens
    return 96;
  }
}


///this function will return random number between 1 to 100;
function generateRandomNumber(){
  let random = Math.random()*10;
  let random_number = Math.floor(random);
  return random_number;

}
generateRandomNumber();

///add bubbles and random number in the bubbles which is in the play-area;
function addBubblesAndRnumbers(bubble_length){  
let bubble_area = document.querySelector("#bubble-area");
bubble_area.innerHTML = ``;
for(let i =0; i<bubble_length;i++){
  bubble_area.innerHTML += `<div class="h-16 w-16 bg-zinc-500 hover:bg-zinc-800 focus-visible:bg-zinc-800 transition  bubble rounded-full flex justify-center items-center text-2xl font-bold  text-white">
            10
          </div>`;
}
let rnumber = generateRandomNumber();
hitbox.innerHTML=`${rnumber}`;
//.........................................................................................
let bubbles = document.querySelectorAll('.bubble');
bubbles.forEach(bubble =>{
  let r_Number = generateRandomNumber();
  bubble.innerHTML = `${r_Number}`;
})
}
function ScoreMaintain(ismatched){
let scorebox = document.querySelector('#scorebox');
if(ismatched){
score++;
scorebox.innerHTML = score;
}else{
  score--;
  scorebox.innerHTML = score;
}
}
//this function will start the timer:
function startTimer(){
  let time = 60;
  let timer = setInterval(() => {
  let timerbox = document.querySelector("#timerbox");
  timerbox.innerHTML = `${time}`;
  time--;
  if(time<0){
  clearInterval(timer);
  let start_window = document.querySelector("#startwindow");
  start_window.style.display = 'block';
  start_window.innerHTML=` <div class="flex mt-20 flex-col items-center justify-center" >
          <h1 class="text-3xl text-emerald-700 font-semibold ">your score : <span class="border-2 
           rounded px-5 mb-5 bg-zinc-200">${score}</span> </h1>
          <button onclick="Restart()"  id="restart"  class="px-5 py-2 text-2xl font-semibold bg-yellow-400 text-white hover:bg-amber-600
           rounded-3xl mt-10">restart the Game</button>
        </div>
      </div>`;

  }
  
}, 1000);
}
function StartTheGame(){
let start_window = document.querySelector("#startwindow");
let start_button = document.querySelector("#start");
let play_area = document.querySelector("#play_area");
start_button.addEventListener('click',function(){
start_window.style.display = 'none';
addBubblesAndRnumbers(getBubbleCount());
startTimer();
})
}
function Restart(){
 let start_window = document.querySelector("#startwindow");
start_window.style.display = 'none';
addBubblesAndRnumbers(96);
startTimer();
score=0;
scorebox.innerHTML = 0;
}
StartTheGame();
const bubbleChecker = (hit_value,bubble_value,bubble) =>{
if(hit_value===bubble_value){
  bubble.remove();  
  let bubble_quantity = bubble_area.children.length;
  ScoreMaintain(true);
  generateRandomNumber();
  addBubblesAndRnumbers(bubble_quantity);
  GenerateToastMessage('+1 correct','green');
  
}
if(hit_value!==bubble_value){
ScoreMaintain(false);
let bubble_quantity = bubble_area.children.length;
generateRandomNumber();
addBubblesAndRnumbers(bubble_quantity);
GenerateToastMessage('-1 incorrect','red');

}
}
let bubble_area = document.querySelector("#bubble-area");
bubble_area.addEventListener('click', function(dets){
   let bubble_element = dets.target;
   let bubble_num = Number(dets.target.textContent);
   let hitbox_num = Number(hitbox.textContent);

   // check if they are valid numbers
   if(bubble_element && !isNaN(hitbox_num) && !isNaN(bubble_num)){
     bubbleChecker(hitbox_num, bubble_num, bubble_element);
   }
});

