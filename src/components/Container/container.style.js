import { css } from "styled-components";
import WrapWithStyled from "../../utils/WrapWithStyled";

const StyledContainer = WrapWithStyled("div", theme => ({
	base: css`
		max-width: 90%;
		margin: 0 auto;

		@media (min-width: 576px) {
			max-width: 540px;
		}

		@media (min-width: 768px) {
			max-width: 720px;
		}

		@media (min-width: 992px) {
			max-width: 960px;
		}

		@media (min-width: 1200px) {
			max-width: 1140px;
		}

		@media (min-width: 1400px) {
			max-width: 1620px;
		}
	`,
}));

export default StyledContainer;
