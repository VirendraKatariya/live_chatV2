import React from "react";

const Channel = ({ key, id, name, participants, onClick }) => {
	const click = () => {
		onClick(id);
	};
	return (
		<div className="channel-item" onClick={click}>
			<div>{name}</div>
			<span>{participants}</span>
		</div>
	);
};

export default Channel;
