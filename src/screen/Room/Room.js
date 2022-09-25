import React from 'react'
import { useRef, useState } from "react";

import BackToBottomOfRoom from "../../components/BackToBottomOfRoom/BackToBottomOfRoom";
import Container from "../../components/Container";
import Header from "../../components/Header/Header";
import MessageList from "../../components/Message/List/MessageList";
import LoadingMoreSpinner from "../../components/Message/LoadingMoreSpinner/LoadingMoreSpinner";
import MessageInput from "../../components/MessageInput/MessageInput";
import SelectedMessageController from "../../components/SelectedMessageController/SelectedMessageController";
import usePodSdk from "../../hooks/usePodSdk/usePodSdk";
import useRoomObserver from "../../hooks/useRoomObserver/useRoomObserver";
import useStore from "../../hooks/useStore/useStore";
import compose from "../../utils/compose";
import date from "../../utils/date";
import selfClearTimeout from "../../utils/selfClearTimeout";

import transformMessageItem, {
	convertDataProperly,
	extractOnlyNeededProperly,
	MessageSchema,
	omitTheAuthorMessageAdding,
} from "../../utils/transformMessageItem";
import StyledRoom from "./room.style";

const Room = () => {
	const [store] = useStore();
	const chatInstance = usePodSdk();

	const [isInFetchingMoreMessage, setIsInFetchingMoreMessage] = useState(false);
	const [selectedMessagesId, setSelectedMessagesId] = useState([]);
	const [messageItems, setMessageItems] = useState(getInitialMessage);
	const [showComeBackToBottomAction, setShowComeBackToBottomAction] = useState(true);
	const [currentMessageOffset, setCurrentMessageOffset] = useState(
		() => store.initialMessageHistory.nextOffset
	);

	const messageListContainerRef = useRef();

	function getInitialMessage() {
		return transformMessageItem(store.initialMessageHistory.history, {
			authorId: store.user.id,
		});
	}

	function addTextMessage(message) {
		const newMessage = new MessageSchema({
			asNew: true,
			type: "text",
			time: date(Date.now()).format("hh:mm"),
			threadId: store.thread.id,
			message,
			source: "author",
			id: Date.now(),
			owner: {
				firstName: "شما",
			},
		});

		setMessageItems(prev => [newMessage, ...prev]);
		selfClearTimeout(scrollToBottomHandler, 250);
	}

	function addEmojiMessage(emojiNameList) {
		console.log(emojiNameList);
	}

	const scrollToBottomHandler = (behavior = "smooth") => {
		if (behavior === "smooth") {
			messageListContainerRef.current.scrollTo({
				left: 0,
				top: messageListContainerRef.current.scrollHeight,
				behavior,
			});
		} else {
			messageListContainerRef.current.scrollTop = messageListContainerRef.current.scrollHeight;
		}
	};

	function onNewMessage({ result }) {
		if (!omitTheAuthorMessageAdding(result.message.participant.id, store.user.id)) {
			const finalIncomingMessage = compose(
				convertDataProperly,
				extractOnlyNeededProperly
			)(result.message);
			setMessageItems(prev => [...prev, finalIncomingMessage]);
			selfClearTimeout(scrollToBottomHandler, 10);
		}
	}

	function onReachToTopOfListContainer() {
		if (!isInFetchingMoreMessage) {
			setIsInFetchingMoreMessage(true);

			chatInstance.getHistory(
				{ threadId: store.thread.id, count: 50, offset: currentMessageOffset },
				({ result }) => {
					console.log(result);
					if (result.hasNext) {
						setMessageItems(prev => [
							...prev,
							...transformMessageItem(result.history, {
								authorId: store.user.id,
							}),
						]);
						setCurrentMessageOffset(result.nextOffset);
						setIsInFetchingMoreMessage(false);
					}
				}
			);
		}
	}

	function addMessageItemToSelectedItemsHandler(targetMessageId) {
		setSelectedMessagesId(prev => [...prev, targetMessageId]);
	}

	function removeMessageItemFromSelectedItemsHandler(targetMessageId) {
		setSelectedMessagesId(prev => prev.filter(messageId => messageId !== targetMessageId));
	}

	function deleteMessagesFromLocalState(messagesId) {}

	function deleteMessagesFromServerHandler() {
		console.log("want to remove", selectedMessagesId);
		if (selectedMessagesId.length === 1) {
			chatInstance.deleteMessage(
				{ messageId: selectedMessagesId[0], deleteForAll: true },
				result => {
					console.log(result);
				}
			);
		} else {
			chatInstance.deleteMultipleMessages(
				{ messageIds: selectedMessagesId, deleteForAll: true },
				result => {
					console.log(result);
				}
			);
		}
	}

	function makeSelectedMessageListEmpty() {
		setSelectedMessagesId([]);
	}

	useRoomObserver({
		listeners: {
			onNewMessage,
		},
		config: {},
	});

	return (
		<StyledRoom>
			<div>
				<Header />
				<LoadingMoreSpinner show={isInFetchingMoreMessage} />
				<MessageList
					threadId={store.thread.id}
					selectedMessagesList={selectedMessagesId}
					items={messageItems}
					containerRef={messageListContainerRef}
					onReachToTop={onReachToTopOfListContainer}
					onReachToBottom={setShowComeBackToBottomAction}
					selectMessageHandler={addMessageItemToSelectedItemsHandler}
					unSelectMessageHandler={removeMessageItemFromSelectedItemsHandler}
				/>
				<Container className="room__messageInputs">
					<BackToBottomOfRoom
						show={!showComeBackToBottomAction && messageItems.length}
						onClick={() => scrollToBottomHandler()}
					/>
					<SelectedMessageController
						onDeleteHandier={deleteMessagesFromServerHandler}
						onCloseHandler={makeSelectedMessageListEmpty}
						selectedMessagesList={selectedMessagesId}
						show={selectedMessagesId.length}
					/>
					<MessageInput
						onEmojiMessageSend={addEmojiMessage}
						onTextMessageSend={addTextMessage}
					/>
				</Container>
			</div>
		</StyledRoom>
	);
};

export default Room;
