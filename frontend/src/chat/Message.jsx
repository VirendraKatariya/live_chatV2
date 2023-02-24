import React from "react";

const Message = ({ key, id, senderName, text }) => {
	return (
		<div key={key} className="message-item">
			<div>
				<b>{senderName}</b>
			</div>
			<span>{text}</span>
		</div>
	);
};

export default Message;
