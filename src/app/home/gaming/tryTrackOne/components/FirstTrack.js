import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function FirstTrack() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/public/WinMeGame/Build/WinMeGame.loader.js",
    dataUrl: "/public/WinMeGame/Build/WinMeGame.data",
    frameworkUrl: "/public/WinMeGame/Build/WinMeGame.framework.js",
    codeUrl: "/public/WinMeGame/Build/WinMeGame.wasm",
  });

  return (
    <>
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100%", height: "100%" }}
        id="react-unity-webgl-canvas-1"
      />
    </>
  );
}
