export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface GameObject {
  position: Point;
  radius: number;
}

export interface Mallet extends GameObject {
  color: string;
}

export interface Puck extends GameObject {
  velocity: Point;
}

export interface GameState {
  playerMallet: Mallet;
  computerMallet: Mallet;
  puck: Puck;
  playerScore: number;
  computerScore: number;
  gameActive: boolean;
}

export interface BoardDimensions {
  width: number;
  height: number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  goalWidth: number;
  centerY: number;
}

export enum Player {
  PLAYER = 'player',
  COMPUTER = 'computer'
} 