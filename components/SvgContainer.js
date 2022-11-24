import React, { useEffect } from "react"
import { Dimensions } from "react-native"
import Svg, { Defs, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  // get the width and height of the screen
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;

  if (width > height) {
    return (
      <Svg
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={900}
        {...props}
      >
        <Path
          id="Uni\xF3n_1-2"
          d="M0 1024V450.42C.65 374.98 62.33 314.35 137.77 315c13.84.12 27.59 2.34 40.76 6.59l1075.68 243.64c64.77 11.94 111.78 68.41 111.79 134.27 0 1.04-.01 2.08-.04 3.11l.04.02v321.36H0z"
          fill="#f2f2f2"
        />
      </Svg>
    )
  } else {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={700}
        style={{
          bottom: 0,
          left: 0,
          shadowColor: "transparent",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 2,
          borderRadius: 28,
          zIndex: 1,
        }}
        {...props}
      >
        <G id="b">
          <Path
            d="M928.15 251.8L182.82 6.96A139.318 139.318 0 00139.33 0C62.38 0 0 62.38 0 139.34v568.63h1024v-323.8c0-60.2-38.66-113.59-95.85-132.38z"
            id="c"
            fill="#f2f2f2"
          />
        </G>
      </Svg>
    )
  }
}

export default SvgComponent
