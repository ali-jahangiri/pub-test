import * as React from 'react';

import { ThemeProvider } from "styled-components";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import useThemePersist from "../hooks/useThemePersist";
import StyleResetter from "../providers/StyleResetter";
import BaseStyle from "../providers/BaseStyle";
import StoreProvider from "../providers/Store"
import Room from "../screen/Room/Room";
import Setup from "../screen/Setup";
import PodSdkProvider from "../providers/PodSdk";



// setup dayjs for entire app runtime
dayjs.extend(jalaliday);

interface Props {
	token : string;
	threadId : string,
	doctorPhoneNumbers : string, 
	threadDescription : string;
}

function App({ token, threadId, doctorPhoneNumbers, threadDescription } : Props) {
	const [theme] = useThemePersist();

	return (
		<div className="App">
			<StyleResetter />
			<BaseStyle />
			<ThemeProvider theme={theme}>
				<StoreProvider
					token={token}
					doctorPhoneNumbers={doctorPhoneNumbers}
					threadDescription={threadDescription}
					threadId={threadId}
				>
					<PodSdkProvider>
						{/* Screen component hierarchy */}
						<Setup>
							
						</Setup>
					</PodSdkProvider>
				</StoreProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
