# cardMatchingGame
Instructions:
We’re looking for two hours of your best work in implementing a solution for the exercise below. Feel free to use what you most feel comfortable with.

Part 1:
Build an interactive application that let’s a single player match sets of 2 cards in a matching game.
Requirements:

The game consists of a regular 52 card deck
To start a game, the cards are randomly shuffled and placed on a game board

A user can:
turn cards over
choose 2 cards per “turn” from the board
if the card values match (ignoring suit), the cards are removed from the game board
if not, cards are returned to the game board in their previous positions
view successfully matched pairs of cards
can count how many matched pairs they have found

Other requirements
The cards on the board maintain their initial location on the board when other cards are removed
Game completes when all pairs have been found

Part 2:
Integrate a 2 player turn based system with a “computer” player.
Requirements:
The game can distinguish between the turns of two players
The game keeps a count of the matched pairs for each player
A single user’s turn may continue if they successfully match a pair
The computer can:
select cards from the board
“remember” the values of cards that have previously turned over
choose cards off the board based upon it’s knowledge of the board
