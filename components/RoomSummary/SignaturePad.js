import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, } from "react-native";
import Signature from "react-native-signature-canvas";
import CustomBtn from "../CustomBtn";

export const SignaturePad = (props) => {
  const [signature, setSign] = useState(null);
  const signRef = useRef();

  const { onEnd, onBegin,onOK, success} = props;

  const handleEmpty = () => {
    console.log("Empty");
  };

  const handleOK = (signature) => {
    console.log(signature);
    onOK(signature);
  };

  const handleClear = () => {
    signRef.current.clearSignature();
  };

  const handleConfirm = () => {
    console.log("end");
    signRef.current.readSignature();
    success()
  };

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}
  .m-signature-pad--body {background:white;border-radius: 10px;marf}
  .m-signature-pad { border: none; border-radius: 10px; } 
    body,html {width: 410px;background:#ffff;height:300px;margin:0px;padding:0px;border-radius: 10px; }
  .m-signature-pad:before{display:none}
  `;

  return (
    <View style={{ height: 500, }}>
      <Signature
        onOK={handleOK}
        webStyle={style}
        onBegin={onBegin}
        onEnd={onEnd}
        ref={signRef}
      />
      <View style={styles.row}>
        <CustomBtn
          text={"Clear"}
          action={(handleClear)}
          disabled={false}
          customWidth={"40%"}
        />
        <CustomBtn
          text={"Confirm"}
          action={handleConfirm}
          primary
          disabled={false}
          customWidth={"40%"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: "100%",
    alignItems:"center",
    justifyContent:"space-around",
  }
});
