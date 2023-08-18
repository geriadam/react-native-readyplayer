import React, { useRef, useState, Suspense } from 'react';
import WebView from 'react-native-webview';
import { SUBDOMAIN_READYPLAYER } from '../constants';
import { useFrame, Canvas } from '@react-three/fiber/native'
import { useGLTF, Environment, useAnimations } from '@react-three/drei/native'

const modelPath = "https://api.readyplayer.me/v1/avatars/6185a4acfb622cf1cdc49348.glb"

export const HomeScreen = () => {
  const subdomain = SUBDOMAIN_READYPLAYER;
  const webView = useRef();

  function Model({ url, ...rest }) {
    const group = useRef()
    const { scene, nodes, materials, animations } = useGLTF(url)
    useFrame(() => (scene.rotation.y += 0.01))
    const { actions } = useAnimations(animations, group)
    return <primitive {...rest} object={scene} />
  }

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

  // return (
  //   <WebView 
  //     ref={webView}
  //     style={{ flex: 1 }}
  //     nestedScrollEnabled={true}
  //     onLoad={onWebViewLoaded}
  //     onMessage={onMessageReceived}
  //     source={{ uri: `https://${subdomain}.readyplayer.me/avatar?frameApi` }}
  //   />
  // );

  return (
    <Canvas>
      <Suspense fallback={null}>
        <Model url={modelPath} />
      </Suspense>
    </Canvas>
  )
};