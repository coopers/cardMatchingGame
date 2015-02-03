function View() {
    this.humanScore = document.querySelector(".humanscore")
    this.computerScore = document.querySelector(".computerscore")
    this.humanCards = document.querySelector(".humancards")
    this.computerCards = document.querySelector(".computercards")
    this.cardTable = document.querySelector(".cardtable")
    this.cards = document.querySelectorAll(".card")
}

View.prototype = {
    dealCards: function(cards) {
        for (card in cards) {
            this.dealCard(card)
        }
    },

    dealCard: function(cardIndex) {
        var newCard = document.createElement("div");
        newCard.classList.add("card")
        newCard.dataset.index = cardIndex
        this.cardTable.appendChild(newCard)
    },

    displayCard: function(index, card) {
        var image = this.returnImage(card)
        var card = this.cards[index]
        card.style.backgroundImage="url(" + image + ")";
        card.style.backgroundRepeat="no-repeat"
    },

    returnImage: function(card) {
        var image = "images/cards_png/" + card.suit + card.value +".png"
        return image
    },

    displayNoMatch: function(indexes) {
        for (i=0; i<2; i++) {
            var index = indexes[i]
            var card = this.cards[index]
            card.removeAttribute("style");
        }
    },

    displayScore: function(score) {
        this.humanScore.innerHTML = "<h3>Human: " + score[0].toString() + "</h3>"
        this.computerScore.innerHTML = "<h3>Computer: " + score[1].toString() + "</h3>"
    },

    displayMatch: function(player, indexes) {
        for (i=0; i<2; i++) {
            var index = indexes[i]
            var card = this.cards[index]
            this.putBlankSpotOnBoard(index)
            var location = this.getPlayerCards(player)
            var style = this.getCardStyle(player)
            card.classList.add(style)
            location.appendChild(card)
        }
    },

    getPlayerCards: function(player) {
        if (player === "human") {
            return this.humanCards
        } else {
            return this.computerCards
        }
    },

    getCardStyle: function(player) {
        if (player === "human") {
            return "matchedcardhuman"
        } else {
            return "matchedcardcomputer"
        }
    },

    putBlankSpotOnBoard: function(index) {
        var newCard = document.createElement("div");
        newCard.classList.add("blankspot")
        newCard.dataset.index = index
        this.cardTable.insertBefore(newCard, this.cardTable.children[index])
    }
}

