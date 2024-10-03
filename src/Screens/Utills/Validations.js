import * as Yup from "yup";

const logInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter Valid email *")
    .required("Email Address is required"),
  password: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} character`)
    .required("Password is required"),
});

const SignUpValidationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Please Enter a valid email")
    .required("Email Address is required"),
  password: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} character`)
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Please re-type your password")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

const forgetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("please enter valid email *")
    .required("Email Address is required"),
});
const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} character`)
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Please re-type your password")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

export {
  logInValidationSchema,
  SignUpValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
