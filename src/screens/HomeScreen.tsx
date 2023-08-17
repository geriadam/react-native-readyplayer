import React, { useRef } from 'react';
import WebView from 'react-native-webview';
import { SUBDOMAIN_READYPLAYER } from '../constants';

export const HomeScreen = () => {
  const subdomain = SUBDOMAIN_READYPLAYER;
  const webView = useRef();

  function onAvatarUrlReceived(message: any) {
    console.log(`Avatar Url = ${message.data?.url}`)
  }

  function onWebViewLoaded() {
    if (webView.current) {
      webView.current.postMessage(
        JSON.stringify({
          target: "readyplayerme",
          type: "subscribe",
          eventName: "v1.avatar.exported",
        })
      );
    }
  }

  function onMessageReceived(message: any) {
    const data = message.nativeEvent.data;
    const json = JSON.parse(data);
  
    if (json?.source !== 'readyplayerme') {
      return;
    }
  
    if (json.eventName === "v1.avatar.exported") {
      onAvatarUrlReceived(json);
    }
  }

  return (
    <WebView 
      ref={webView}
      style={{ flex: 1 }}
      nestedScrollEnabled={true}
      onLoad={onWebViewLoaded}
      onMessage={onMessageReceived}
      source={{ uri: `https://${subdomain}.readyplayer.me/avatar?frameApi` }}
    />
  );
};