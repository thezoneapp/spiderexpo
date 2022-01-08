// 웹뷰
import React, { useEffect, useState, useRef } from 'react';
import { Linking, Platform, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview'; 
import base64 from "react-native-base64";

const INJECTED_JAVASCRIPT = ` 
  (function() {
    function wrap(fn) {
      return function wrapper() {
        var res = fn.apply(this, arguments);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ href: window.location.href, loginData: window.localStorage.getItem('user') })
        );
        return res;
      }
    }
    history.pushState = wrap(history.pushState);
    history.replaceState = wrap(history.replaceState);
    window.addEventListener('popstate', function() {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ href: window.location.href, loginData: window.localStorage.getItem('user') })
      );
    });
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ href: window.location.href, loginData: window.localStorage.getItem('user') })
    );
  })();
  true;
`;

const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

const HomeWebview = ( props ) => {
  const params = props.route.params;
  const auth = params.auth;  
  const setAuth = params.setAuth;
  const pathUrl = params.pathUrl;

  const webRef = useRef();

	const [navState, setNavState] = useState({
		canGoBack: false
	});

  const [state, setState] = useState({
		isPostMessage: true,
  });

  const BASE_URL = "https://spiderplatform.co.kr/"; 

  // 웹뷰 ==> RN 이벤트 메세지
  const handleReceiveMessage = (event) => {
    if (event.nativeEvent.data !== null) {
      const data = JSON.parse(event.nativeEvent.data);

      if (data.href.indexOf('/account/login') == -1) {
        // onNavigationStateChange
        setNavState(event.nativeEvent);
      }

      // 로그인 전
      if (data.loginData === null || data.loginData === undefined) {
        if (auth.isLogin) {
          setAuth({
            ...auth,
            isLogin: false,
            userId: '',
            userAuth: '',
          });
        }

      // 로그인 후
      } else {
        if (!auth.isLogin) {
          const userInfo = JSON.parse(base64.decode(data.loginData));
          
          setAuth({
            ...auth,
            isLogin: true,
            userId: userInfo.userId,
            userAuth: userInfo.userAuth
          });
        }
      }
    }
  };

  // android mounted
  const handleLoad = (webRef) => (e) => {
    isAndroid && state.isPostMessage && sendPostMessage(webRef);
  };

  // ios mounted
  const handleLoadProgress = (webRef) => (e) => {
    const progress = e.nativeEvent.progress;

    if (progress === 1) {
      isIos && state.isPostMessage && sendPostMessage(webRef);
    }
  };
  
  // App에서 Web으로 메세지 전달
  const sendPostMessage = (webRef) => {
    const sendData = {
      appData: {
        type: "token",
        pathUrl: pathUrl,
      }
    };
  
    webRef.current.postMessage(JSON.stringify(sendData));

    setState({
      ...state,
      isPostMessage: false,
    });
  };

  const onShouldStartLoadWithRequest = (event) => {
    if (event.url.startsWith('http://') || event.url.startsWith('https://') || event.url.startsWith('about:blank')) {
      return true;
    }

    return false;
  };

  /*
  useEffect(() => { 
    if (webRef && webRef.clearCache) webRef.clearCache(); 
  }, [webRef]);
  */

  // 안드로이드 ==> 뒤로가기 버튼 처리
  useEffect(() => {
    const onPress = () => {
      if(navState.canGoBack) {
        // 뒤로 갈 수 있는 상태라면 이전 웹페이지로 이동한다
        webRef.current.goBack();
        return true;

      } else {
        // 뒤로 갈 수 없는 상태라면 다른 원하는 행동을 한다
        return false;
      }
    }
    
    // 안드로이드 백버튼이 눌렸을 때 이벤트 리스너를 등록한다.
    BackHandler.addEventListener('hardwareBackPress', onPress);
    
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPress);
    }
  }, [navState.canGoBack])

  return (  
      <WebView 
        ref={webRef}
        pullToRefreshEnabled={true} 
        startInLoadingState={true} 
        allowsBackForwardNavigationGestures={true} 
        allowsInlineMediaPlayback={true}
        originWhitelist={['*']}
        mixedContentMode={'compatibility'} 
        overScrollMode={'never'} 
        source={{uri: BASE_URL}} 
        injectedJavaScript={INJECTED_JAVASCRIPT} 
        onMessage={handleReceiveMessage} // web에서 app으로..
        onLoadProgress={handleLoadProgress(webRef)}
        onLoad={handleLoad(webRef)}
        onNavigationStateChange={setNavState}
        onShouldStartLoadWithRequest={(event) => {
          return onShouldStartLoadWithRequest(event);
        }}
        javaScriptEnabled={true}
      />

  );}

export default HomeWebview;
