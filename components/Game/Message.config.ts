// Types
import type { GameState } from "@/types/global";

export type MessageProps = {
	state: GameState;
};

export const messages = {
	intro: "Guide the ball to the hole. Can you keep it steady?",
	instructions: "Tilt your phone to control the ball.",
	ready: "Tap to start!",
	playing: "Game on!",
	paused: "Game paused.",
	win: "You win! Play again?",
	lose: "Game over! Try again?",
};
