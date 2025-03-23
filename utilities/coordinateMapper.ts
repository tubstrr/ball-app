export const mapToOriginalCoordinate = (
	currentValue: number,
	currentBoardWidth: number,
	originalBoardWidth: number,
): number => {
	// Calculate the scaling ratio
	const ratio = originalBoardWidth / currentBoardWidth;

	// Map the current coordinate back to original scale
	return Math.floor(currentValue * ratio);
};

export const mapToCurrentCoordinate = (
	originalValue: number,
	currentBoardWidth: number,
	originalBoardWidth: number,
): number => {
	// Calculate the scaling ratio
	const ratio = currentBoardWidth / originalBoardWidth;

	// Map the original coordinate to current scale
	return Math.floor(originalValue * ratio);
};
