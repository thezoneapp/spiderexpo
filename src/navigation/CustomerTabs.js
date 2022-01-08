import React, { useState, useRef } from "react";
import { useColorScheme, View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
// 개발자
import NoticeScreen from "../screens/Notice";
import MyWebview from "../components/Webview";

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <TabBarWrap >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        let isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          console.log(route.name);
          //if (!isFocused && !event.defaultPrevented) {
            //navigation.navigate(route.name);

            if (route.name !== 'Home' && route.name !== 'Notice') {
              console.log(route.name);
            } else {
              navigation.navigate(route.name);
            }
          //}
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = route.name === 'Home' ? isFocused ? 'home' : 'home-outline'
        : route.name === 'Join' ? isFocused ? 'person-add' : 'person-add-outline'
          : route.name === 'Login' ? isFocused ? 'log-in' : 'log-in-outline'
            : route.name === 'Mypage' ? isFocused ? 'file-tray-full' : 'file-tray-full-outline'
              : route.name === 'Notice' ? isFocused ? 'notifications' : 'notifications-outline'
                : null ;

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View 
              style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
              <Ionicons name={iconName} size={22} color={isFocused ? '#000000' : '#666666'}/>
              <Text style={{ color: isFocused ? '#000000' : '#666666' }}>{options.title}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </TabBarWrap>
  );
}

const Tab = createBottomTabNavigator();

export default function CustomerTabs() {
  const webRef = useRef();

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
      tabBar={(props) => <MyTabBar {...props} />}
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
          webRef: webRef,
          pathUrl: "/" 
        }}
      />
      <Tab.Screen 
        name={auth.isLogin ? "Mypage" : "Join"}
        component={EmptyScreen} 
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            //e.preventDefault();
            console.log(e, navigation);
            navigation.setOptions({
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
              headerShown: false,
            }
          ) : (
            {
              title: "회원가입",
              headerShown: false,
            }
          )
        }
        initialParams={{
          auth: auth,
          setAuth: setAuth,
          webRef: webRef,
          pathUrl: auth.isLogin 
            ? auth.userAuth === "M" || auth.userAuth === "S" ? "/mypage/home" : "/admin/home" 
            : "/account/join"
        }}
      />
      <Tab.Screen 
        name={auth.isLogin ? "Notice" : "Login"} 
        component={auth.isLogin ? NoticeScreen : EmptyScreen} 
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
          webRef: webRef,
          pathUrl: auth.isLogin ? null : "/account/login"
        }}
      />    
    </Tab.Navigator>
  );
}

const TabBarWrap = styled.View`
  flex-direction: row;
  height: 50px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgb(250,250,250),
`;
