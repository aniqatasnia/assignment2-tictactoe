"use strict";

let app = {};

app.data = {
    data() {
        return {
            testMessage: "Vue is working!",  // Test message to ensure Vue is loaded
            board: Array(9).fill(null),  // 9 cells representing the Tic-Tac-Toe grid
            currentPlayer: 'X',  // X starts first
            winner: null,  // No winner initially
            winningCombination: []  // Store winning combination indices
        };
    },
    methods: {
        // Make a move when a player clicks a button
        makeMove(index) {
            // Prevent moves if the game is already won or the cell is not empty
            if (!this.board[index] && !this.winner) {
                console.log(`Placing ${this.currentPlayer} at position ${index}`);
                
                // Update the board with the current player's move
                this.board[index] = this.currentPlayer;  
                
                // Log the updated board
                console.log('Updated board:', this.board);

                // Check for a winner after the move
                if (this.checkWinner()) {
                    this.winner = this.currentPlayer;
                    console.log(`Winner detected: ${this.currentPlayer}`);
                } else {
                    // Switch player if no winner yet
                    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                    console.log(`Next player: ${this.currentPlayer}`);
                }
            } else {
                console.log(`Invalid move or game already won at position ${index}`);
            }
        },

        // Check for a winner
        checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
                [0, 4, 8], [2, 4, 6]  // Diagonals
            ];

            for (let combination of winningCombinations) {
                const [a, b, c] = combination;
                if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                    this.winningCombination = combination;
                    console.log(`Winning combination: ${combination}`);
                    return true;  // We found a winner
                }
            }
            return false;  // No winner yet
        },

        // Reset the game
        resetGame() {
            console.log("Resetting the game...");
            this.board = Array(9).fill(null);  // Reset the board
            this.winner = null;  // Clear the winner
            this.winningCombination = [];  // Clear the winning combination
            this.currentPlayer = 'X';  // Reset to X starting
            console.log('Game has been reset.');
        }
    }
};

Vue.createApp(app.data).mount('#app');
