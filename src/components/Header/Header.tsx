import useStore from "../../hooks/useStore/useStore";
import Avatar from "../Avatar/Avatar";
import Container from "../Container/Container";
import StyledHeader from "./header.style";

const Header = () => {
	const [store] = useStore();

	return (
		<StyledHeader>
			<Container className="header__container">
				<p className="header__roomTitle">{store.ownerProps.threadDescription}</p>
				<div className="header__avatarContainer">
					<Avatar imageSource={"https://faces-img.xcdn.link/image-lorem-face-6070.jpg"} />
					<Avatar imageSource={"https://faces-img.xcdn.link/image-lorem-face-3547.jpg"} />
					<Avatar imageSource={"https://faces-img.xcdn.link/image-lorem-face-53.jpg"} />
					<Avatar imageSource={"https://faces-img.xcdn.link/image-lorem-face-6463.jpg"} />
				</div>
			</Container>
		</StyledHeader>
	);
};

export default Header;
