import { View, Image, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "./index.style";
import BackButton from "../../Components/Back Button";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import Toast from "react-native-toast-message";
import CustomText from "../../Components/Text";
import InputField from "../../Components/InputFiled";
import CustomButton from "../../Components/Button";
import { Formik } from "formik";
import { forgetPasswordValidationSchema } from "../Utills/Validations";
import BasUrl from "../../BasUrl";
import WaveLoader from "../../Components/WaveLoader";
import axios from "axios";

const ForgetPassword = ({ navigation, route }) => {
  const [isLoader, setIsLoader] = useState(false);

  const forgetUserPassword = async (values, { setValues }) => {
    setIsLoader(true);
    console.log("emailllllllll", values.email,);
    let data = JSON.stringify({
      email: values.email,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BasUrl}ForgetPasswordEmail`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log("responsesssssssssss", response.data);
        const res = response.data;
        setIsLoader(false);
        if (res.status === "Success") {
          navigation.navigate("Otp", {
            id: res.id,
          });
          showToast("success", res.message);

          setValues({ email: "" });
        } else {
          showToast("error", res.message);
        }
      })
      .catch((error) => {
        setIsLoader(false);
        showToast("error", response.data.message);
        console.log("errrrrrrrrrr", response.data.message);
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
      <Formik
        initialValues={{ email: "" }}
        validateOnMount={true}
        onSubmit={(values, { setValues }) =>
          forgetUserPassword(values, { setValues })
        }
        validationSchema={forgetPasswordValidationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <View style={styles.main_container}>
            <BackButton onPressBack={() => navigation.goBack()} />
            <View style={{ height: 80 }}></View>
            <View style={styles.container}>
              <CustomText
                text={"Enter Your Email"}
                style={styles.screen_title}
              />
              <InputField
                placeholder={"Email"}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType={"email-address"}
                // isEdit={false}
              />
              {errors.email && touched.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}
              {isLoader ? (
                <WaveLoader />
              ) : (
                <CustomButton
                  buttonText={"Submit"}
                  onPress={() => {
                    handleSubmit(values);
                  }}
                />
              )}
            </View>
          </View>
        )}
      </Formik>
      <Toast />
    </FastImage>
  );
};

export default ForgetPassword;
