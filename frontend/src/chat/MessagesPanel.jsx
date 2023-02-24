import React, { useState } from "react";
import Message from "./Message";

const MessagesPanel = ({ onSendMessage, channel }) => {
	const [input_value, setInput_value] = useState("");
	const send = () => {
		if (input_value && input_value != "") {
			onSendMessage(channel.id, input_value);
			setInput_value("");
		}
	};

	const handleInput = (e) => {
		setInput_value(e.target.value);
	};

	let list = (
		<div className="no-content-message">There is no messages to show</div>
	);
	if (channel && channel?.messages) {
		list = channel?.messages?.map((m) => {
			return (
				<Message
					key={m?.id}
					id={m?.id}
					senderName={m?.senderName}
					text={m?.text}
				/>
			);
		});
	}
	return (
		<div className="messages-panel">
			<div className="meesages-list">{list}</div>
			{channel && (
				<div className="messages-input">
					<input
						type="text"
						onChange={handleInput}
						value={input_value}
					/>
					<button onClick={send}>Send</button>
				</div>
			)}
		</div>
	);
};

export default MessagesPanel;
