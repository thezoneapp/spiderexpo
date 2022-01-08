import React, { useEffect } from "react";
import { useColorScheme, SafeAreaView, StyleSheet, LogBox } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { assets, useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
// 개발자
import { darkTheme, lightTheme } from "./src/styles/theme";
import Root from "./src/navigation/Root";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Overwriting fontFamily style attribute preprocessor',
]);

/*
// 방법.1
const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) => images.map((image) => {
  if (typeof image === 'string') {
    return Image.prefatch(image);
  } else {
    return Asset.loadAsync(image);
  }
});
*/

export default function App() {
  /*
  // 방법.1 > Image.prefatch는 사용할 수 없다.
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startAsync = async () => {
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages(
      [require('./images/temp.jpg')], 
      ['http://spiderplatform.co.kr/upload/group/211026141137.svg']
    );
    
    await Promise.all([...fonts, ...images]);
  }
  if (!ready) {
    return (
      <AppLoading 
        startAsync={startAsync}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  */

  // 방법.2
  //const [assets] = useAssets([require('./images/temp.jpg')]);
  const [fonts] = Font.useFonts(Ionicons.font);
  const isDark = useColorScheme() === "dark";

  if (!fonts) {
    return (
      <AppLoading />
    );
  }

  return (
    <SafeAreaView  style={styles.container}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaView>     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500'
  }
});