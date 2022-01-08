import React, { useState } from 'react';
import { Text, Dimensions, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Notice = ({ route }) => {
  const auth = route.params.auth;  
  const setAuth = route.params.setAuth;

	const [state, setState] = useState({
		isLoading: false,
	});

	return state.isLoading ? (
		<Loader>
			<ActivityIndicator 
				animating={true} 
				size="large" 
				style={{ opacity:1 }} 
				color="#666666" 
			/>
		</Loader>
	) : (
		<Container>
			<Text>서비스 준비중입니다!!!</Text>
		</Container>
	);
}

const Loader = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.mainBgColor};
`;

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #fff;
`;

export default Notice;
