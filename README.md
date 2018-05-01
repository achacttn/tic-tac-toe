Upon click..

1.
- Check coordinates of click event.
- If coordinates are outside <td>, do nothing.
- If coordinates of click event are inside <td>, go to 2.

2.
- Check if that board element is available (exists in boardElements array)
- If it unavailable (does not exist in boardElements array), do nothing.
- If it is available, then assign it to current player (add to their array).

3.
- Once it has been assigned, check win condition
- If win condition has been reached, end the game
- If win condition has not been reached, change player


Bonus
- Win counter (DOM)
- Reset button
- Custom marker
- LocalStorage
- Custom board size (CSS, game logic)
    - 9 by 9
    - game history tab
    - game history slider bar
- Networked multiplayer on firebase
- Unbeatable AI

