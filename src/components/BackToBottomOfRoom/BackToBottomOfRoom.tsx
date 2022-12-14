import StyledBackToButtonOfRoom from "./backToBottomOfRoom.style";

const DownIcon = () => (
	<svg viewBox="0 0 24 24" width="512" height="512">
		<path d="M17.087,17h-3.587V1.5c0-.829-.672-1.5-1.5-1.5s-1.5,.671-1.5,1.5v15.5h-3.587c-.811,0-1.218,.994-.644,1.575l5.087,5.154c.356,.36,.932,.36,1.288,0l5.087-5.154c.574-.581,.167-1.575-.644-1.575Z" />
	</svg>
);

const BackToBottomOfRoom = ({ show, onClick }) => (
	<StyledBackToButtonOfRoom id="test" show={show} onClick={onClick}>
		{console.log(show, "show")}
		بازگشت به پایین
		<DownIcon />
	</StyledBackToButtonOfRoom>
);

export default BackToBottomOfRoom;
