README:

[game](https://achacttn.github.io/tic-tac-toe/indexV2.html)

- Overview:

Tic-tac-toe is a game where 2 players take turns placing markers on a 3x3 board.
The goal is to get 3 markers in a row, column or diagonal.

Instead of numbering the tic-tac-toe squares in increasing order from left-to-right and top-to-bottom, the numbers from 1 to n^2 can be arranged in such a way that the sum of any row, or column, or diagonal totals to a magic number.

The magic number for a tic-tac-toe board of size nxn is given by n(n^2+1)/2.

This means that tic-tac-toe is analogous to 2 players taking turns to select from a pile, cards which are numbered from 1 to n^2. The winner is the first player who is able to choose precisely n cards from their total choices which sum to the magic number.



- Instructions

Input desired size of board and click play.

Changelog (Friday 11 May 2018)
- Fixed recursive function (victory calculation correctly working)

- Major bugs
    - Win condition bug: 
        - If a combination of k numbers which sum to the magic number can be found, that player is declayed the victor.
        - The current recursive function does not terminate when sub-arrays are of a length not suitable for determining win conditions.
        - The sums of each sub-arrays' elements are the sole metric by which a winner is determined.
        - For this reason, any permutations of a combination that already exists will only increase computation time.


- Wishlist
    - Fix recursive function, possibly add another function to hold arguments which will be fed into the recursive function.

- Features
    - Window
    - tic-ception