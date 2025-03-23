// Types
import type { MovementProps } from "@/components/Game/Movement.config";

// Libraries
import { DeviceMotion } from "expo-sensors";
import type {
	GyroscopeMeasurement,
	DeviceMotionMeasurement,
} from "expo-sensors";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";

// Config Variables
import { ball, board } from "@/components/Game/Movement.config";
import levelHashMap from "@/assets/game/backgrounds/level_1/Map.json";

// Styles
import { colors } from "@/assets/styles/colors";

// Utilities
import { vw } from "@/utilities/viewport";
import {
	mapToOriginalCoordinate,
	mapToCurrentCoordinate,
} from "@/utilities/coordinateMapper";

export default function Movement(props: MovementProps) {
	// Refs
	const backgroundRef = useRef<Image>(null);

	// States
	const [isInPosition, setIsInPosition] = useState(false);
	const [deviceMotionData, setDeviceMotionData] =
		useState<DeviceMotionMeasurement>();
	const [ballPosition, setBallPosition] = useState({
		x: mapToCurrentCoordinate(
			levelHashMap.start.x,
			board.width,
			board.origin.width,
		),
		y: mapToCurrentCoordinate(
			levelHashMap.start.y,
			board.width,
			board.origin.width,
		),
	});

	// Methods
	const start = () => {
		props.updateState("playing");
	};

	const reset = useCallback(
		(hard = true) => {
			setBallPosition({
				x: mapToCurrentCoordinate(
					levelHashMap.start.x,
					board.width,
					board.origin.width,
				),
				y: mapToCurrentCoordinate(
					levelHashMap.start.y,
					board.width,
					board.origin.width,
				),
			});
			if (hard) props.updateState("reset");
		},
		[props.updateState],
	);

	const checkForCollision = useCallback(() => {
		const { columns, win } = levelHashMap;

		// Map the current ball x position to original coordinate space
		const originalX = mapToOriginalCoordinate(
			ballPosition.x,
			board.width,
			board.origin.width,
		);

		const columnName = `${originalX}` as keyof typeof win;

		let isOnGreen = false;
		if (win[columnName]) {
			for (let i = 0; i < win[columnName].length; i++) {
				const value = win[columnName][i];
				const [start, end] = value;

				const originalY = mapToOriginalCoordinate(
					ballPosition.y,
					board.height,
					board.origin.height,
				);

				if (start <= originalY && originalY <= end) {
					console.log("win condition met");
					if (props.state === "playing") props.updateState("win");
					break;
				}
			}
		} else if (columns[columnName]) {
			const column = columns[columnName];
			for (let i = 0; i < column.length; i++) {
				const value = column[i];
				const [start, end] = value;

				const originalY = mapToOriginalCoordinate(
					ballPosition.y,
					board.height,
					board.origin.height,
				);

				if (start <= originalY && originalY <= end) {
					isOnGreen = true;
				} else if (i === column.length - 1 && !isOnGreen) {
					props.updateState("lose");
					reset(false);
				}
			}
		} else {
			props.updateState("lose");
			reset(false);
		}
	}, [ballPosition, props.state, props.updateState, reset]);

	//
	// Effects
	//

	// Setup listeners for device motion
	useEffect(() => {
		if (DeviceMotion) {
			console.log("Device Motion is available");
			DeviceMotion.setUpdateInterval(16);

			DeviceMotion.addListener((deviceMotionData) => {
				setDeviceMotionData(deviceMotionData);
			});
		}
		return () => {
			DeviceMotion.removeAllListeners();
		};
	}, []);

	// Separate effect for device orientation check

	useEffect(() => {
		const isOrientationCorrect =
			deviceMotionData &&
			Math.abs(deviceMotionData?.rotation?.beta) < 0.75 &&
			Math.abs(deviceMotionData?.rotation?.gamma) < 0.75;

		if (isOrientationCorrect) {
			props.updateState("orientation");
		} else {
			props.updateState("badOrientation");
		}

		if (!isInPosition && isOrientationCorrect) {
			setIsInPosition(true);
		} else if (isInPosition && !isOrientationCorrect) {
			setIsInPosition(false);
		}
	}, [deviceMotionData, isInPosition, props]);

	// Separate effect for ball position updates
	useEffect(() => {
		if (isInPosition && props.state === "playing" && deviceMotionData) {
			setBallPosition((prev) => {
				let newX = prev.x;
				let newY = prev.y;

				const speed = 25;

				const gammaMovement = deviceMotionData.rotation.gamma * speed;
				const betaMovement = deviceMotionData.rotation.beta * speed;

				newX = Math.min(prev.x + gammaMovement, board.width);
				newX = Math.max(newX, 0);

				newY = Math.min(prev.y + betaMovement, board.height);
				newY = Math.max(newY, 0);

				return {
					x: newX,
					y: newY,
				};
			});

			// Check collision after position update
			// checkForCollision();
		}
	}, [deviceMotionData, isInPosition, props.state]);

	// Check for collision on ball position update
	useEffect(() => {
		checkForCollision();
	}, [checkForCollision]);

	// Styles
	const styles = StyleSheet.create({
		container: {
			minWidth: 350,
			width: board.width,
			minHeight: 550,
			height: board.height,
			backgroundColor: colors.light[4],
			alignSelf: "center",
		},
		image: {
			position: "absolute",
			width: "100%",
			height: "100%",
		},
		ball: {
			position: "absolute",
			width: ball.vw,
			height: ball.vw,
			minWidth: ball.min,
			minHeight: ball.min,
			backgroundColor: colors.white,
			borderWidth: 3,
			borderRadius: 50,
			borderColor: colors.black,
			top: ballPosition.y,
			left: ballPosition.x,
			transform: [{ translateX: -ball.max }, { translateY: -ball.max }],
		},
		webview: {
			width: vw(100),
			height: vw(100),
		},
	});

	return (
		<View>
			<Pressable style={styles.container} onPress={start}>
				<Image
					ref={backgroundRef}
					style={styles.image}
					source={require("@/assets/game/backgrounds/level_1/level_1.png")}
				/>
				<Image
					style={styles.image}
					source={require("@/assets/game/backgrounds/level_1/Map.png")}
				/>
				<View style={styles.ball} />
			</Pressable>
			<View>
				<Text>{JSON.stringify(props)}</Text>
				<Text>Is In Position? {isInPosition ? "Yes" : "No"}</Text>
				<Pressable onPress={() => reset(true)}>
					<Text>Reset</Text>
				</Pressable>
			</View>
		</View>
	);
}
