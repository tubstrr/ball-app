export type GameState =
	| "intro"
	| "instructions"
	| "ready"
	| "playing"
	| "paused"
	| "win"
	| "lose";

export type GameActions =
	| "orientation"
	| "badOrientation"
	| "playing"
	| "pause"
	| "win"
	| "lose"
	| "reset";
