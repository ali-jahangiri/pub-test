import { css } from "styled-components";
import WrapWithStyled from "../../utils/WrapWithStyled";

const StyledRoom = WrapWithStyled("div", theme => ({
	base: css`
		width: 100%;
		height: 100vh;

		& > div {
			height: 96%;
			display: flex;
			flex-direction: column;
		}

		.room {
			&__innerContainer {
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			&__messageInputs {
				width: 100%;
				position: relative;
			}
		}
	`,
}));

export default StyledRoom;
