"use dom";

// Libraries
import { useCallback, useEffect, useRef, useState } from "react";

type BoundariesProps = {
	ball: {
		width: number;
		height: number;
		position: { x: number; y: number };
	};
	board: { width: number; height: number };
	level: number;
};

const Boundaries = (props: BoundariesProps) => {
	return (
		<div>
			<h1>Hello</h1>
		</div>
	);
};

export default Boundaries;
