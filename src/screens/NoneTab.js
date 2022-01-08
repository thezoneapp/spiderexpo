import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const NoneTab = ({ navigation: { navigate }}) => (
	<TouchableOpacity
		onPress={() => navigate("NoticeStack", { screen: "One" })}
		style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
	>
		<Text>푸터 탭메뉴 없는 스크린</Text>
	</TouchableOpacity>
);

export default NoneTab;