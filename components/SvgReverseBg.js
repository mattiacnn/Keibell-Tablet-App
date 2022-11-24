import React, { useEffect } from "react"
import { Dimensions, Image } from "react-native"
import Svg, { Defs, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgReverseBg(props) {
  // get the width and height of the screen
  const width = Dimensions.get("screen").width
  const height = Dimensions.get("screen").height


  if (width > height) {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, right: 0 }}
      >
        <Path
          data-name="Tracciato 661"
          d="M14656.343,5159.667l-1089.536-60.539c-66.451-.216-120.3-41.3-120.8-92.087l-.01-.009V4522h1342v545.416c-.156,51.154-54.417,92.583-121.33,92.583Q14661.452,5160,14656.343,5159.667Z"
          fill="#f2f2f2"
          transform="translate(-13445.998 -4522)"
        />
      </Svg>
    )


  }
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={{ position: "absolute", top: -40, left: 0, right: 0 }}
    >
      <Defs></Defs>
      <G filter="url(#a)">
        <Path
          data-name="Tracciato 661"
          d="M-.117 38H1024v1027c0 71.8-55.428 140.424-130 130l-764-80c-72.59-9.8-130-58.2-130-130z"
          fill="#f2f2f2"
        />
      </G>
    </Svg>
  )
}

export default SvgReverseBg
