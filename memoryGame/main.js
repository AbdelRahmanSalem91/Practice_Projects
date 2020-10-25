// splash screen function
document.querySelector('.splash-screen span').onclick = function(){
    let gamerName = prompt("What's you Name?");

    if(gamerName == null || gamerName == ''){
        document.querySelector(".info-container .name span").innerText = "Unknown";
    }else{
        document.querySelector(".info-container .name span").innerText = gamerName;
    }

    document.querySelector('.splash-screen').classList.add('splash-go');
    setTimeout(() => {
    document.querySelector('.splash-screen').remove()}, 500);
    
    let seconds = 12,
    timerDiv = document.getElementById('timer'),

countDown = setInterval(function(){
    timerDown();
},1000)

function timerDown(){
    let minutes = Math.floor(seconds / 60),
        remSeconds = seconds % 60;

    if(remSeconds < 10){
        remSeconds = "0" + remSeconds;
    }

    if(minutes < 10){
        minutes = "0" + minutes;
    }

    timerDiv.innerText = "Timer: " + minutes + ":" + remSeconds;

    if(seconds > 0){
        seconds -= 1;
    }else{
        clearInterval(countDown);
        timerDiv.innerText = "Time Out"
    }

  
}

}



// getting Selectors

let blocksContainer = document.querySelector('.memory-game-blocks'),
blocks = Array.from(document.querySelectorAll('.memory-game-blocks .game-block')),
randomOrderArray = [...Array(blocks.length).keys()],
duration = 500;

// Functions

shuffle(randomOrderArray)
blocks.forEach((block, index) => {
    block.style.order = randomOrderArray[index];
    block.addEventListener("click", () =>{
    flipBlocks(block);
    });
});

function flipBlocks(flipBlock){
    flipBlock.classList.add("flipped");

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("flipped"));

    if(allFlippedBlocks.length === 2){
        stopClicking();
        blockCheck(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

function shuffle(array){

    let current = array.length,
        temp,
        random;

    while(current > 0){
        random = Math.floor(Math.random() * current);
        current --;

        temp     = array[current];
        array[current]  = array[random];
        array[random]   = temp;
    }
    return array;
}

function stopClicking(){
    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    }, duration)
}

function blockCheck(flippedBlockOne, flippedBlockTwo){
    if(flippedBlockOne.dataset.technology === flippedBlockTwo.dataset.technology){
        flippedBlockOne.classList.remove('flipped');
        flippedBlockTwo.classList.remove('flipped');

        flippedBlockOne.classList.add('matched');
        flippedBlockTwo.classList.add('matched');

        document.getElementById('success').play();
    }else{
        let triesCount = document.querySelector('.info-container .counter');

        triesCount.innerText = parseInt(triesCount.innerText) + 1; 

        setTimeout(() =>{
        flippedBlockOne.classList.remove('flipped');
        flippedBlockTwo.classList.remove('flipped');
        }, duration)

        document.getElementById('fail').play();
    }

    
}
