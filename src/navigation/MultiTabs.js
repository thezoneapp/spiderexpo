import 'react-native-gesture-handler';
import React, { useState, useRef } from "react";
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarWrapper, MultiBarButton, MultiBarProvider } from 'react-native-multibar';

// 개발자
import Notice from "../screens/Notice";
import MyWebview from "../components/Webview";
import { TouchIcon } from '../components';
import { BlankScreen } from '../screens';

const MultiTabs = () => {
  const [auth, setAuth] = useState({
    isLogin: false,
    userId: '',
    userAuth: '',
  });

  //const Tab = React.useRef<ReturnType<typeof createBottomTabNavigator>>(createBottomTabNavigator()).current;
  const Tab = createBottomTabNavigator();

  return (
    <MultiBarProvider
      data={[
        ({ navigation }) => (
          <TouchIcon
            labelName="로그인"
            iconName="log-in"
            color="#E24E1B"
            size={20}
            onPress={() => {}}
          />
        ),
        ({ navigation }) => (
          <TouchIcon
            labelName="회원가입"
            iconName="person-add"
            color="#E24E1B"
            size={20}
            onPress={() => {}}
          />
        ),          
        ({ navigation }) => (
          <TouchIcon
            labelName="포인트"
            iconName="star"
            color="#E24E1B"
            size={20}
            onPress={() => {}}
          />
        ),
      ]}
      iconSize={40}
      overlayRadius={100}
      initialExtrasVisible={false}
    >
      <Tab.Navigator
        tabBar={(props) => (
          <BottomTabBarWrapper navigation={props.navigation}>
            <BottomTabBar {...props} />
          </BottomTabBarWrapper>
        )}
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
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="home"
                style={{
                  fontSize: size,
                  color: color
                }}
              />
            ),
            title: "홈",
            headerShown: false,
          }}
          initialParams={{
            auth: auth,
            setAuth: setAuth,
            pathUrl: auth.isLogin 
              ? null
              : "",
          }}
        />
        <Tab.Screen
          name="Center"
          component={BlankScreen}
          options={{
            tabBarLabel: '',
            tabBarButton: () => (
              <MultiBarButton
                style={{
                  backgroundColor: '#E24E1B'
                }}
              >
                <MaterialIcons
                  name="add"
                  style={{
                    fontSize: 32,
                    color: '#EDF2F4'
                  }}
                />
              </MultiBarButton>
            )
          }}
        />
        <Tab.Screen
          name="Notice"
          component={Notice}
          options={{
            title: "알림함",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="notifications"
                style={{
                  fontSize: size,
                  color: color
                }}
              />
            )
          }}
          initialParams={{
            auth: auth,
            setAuth: setAuth,
            pathUrl: auth.isLogin 
              ? null
              : "/account/login",
          }}
        />
      </Tab.Navigator>
    </MultiBarProvider>
  );
}

export default MultiTabs;
