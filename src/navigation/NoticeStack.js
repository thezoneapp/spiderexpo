import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from "styled-components/native";

import { BLACK_COLOR } from "../styles/theme";

const ScreenNotice = ({ navigation: { navigate }}) => (
	<TouchableOpacity onPress={() => navigate("Detail")}>
		<Text>Go Detail Page</Text>
	</TouchableOpacity>
);

const ScreenDetail = ({ navigation: { goBack }}) => (
	<TouchableOpacity onPress={() => goBack()}>
		<Text>알림함 : 상세페이지</Text>
	</TouchableOpacity>
);

const Stack = createNativeStackNavigator();

const NoticeStacks = () => (
  <Stack.Navigator screenOptions={{ 
		headerBackTitleVisible: false,
		headerTintColor: BLACK_COLOR,
	}}>
    <Stack.Screen 
			name="Notice" 
			component={ScreenNotice} 
			options={{
				title: "알림함"
			}}
		/>

    <Stack.Screen 
			name="Detail" 
			component={ScreenDetail}
			options={{
				title: "알림함"
			}}
		/>
  </Stack.Navigator>
);

export default NoticeStacks;
