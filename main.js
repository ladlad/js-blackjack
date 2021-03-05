var playerHand = [];
var dealerHand = [];
var deck;

var bet;
var money = 100;
var gameOn = false;

document.getElementById('bet').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
		newGame();
    }
});
 
function newGame() {
	
	bet = document.getElementById("bet").value;
	
	if(!gameOn && bet <= money && bet > 0)
	{
		money -= bet;
		document.getElementById("money").innerHTML = money+"$"
		resetBoard();

		playerHand.push(deck.drawCard());
		dealerHand.push(deck.drawCard());
		playerHand.push(deck.drawCard());
		dealerHand.push(deck.drawCard());

		document.getElementById("dealerCard1").src = dealerHand[0].getImgSrc();
		document.getElementById("dealerCard2").src = "Images/cardback.png";
	
		document.getElementById("playerCard1").src = playerHand[0].getImgSrc();
		document.getElementById("playerCard2").src = playerHand[1].getImgSrc();

		document.getElementById("message").innerHTML = "You Have "+calcDeckValue(2)+". 	Hit Or Stand??";
	}
	else if(money === 0)
	{
		document.getElementById("message").innerHTML = "You are out of money! Deposit for keep playing!";
	}
}
               
function hit() {
	if(gameOn)
	{
		playerHand.push(deck.drawCard());
		document.getElementById("playerCard"+playerHand.length).src = playerHand[playerHand.length-1].getImgSrc();
	
		document.getElementById("message").innerHTML = "You have "+calcDeckValue(2)+". 	Hit Or Stand?";

		if(calcDeckValue(2) > 21){
			document.getElementById("message").innerHTML = "Sorry Toooo much "+calcDeckValue(2)+". Dealer Wins!";
			document.getElementById("dealerRow").style.color = "Yellow";
			gameOn = false;
			document.getElementById("money").innerHTML = money+" $"
		}
		else if(calcDeckValue(2) === 21)
		{
			document.getElementById("message").innerHTML = "You've got a black jack. You win: " +(bet*2+bet/2);
			money += bet*2+bet/2;
			document.getElementById("money").innerHTML = money+"$";
			gameOn = false;
		}
	}
}

function stand() {
	if(gameOn)
	{
		
		while(calcDeckValue(0) < 17){
			dealerHand.push(deck.drawCard());
			document.getElementById("dealerCard"+dealerHand.length).src = dealerHand[dealerHand.length-1].getImgSrc();
		}
		document.getElementById("dealerCard2").src = dealerHand[1].getImgSrc();
		gameOn = false;

		if(calcDeckValue(0) > 21)
		{
			document.getElementById("message").innerHTML = "Dealer Burnout with "+calcDeckValue(0)+". You win!";
			document.getElementById("PlayerRow").style.color = "Yellow";
			money += bet*2;
			document.getElementById("money").innerHTML = money+"$"
		}
		else if(calcDeckValue(0) >= calcDeckValue(2))
		{
			document.getElementById("message").innerHTML = "Dealer Win with "+calcDeckValue(0)+" while you got "
				+calcDeckValue(2) + ".";	
				document.getElementById("dealerRow").style.color = "Yellow";
				document.getElementById("money").innerHTML = money+"$"
		}
		else
		{
			document.getElementById("message").innerHTML = "You win with "+calcDeckValue(2)+" while dealer got "
				+calcDeckValue(0) + ".";
				document.getElementById("PlayerRow").style.color = "Yellow";
				money += bet*2;
				document.getElementById("money").innerHTML = money+"$"
		}
			
	}
}

function calcDeckValue(p){
	var sum = 0;
	if(p === 0) // dealer
	{
		for(var i = 0;i < dealerHand.length;i++)
		{
			let cardValue = dealerHand[i].getValue();
			if( cardValue ==  1 ){
				// TODO deal with Ase options
			}
			sum += dealerHand[i].getValue();
		}
		return sum;
	}
	else // player
	{
		for(var i = 0;i < playerHand.length;i++)
		{
			sum += 	playerHand[i].getValue();
		}
		return sum;
	}
}

function resetBoard(){
	gameOn = true;
	deck = new Deck();
	playerHand = [];
	dealerHand = [];

	document.getElementById("PlayerRow").style.color = "black";
	document.getElementById("dealerRow").style.color = "black";


	document.getElementById("dealerCard1").src = "Images/cardback.png";
	document.getElementById("dealerCard2").src = "Images/cardback.png";
	document.getElementById("dealerCard3").src = "Images/emptyCard.png";
	document.getElementById("dealerCard4").src = "Images/emptyCard.png";
	document.getElementById("dealerCard5").src = "Images/emptyCard.png";

	document.getElementById("playerCard1").src = "Images/cardback.png";
	document.getElementById("playerCard2").src = "Images/cardback.png";
	document.getElementById("playerCard3").src = "Images/emptyCard.png";
	document.getElementById("playerCard4").src = "Images/emptyCard.png";
	document.getElementById("playerCard5").src = "Images/emptyCard.png";

}
