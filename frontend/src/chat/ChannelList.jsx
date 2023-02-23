import React from "react";
import Channel from "./Channel";

const ChannelList = ({ channels, onSelectChannel }) => {
	const handleClick = (id) => {
		onSelectChannel(id);
	};
	let list = (
		<div className="no-content-message">There is no channels to show</div>
	);
	if (channels && channels.map) {
		list = channels.map((c) => (
			<Channel
				key={c.id}
				id={c.id}
				name={c.name}
				participants={c.participants}
				onClick={handleClick}
			/>
		));
	}
	return <div className="channel-list">{list}</div>;
};

export default ChannelList;
