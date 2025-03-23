// Types
import type { GameState, GameActions } from "@/types/global";

// Libraries
import { View } from "react-native";
import { useState } from "react";

// Components
import Boundaries from "@/components/Game/Boundaries";
import Message from "@/components/Game/Message";
import Movement from "@/components/Game/Movement";

export default function Game() {
	const [state, setState] = useState<GameState>("instructions");

	const updateState = (action: GameActions) => {
		switch (action) {
			case "reset":
				setState("instructions");
				break;
			case "orientation":
				if (state === "instructions") setState("ready");
				if (state === "paused") setState("ready");
				break;
			case "badOrientation":
				if (state === "ready") setState("instructions");
				if (state === "playing") setState("paused");
				break;
			case "playing":
				setState("playing");
				break;
			case "pause":
				setState("paused");
				break;
			case "win":
				alert("You win!");
				setState("win");
				console.log("move to next level");
				break;
			case "lose":
				alert("You lose!");
				setState("instructions");

				break;
		}
	};

	return (
		<View>
			<Message state={state} />
			<Movement state={state} updateState={updateState} />
		</View>
	);
}
