import React, { useState, useRef } from "react";
import { useColorScheme, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
// 개발자
import Notice from "../screens/Notice";
import MyWebview from "../components/Webview";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [auth, setAuth] = useState({
    isLogin: false,
    userId: '',
    userAuth: '',
  });

  const EmptyScreen = () => {
    return(
      <View></View>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Join') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          } else if (route.name === 'Login') {
            iconName = focused ? 'log-in' : 'log-in-outline';
          } else if (route.name === 'Mypage') {
            iconName = focused ? 'file-tray-full' : 'file-tray-full-outline';
          } else if (route.name === 'Notice') {
            iconName = focused ? 'notifications' : 'notifications-outline'; 
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 15,
        },
      })}
    >   
      <Tab.Screen 
        name="Home" 
        component={MyWebview} 
        options={{
          title: "홈",
          headerShown: false,
        }}
        initialParams={{
          auth: auth,
          setAuth: setAuth,
          pathUrl: "/",
        }}
      />
      <Tab.Screen 
        name={auth.isLogin ? "Mypage" : "Join"}
        component={EmptyScreen} 
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            
            console.log(e, navigation, route);
            navigation.setOptions({
              tabBarIcon: () =>(<Ionicons name="home" size={20} color='red' />),
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'red',
              tabBarOptions: {
                fontSize: 20,
                activeTintColor: '#e91e63',
                tabBarInactiveTintColor: 'red',
              },


            });
          },
        })}
        options={
          auth.isLogin ? (
            {
              title: "비지니스",
              headerShown: true,
            }
          ) : (
            {
              title: "회원가입",
              headerShown: false,
            }
          )
        }
      />
      <Tab.Screen 
        name={auth.isLogin ? "Notice" : "Login"} 
        component={auth.isLogin ? Notice : MyWebview} 
        options={
          auth.isLogin ? (
            {
              title: "알림함",
              headerShown: true,
            }
          ) : (
            {
              title: "로그인",
              headerShown: false,
            }
          )
        }
        initialParams={{
          auth: auth,
          setAuth: setAuth,
          pathUrl: auth.isLogin 
            ? null
            : "/account/login",
        }}
      />    
    </Tab.Navigator>
  );
}

export default Tabs;