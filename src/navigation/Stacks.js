import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ScreenOne = ({ navigation: { navigate }}) => (
	<TouchableOpacity onPress={() => navigate("Two")}>
		<Text>One</Text>
	</TouchableOpacity>
);

const ScreenTwo = ({ navigation: { navigate }}) => (
	<TouchableOpacity onPress={() => navigate("Three")}>
		<Text>Two</Text>
	</TouchableOpacity>
);

const ScreenThree = ({ navigation: { navigate }}) => (
	<TouchableOpacity onPress={() => navigate("Tabs", { screen: 'Mypage' })}>
		<Text>Three</Text>
	</TouchableOpacity>
);

const Stack = createNativeStackNavigator();

const Stacks = () => (
  <Stack.Navigator>
    <Stack.Screen 
			name="One" 
			component={ScreenOne} 
			options={{
				presentation: "modal", 
				animation: "flip"
			}}
		/>
    <Stack.Screen name="Two" component={ScreenTwo} />
    <Stack.Screen 
			name="Three" 
			component={ScreenThree} 
		/>
  </Stack.Navigator>
);

export default Stacks;
