type DeviceEdge = "vertical" | "horizontal";

export const scaleByEdge = (value: number, edge: DeviceEdge) => {
	switch (edge) {
		case "vertical":
			return value * 1.5;
		case "horizontal":
			return value * 1.5;
		default:
			console.error("Invalid edge in scale function at utilities/scale.ts");
	}
};

// export default { scale };
