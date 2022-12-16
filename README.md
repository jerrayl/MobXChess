# MobX Chess
![Chess](https://user-images.githubusercontent.com/1729499/207993671-a573a210-29be-405e-b7ed-dd383d2de77a.jpg)

MobX Chess is a demo of how MobX can be implemented, and showcases the merits of MobX such as having classes or stores seperate from JSX components, avoiding variable-passing, and having a single, consistent state.

Live version of the game:
https://jerrayl.github.io/MobXChess/

## Dependencies

The project was created using npx create-react-app, with the following libraries
- Tailwind CSS
- Typescript
- MobX
- MobX React


### Functionality

- Basic movement for all pieces
- A history of past moves taken
- A display of the pieces that have been captured in the game
- Promotion of pawns to queens

Check, checkmate and other rules such as castling and en passant have not been implemented, but can be easily added to ChessLogic.ts without major change to the architecture.

### MobX Functionality Showcased

- Observables - Observables used in this demo include booleans, nested models and nested stores
- Computeds - The list of captured pieces is calculated on-the-fly using the game history
- ObservableMap - Used to store the board state. The key is a string representing the algebraic notation for the space e.g. 'E5' and the value model containing the piece, and a boolean of whether the space is highlighted
- ObservableArray - Used to store the game history. 
- Mutating Nested components - Promotion is achieved by directly changing the type of the PieceModel
