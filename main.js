let deckId
let drawCardsBtn = document.getElementById("drawCards")
let thisDrawBtn = drawCardsBtn.style.display = "none"
let resetBtn = document.getElementById("reset-btn")
let thisResetBtn = resetBtn.style.display = "none"
let p1score = 0
let p2score = 0
const card1 = document.getElementById("card-1")
const card2 = document.getElementById("card-2")
const player1 = document.getElementById("player-1")
const player2 = document.getElementById("player-2")
const remainingCards = document.getElementById("remaining-cards")
const whoWins = document.getElementById("who-wins")
const finalWinner = document.getElementById("final-winner") 




document.getElementById("btn").addEventListener("click", handleClick)
async function handleClick(){

    const resp = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await resp.json()
        console.log(data)
        deckId = data.deck_id
        remainingCards.textContent = `Remaining Cards: ${data.remaining}`      
    
    //make an if statement for when this is clicked, we show the draw btn
    if (drawCardsBtn){
        thisDrawBtn = drawCardsBtn.style.display = "inline"
    }

    // if draw btn is visible, hide the new deck btn
    if (drawCardsBtn.style.display = "inline"){
        document.getElementById("btn").style.display = "none"
    }

 }


// draw button event listener
 drawCardsBtn.addEventListener("click", async function(e){

    e.preventDefault

    const resp = await fetch (`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await resp.json()
    
        // console.log(data)
        card1.innerHTML = `<img src = "${data.cards[0].image}"/>` // data.cards is the data of the API | look at console log in the browser 
        card2.innerHTML = `<img src = "${data.cards[1].image}"/>`
        remainingCards.textContent = `Remaining Cards: ${data.remaining}`
            
            
        determineCardWinner(data.cards[0], data.cards[1])

        //if there no cards anymore hide the draw btn && display the final winner
        if(data.remaining === 0 && p1score > p2score){
            thisDrawBtn = drawCardsBtn.style.display = "none" 
            thisResetBtn = resetBtn.style.display = "inline" 
            finalWinner.textContent = "PLAYER 1 IS THE WINNER" 
            whoWins.textContent = " "


        }else if(data.remaining === 0 && p1score < p2score){
            thisDrawBtn = drawCardsBtn.style.display = "none" 
            thisResetBtn = resetBtn.style.display = "inline" 
            finalWinner.textContent = "PLAYER 2 IS THE WINNER"
            whoWins.textContent = " " 


        }  else if (data.remaining === 0 && p1score === p2score){
            thisDrawBtn = drawCardsBtn.style.display = "none" 
            thisResetBtn = resetBtn.style.display = "inline" 
            finalWinner.textContent = "IT'S A DRAW"
            whoWins.textContent = " "
        }
     
    
})


//function for the reset btn
resetBtn.addEventListener("click", function(){
    window.location.reload();
})



// To determine who's the winner
function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    console.log("card 1:", card1ValueIndex)
    console.log("card 2:", card2ValueIndex)

// text to determine who wins
    if(card1ValueIndex > card2ValueIndex){
        whoWins.textContent = `Player 1 wins!`
        p1score++
        player1.textContent = `Player 1: ${p1score}`
    } else if (card1ValueIndex < card2ValueIndex){
        whoWins.textContent = `Player 2 wins!`
        p2score++
        player2.textContent = `Player 2: ${p2score}`
    } else {
        whoWins.textContent = `WAR!`
    }
}



