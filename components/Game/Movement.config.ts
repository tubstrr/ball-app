// Types
import type { GameActions, GameState } from "@/types/global";

// Utilities
import { vw } from "@/utilities/viewport";

export type MovementProps = {
	state: GameState;
	updateState: (action: GameActions) => void;
};

const min = 25;
const bVW = vw(8.75);

export const board = {
	width: vw(100),
	height: vw(157),
	origin: {
		width: 350,
		height: 550,
	},
};

// Level 1
export const ball = {
	min: min,
	vw: bVW,
	max: Math.min(min, bVW) / 2,
	start: {
		x: vw(50),
		y: vw(135),
	},
};
// Level 2
// export const ball = {
// 	min: min,
// 	vw: bVW,
// 	max: Math.min(min, bVW) / 2,
// 	start: {
// 		x: vw(50),
// 		y: vw(135),
// 	},
// };
// Level 3
// export const ball = {
// 	min: min,
// 	vw: bVW,
// 	max: Math.min(min, bVW) / 2,
// 	start: {
// 		x: vw(50),
// 		y: vw(135),
// 	},
// };
