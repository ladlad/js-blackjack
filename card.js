class Card {
	constructor(value, suit) {
		this.value = value;
		this.suit = suit;
	}

	getValue(){
		if(this.value > 10)
			return 10;
		else
			return this.value;
	}
	
	getSuit(){
		return this.suit;
	}

	getImgSrc(){
		if(this.suit === 0)
			return "Images//Spades/"+this.value+".png";
		else if(this.suit === 1)
			return "Images/Hearts/"+this.value+".png";
		else if(this.suit === 2)
			return "Images//Clubs/"+this.value+".png";
		else
			return "Images/Diamonds/"+this.value+".png";
	}
}

class Deck {
	
	constructor() {
		var c = 0;
		this.deck = new Array(52);
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 13; j++) {
				this.deck[c] = new Card(j+1, i);
				c++;
			}
		}
		this.shuffle();

	}
	
	shuffle() {
		for (var i = 51; i > 0; i--) {
			var r = Math.floor((i+1)*Math.random(i));
			var temp = this.deck[r];
			this.deck[r] = this.deck[i];
			this.deck[i] = temp;
		}
	}

	drawCard()
	{
		return this.deck.shift();
	}

}