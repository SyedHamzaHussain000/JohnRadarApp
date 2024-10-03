import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { styles } from "./index.style";
import FastImage from "react-native-fast-image";

import CustomText from "../../Components/Text";
import InputField from "../../Components/InputFiled";
import CustomButton from "../../Components/Button";
import { Formik } from "formik";
import { logInValidationSchema } from "../Utills/Validations";
import images from "../../Constants/images";
import BasUrl from "../../BasUrl";
import { useDispatch } from "react-redux";
import { UserLogin } from "../../Redux/authSlice";
import LoaderModal from "../../Components/LoaderModal";
import axios from "axios";
import Toast from "react-native-toast-message";
import WaveLoader from "../../Components/WaveLoader";

const Login = ({ navigation }) => {
  const [isLoader, setIsLoader] = useState(false);

  const dispatch = useDispatch();

  const LogInUser = async (values, { setSubmitting, setValues }) => {
    setIsLoader(true);
    let data = JSON.stringify({
      email: values.email,
      password: values.password,
      tc: true,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BasUrl}Login`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    dispatch(UserLogin(config));
    axios
      .request(config)
      .then((response) => {
        setIsLoader(false);
        console.log("loggggggggggggggggg ==>>>", JSON.stringify(response.data));
        setValues({ email: "", password: "" });
      })
      .catch((error) => {
        setIsLoader(false);
        showToast("error", error.message);
        console.log("erorrrrrrrrrrrrrr", error.message);
      });
  };

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };

  return (
    <>
      <FastImage source={images.AuthBackground} style={{ flex: 1 }}>
        <View style={{ height: 100 }}></View>
        <ScrollView style={{ flex: 1 }}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validateOnMount={true}
            onSubmit={(values, { setSubmitting, setValues }) =>
              LogInUser(values, { setSubmitting, setValues })
            }
            validationSchema={logInValidationSchema}
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
                <View style={styles.container}>
                  <CustomText
                    text={"Sign In with email or username"}
                    style={styles.screen_title}
                  />
                  <InputField
                    placeholder={"username or email"}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType={"email-address"}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errors}>{errors.email}</Text>
                  )}
                  <InputField
                    placeholder={"password"}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry
                  />
                  {errors.password && touched.password && (
                    <Text
                      style={[
                        styles.errors,
                        { paddingBottom: 5, marginTop: 0 },
                      ]}
                    >
                      {errors.password}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ForgetPassword");
                    }}
                    style={{ alignSelf: "flex-end", marginTop: 10 }}
                  >
                    <CustomText
                      text={"forgot password?"}
                      style={{ fontSize: 14 }}
                    />
                  </TouchableOpacity>
                  {isLoader ? (
                    <WaveLoader />
                  ) : (
                    <CustomButton
                      buttonText={"Sign In"}
                      onPress={() => {
                        // navigation.navigate('MainStack')
                        handleSubmit(values);
                      }}
                    />
                  )}

                  <View style={styles.devider_View} />

                  <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 10 }}
                  >
                    <CustomText
                      text={"Dont have an account?"}
                      style={{ fontSize: 14 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}
                    style={[styles.container_create, { marginTop: 30 }]}
                  >
                    <CustomText style={styles.txt} text={"Create an account"} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
        <Toast />
      </FastImage>
      {/* <Toast /> */}
    </>
  );
};

export default Login;
