import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./index.style";
import Modal from "react-native-modal";
import Lottie from "lottie-react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  MaskSymbol,
  isLastFilledCell,
} from "react-native-confirmation-code-field";
import images from "../../Constants/images";

import BackButton from "../../Components/Back Button";
import FastImage from "react-native-fast-image";
import Toast from "react-native-toast-message";
import CustomText from "../../Components/Text";
import CustomButton from "../../Components/Button";
import BasUrl from "../../BasUrl";
import axios from "axios";
import WaveLoader from "../../Components/WaveLoader";

const CELL_COUNT = 4;
const Otp = ({ navigation, route }) => {
  const [count, setCount] = useState(59);
  const [value, setValue] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const { id } = route.params;

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;

    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="*"
          isLastFilledCell={isLastFilledCell({ index, value })}
        >
          {symbol}
        </MaskSymbol>
      );
    } else if (isFocused) {
      textChild = <Cursor />;
    }
    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Text>
    );
  };

  useEffect(() => {
    if (count !== 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else {
    }
  }, [count]);

  //api
  const CheckingOtp = () => {
    setIsLoader(true);
    let data = JSON.stringify({
      otp: value,
      id: id,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BasUrl}VerifyOtp`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setIsLoader(false);
        console.log(JSON.stringify(response));
        const res = response.data;
        if (res.success === true) {
          navigation.navigate("ResetPassword", {
            id: id,
          });
          showToast("success", res.message);
        } else {
          showToast("error", res.message);
        }
      })
      .catch((error) => {
        setIsLoader(false);
        console.log(error);
      });
  };

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };

  return (
    <FastImage source={images.AuthBackground} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <BackButton onPressBack={() => navigation.goBack()} />
        {/* <Image
          source={images.logo}
          style={{ height: 70, width: 70, alignSelf: "center", marginTop: 30 }}
        /> */}

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            marginHorizontal: 20,
          }}
        >
          <CustomText
            text={"Email"}
            style={{ fontSize: 20, fontWeight: "bold" }}
          />
          <CustomText
            style={{ marginTop: 10 }}
            text={
              " An email has been sent to your registered email address. Enter the verification code below:"
            }
          />

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
          <Text style={{ color: "white", alignSelf: "center" }}>
            00 : {count}
          </Text>
          <CustomText
            text={"Didnt receive a code?"}
            style={{ alignSelf: "center", color: "white", marginTop: 20 }}
          />
          <CustomText
            text={"Resend Code"}
            style={{
              alignSelf: "center",
              color: "white",
              marginTop: 10,
            }}
          />
          {isLoader ? (
            <WaveLoader />
          ) : (
            <CustomButton
              buttonText={"Verify"}
              onPress={() => {
                CheckingOtp();
              }}
            />
          )}

          <View>
            <Modal isVisible={isModalVisible}>
              {/* <FastImage
                source={images.Background}
                style={{ flex: 0.6, alignItems: "center" }}
              >
                {/* <View
                style={{
                  flex: 0.6,
                  backgroundColor: '#E61917',
                }}> */}
              <Lottie
                source={images.tickLottie}
                autoPlay
                style={{
                  height: 120,
                  width: 120,
                  marginTop: 20,
                }}
              />
              <CustomText
                text={"Successfully Verified"}
                style={{ fontSize: 18, fontWeight: "bold", marginTop: 15 }}
              />
              <CustomButton
                onPress={() => {
                  navigation.navigate("Login");
                }}
                buttonText={"Back To Login"}
                style={{ width: "80%" }}
              />
            </Modal>
          </View>
        </ScrollView>
      </View>
      <Toast />
    </FastImage>
  );
};

export default Otp;
