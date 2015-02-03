function Card(value, suit) {
    this.value = value
    this.suit = suit
}

function Deck(card) {
    this.numCards = 52
    this.suits    = ["d", "h", "s", "c"]
    this.cards    = []
    this.cardType = card
}

Deck.prototype = {
    dealCards: function() {
        this.cards = []
        this.createCards()
        this.shuffle()
    },

    createCards: function() {
        for (suit in this.suits) {
            var suit = this.suits[suit]
            for (value = 1; value < (this.numCards + 1)/this.suits.length; value++) {
                this.createCard(value, suit)
            }
        }
    },

    createCard: function(value, suit) {
        this.cards.push(new this.cardType(value, suit) )
    },

    shuffle: function() {
        var input = this.cards;
        for (var i = input.length-1; i >=0; i--) {
            var randomIndex = Math.floor(Math.random()*(i+1)); 
            var itemAtIndex = input[randomIndex]; 
            input[randomIndex] = input[i]; 
            input[i] = itemAtIndex;
        }
    }
}
