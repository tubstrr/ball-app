// Libs
import { StyleSheet, View } from "react-native";

// Components
import Game from "@/components/Game";

export default function App() {
	return (
		<View style={styles.container}>
			<Game />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
});
