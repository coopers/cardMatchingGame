window.onload = function() {
    var deck = new Deck(Card)
    var view = new View()
    var game = new Game(deck, view)
    game.dealCards()
    game.bindListeners()
}

function Game(deck, view) {
    this.deck = deck
    this.view = view
    this.selectedCards = []
    this.matchedCards = []
    this.memory = []
    this.turn = "human"
    this.score = [0,0]
}

Game.prototype = {
    dealCards: function() {
        this.deck.dealCards()
        this.view.dealCards(this.deck.cards)
    },

    selectCard: function(e) {
        var index = e.target.dataset.index
        var card = this.deck.cards[index]
        if (this.isSelectable(card) === true) {
            this.view.displayCard(index, card)
            this.addToSelectedCards(card)
            this.checkForSecondCard()
        }
    },

    checkForSecondCard: function() {
        var self = this
        if (this.twoCardsSelected() ) {
            window.setTimeout(self.checkCardsForMatch.bind(self), 2000)
        }
    },

    checkCardsForMatch: function() {
        this.cardsMatch() ? this.playerMatchedCards() : this.playerDidNotMatchCards()
    },

    playerMatchedCards: function() {
        this.view.displayMatch(this.turn, this.cardIndexes(this.selectedCards))
        this.addPoints()
        this.view.displayScore(this.score)
        this.addMatchedCards()
        this.removeCardsFromMemory()
        this.deselectCards()
        this.goAgain()
    },

    playerDidNotMatchCards: function() {
        this.view.displayNoMatch(this.cardIndexes(this.selectedCards))
        this.addCardsToMemory()
        this.deselectCards()
        this.changeTurns()
    },

    computerSelectCards: function() {
        var self = this
        this.computerFirstSelection()
        window.setTimeout(self.computerSecondSelection.bind(self), 300)
    },

    computerFirstSelection: function() {
        var card = this.findMatchesInMemory()
        card ? this.pickCard(card) : this.pickRandomCard()
    },

    computerSecondSelection: function() {
        var card = this.findSecondCard(this.selectedCards[0])
        card ? this.pickCard(card) : this.pickRandomCard()
    },

    pickCard: function(card) {
        var index = this.cardIndex(card)
        this.view.cards[index].click()
    },

    findMatchesInMemory: function() {
        for (card1 in this.memory) {
            for (card2 in this.memory) {
                if (this.memory[card1] != undefined) {
                    if (this.memory[card2] != undefined) {
                        if (this.memory[card1] != this.memory[card2]) {
                            if (this.memory[card1].value === this.memory[card2].value) {
                                return this.memory[card1]                      
                            }
                        }
                    }
                }
            }
        }
        return false
    },

    findSecondCard: function(card1) {
        for (card2 in this.memory) {
            if (this.memory[card2] != undefined) {
                if (this.memory[card2] != card1) {
                    if (this.memory[card2].value === card1.value) {
                        return this.memory[card2]
                    }
                }
            }
        }
        return false
    },

    pickRandomCard: function() {
        var card = this.computerPickableCards()
        this.pickCard(card)
    },

    computerPickableCards: function() {
        var pickableCards = []
        for (card in this.deck.cards) {
            if (this.doesNotContain(this.selectedCards, this.deck.cards[card])) {
                if (this.doesNotContain(this.matchedCards, this.deck.cards[card])) {
                    if (this.doesNotContain(this.memory, this.deck.cards[card])) {
                        pickableCards.push(this.deck.cards[card])
                    }
                }
            }
        }
        var pickableCard = pickableCards[Math.floor(Math.random()*pickableCards.length)];
        return pickableCard
    },

    cardsMatch: function() {
        return this.selectedCards[0].value === this.selectedCards[1].value
    },

    addMatchedCards: function() {
        for (i = 0; i < this.selectedCards.length; i++) {
            this.matchedCards.push(this.selectedCards[i])
        }
    },

    addPoints: function() {
        this.turn === "human" ? this.score[0]++ : this.score[1]++
    },

    goAgain: function() {
        if (this.turn === "computer") {
            this.computerSelectCards()
        } 
    },

    changeTurns: function() {
        if (this.turn === "computer") {
            this.turn = "human"
        } else {
            this.turn = "computer"
            this.computerSelectCards()
        }
    },

    addToSelectedCards: function(card) {
        this.selectedCards.push(card)
    },

    deselectCards: function() {
        this.selectedCards = []
    },

    noCardsSelected: function() {
        return this.selectedCards.length === 0
    },

    oneCardSelected: function() {
        return this.selectedCards.length === 1
    },

    twoCardsSelected: function() {
        return this.selectedCards.length === 2
    },

    isSelectable: function(card) {
        if (this.doesNotContain(this.selectedCards, card)) {
            if (this.doesNotContain(this.matchedCards, card)) {
                if (this.selectedCards.length < 2) {
                    return true                    
                } 
            }
        }
    },

    doesNotContain: function(collection, card) {
        for (var i = 0; i < collection.length; i++) {
            if (collection[i] === card) {
                return false;
            }
        }
        return true;
    },

    cardIndex: function(currentCard) {
        for (card in this.deck.cards) {
            if (currentCard === this.deck.cards[card]) {
                return card
            }
        }
    },

    cardIndexes: function(collection) {
        var indexes = []
        for (card in collection) {
            indexes.push(this.cardIndex(collection[card]))
        }
        return indexes
    },

    addCardsToMemory: function() {
        for (card in this.selectedCards) {
            this.addCardToMemory(this.selectedCards[card])
        }
    },

    addCardToMemory: function(card) {
        if (this.doesNotContain(this.memory, card)) {
            this.memory.push(card)
        }
    },

    removeCardsFromMemory: function() {
        for (card in this.selectedCards) {
            this.removeCardFromMemory(this.selectedCards[card])
        }
    },

    removeCardFromMemory: function(card) {
        for (var i = 0; i < this.memory.length; i++) {
            if (this.memory[i] === card) {
                delete this.memory[i]
            }
        }
    },

    bindListeners: function() {
        this.view.cards = document.querySelectorAll(".card")
        for (i = 0; i < this.view.cards.length; i++) {
            this.bindListener(this.view.cards[i])
        }
    },

    bindListener: function(card) {
        card.addEventListener('click', this.selectCard.bind(this), false)
    }
}
