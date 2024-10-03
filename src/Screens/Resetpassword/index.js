import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { styles } from "./index.style";
import BackButton from "../../Components/Back Button";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import Lottie from "lottie-react-native";
import CustomText from "../../Components/Text";
import InputField from "../../Components/InputFiled";
import CustomButton from "../../Components/Button";
import { Formik } from "formik";
import { resetPasswordValidationSchema } from "../Utills/Validations";
import BasUrl from "../../BasUrl";
import axios from "axios";
import WaveLoader from "../../Components/WaveLoader";
const ResetPassword = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const { itemId, id } = route.params;
  console.log("idddddddd", id);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // API
  const resetPassword = async (values, { setValues }) => {
    setIsLoader(true);
    let data = JSON.stringify({
      id: id,
      password: values.password,
      password_confirmation: values.confirmPassword,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BasUrl}resetForgetPassword`,
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
        console.log("response  ======>>>>>>>>", JSON.stringify(response.data));
        const res = response.data;
        if (res.status === "Success") {
          navigation.navigate("Login");
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
      <BackButton onPressBack={() => navigation.goBack()} />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 100 }}></View>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validateOnMount={true}
          onSubmit={(values, { setSubmitting, setValues }) =>
            resetPassword(values, { setSubmitting, setValues })
          }
          validationSchema={resetPasswordValidationSchema}
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
            <View style={styles.container}>
              <CustomText
                text={"Reset Your Password"}
                style={styles.screen_title}
              />
              <InputField
                placeholder={"password"}
                value={values.password}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                secureTextEntry
              />
              {errors.password && touched.password && (
                <CustomText text={errors.password} />
              )}

              <InputField
                placeholder={"Re-type Password"}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                secureTextEntry
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <CustomText text={errors.confirmPassword} />
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
          )}
        </Formik>
      </ScrollView>
      <Toast />
    </FastImage>
  );
};

export default ResetPassword;
