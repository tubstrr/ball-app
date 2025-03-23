// Libraries
import { Text } from "react-native";

// Config
import type { MessageProps } from "@/components/Game/Message.config";
import { messages } from "@/components/Game/Message.config";

export default function Message(props: MessageProps) {
	return <Text>{messages[props.state]}</Text>;
}
