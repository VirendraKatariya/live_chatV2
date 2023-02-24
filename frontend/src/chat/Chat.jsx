import React, { useEffect, useState } from "react";
import ChannelList from "./ChannelList";
import MessagesPanel from "./MessagesPanel";
import socketClient from "socket.io-client";
const SERVER = "http://192.168.1.16:8080";

const Chat = () => {
	const [channels, setChannels] = useState([
		{
			name: "Global chat",
			participants: 0,
			id: 1,
			sockets: [],
		},
		{
			name: "Funny",
			participants: 0,
			id: 2,
			sockets: [],
		},
	]);
	const [socket, setSocket] = useState(null);
	const [channel, setChannel] = useState(null);
	const [_, setCount] = useState(0);

	useEffect(() => {
		loadChannels();
		configureSocket();
	}, []);

	const configureSocket = () => {
		let socket = socketClient(SERVER);
		socket.on("connection", () => {
			if (channel) {
				handleChannelSelect(channel.id);
			}
		});
		socket.on("channel", (channel) => {
			let newChannels = channels;
			newChannels?.forEach((c) => {
				if (c.id === channel.id) {
					c.participants = channel.participants;
				}
			});

			setChannels(newChannels);
		});

		socket.on("message", (message) => {
			let newChannels = channels;
			let cnl;
			newChannels?.forEach((c) => {
				if (c.id === message.channel_id) {
					if (!c.messages) {
						c["messages"] = [message];
					} else {
						let check = c.messages?.some((item) => {
							return item?.id == message?.id;
						});
						if (!check) {
							c["messages"].push(message);
						}
					}
					cnl = c;
				}
			});
			setChannel(cnl);
			setChannels(newChannels);
			setCount((prev) => prev + 1);
		});
		setSocket(socket);
	};

	const loadChannels = async () => {
		fetch("http://192.168.1.16:8080/getChannels").then(async (response) => {
			let data = await response.json();
			setChannels(data.channels);
		});
	};

	const handleChannelSelect = (id) => {
		let channel = channels?.find((c) => {
			return c.id === id;
		});

		setChannel(channel);
		socket.emit("channel-join", id, (ack) => {});
	};

	const handleSendMessage = (channel_id, text) => {
		console.log(socket);
		socket.emit("send-message", {
			channel_id,
			text,
			senderName: socket.id,
			id: Date.now(),
		});
	};

	return (
		<div className="chat-app">
			<ChannelList
				channels={channels}
				onSelectChannel={handleChannelSelect}
			/>
			<MessagesPanel
				onSendMessage={handleSendMessage}
				channel={channel}
			/>
		</div>
	);
};

export default Chat;
