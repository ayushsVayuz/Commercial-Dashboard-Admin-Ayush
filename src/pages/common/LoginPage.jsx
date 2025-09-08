import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MetaTitle } from "../../components/metaTitle";
import { Input } from "../../components/inputs/input";
import { Button } from "../../components/buttons/button";
import { signinValidator, otpValidator } from "../../validation/auth-validator";
import {
  compareOtp,
  loginUser,
  resendOtp,
} from "../../redux/actions/userAuth-action";

const recaptchaKey = "6LfSVE4qAAAAANez_fs1z7_NIMG5t1jzlikYwmGN"; // replace with your reCAPTCHA site key

const LoginPage = () => {
  const dispatch = useDispatch();
  const { otpRequestId, loading, error } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpMode, setIsOtpMode] = useState(false);

  console.log(isOtpMode);
  useEffect(() => {
    console.log(error, "error from login page");
  }, [error]);

  const inputRefs = useRef([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(isOtpMode ? otpValidator : signinValidator),
    mode: "onBlur",
    defaultValues: {
      // otp: ["", "", "", ""], // Initialize an array of empty strings for each input
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadRecaptcha = () => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`;
      script.async = true;
      script.onload = () => console.log("reCAPTCHA script loaded");
      document.body.appendChild(script);
    };

    loadRecaptcha();
  }, []);

  const executeRecaptcha = async () => {
    return new Promise((resolve, reject) => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(recaptchaKey, { action: "submit" })
            .then((token) => resolve(token))
            .catch((error) => reject(error));
        });
      } else {
        reject("reCAPTCHA not ready");
      }
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const token = await executeRecaptcha();
      console.log("reCAPTCHA token:", token); // For debugging

      if (!isOtpMode) {
        // Handle login submission
        const action = await dispatch(loginUser({ ...data, token }));
        if (action.meta.requestStatus === "fulfilled") {
          setOtp(["", "", "", ""]);
          setIsOtpMode(true);
        }
      } else {
        // Handle OTP submission
        const email = watch("email"); // Get email value from the form
        console.log(email, otp, token);
        const otpNumber = otp.join("");
        // console.log(otpNumber);
        // await dispatch(compareOtp({ email, otp: otpNumber, token }));
        // navigate("/dashboard");
        const action = await dispatch(
          compareOtp({ email, otp: otpNumber, token })
        );

        if (action.meta.requestStatus === "fulfilled") {
          navigate("/dashboard");
        } else {
          console.error("OTP verification failed:", action.error);
          // alert("OTP verification failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to verify reCAPTCHA. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    const token = await executeRecaptcha();
    dispatch(resendOtp({ otpRequestId, token }));
  };

  const validateOtp = (enteredOtp) => {
    if (enteredOtp.trim().length != 4) {
      return false;
    }
    return true;
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    if (/^\d{4}$/.test(paste)) {
      // Check if the pasted content is exactly 5 digits
      const newOtp = paste.split("");
      setOtp(newOtp);

      // Delay focusing and blurring to allow state update
      setTimeout(() => {
        newOtp.forEach((_, index) => {
          inputRefs.current[index].focus();
          inputRefs.current[index].blur();
        });

        inputRefs.current[4].focus(); // Focus the last input field
      }, 0);
    }
    e.preventDefault();
  };

  const handleChange = (index, value) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Function to handle backspace key press
  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && index >= 0) {
      const newOtp = [...otp];
      newOtp[index] = ""; // Clear the digit at the current index
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <>
      <MetaTitle title={`${isOtpMode ? "OTP" : "Sign In"} | Anarock`} />
      <section className="w-full min-h-screen flex items-center">
        <div className="hidden md:flex flex-col items-center gap-4 w-full md:w-2/6">
          <img className="w-52" src="/anarock.svg" alt="" />
          <h1 className="font-bold text-2xl dark:text-white">Welcome back!</h1>
          <img className="w-52" src="/auth/sign-in.svg" alt="" />
        </div>
        <div className="w-full md:w-4/6 h-screen bg-[#EFEFF3] dark:bg-slate-700 flex justify-center items-center">
          <div className="w-[20rem] flex flex-col gap-4">
            {/* <h3 className="px-0 py-2">Sign In</h3> */}
            <h3 className="px-0 py-2 dark:text-white">
              {isOtpMode ? "OTP" : "Sign In"}
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-1"
            >
              <div className={`${isOtpMode && "hidden"}`}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={"Email"}
                      type={"email"}
                      placeholder={"Enter your email e.g. johndoe@gmail.com"}
                      errorContent={errors?.email?.message}
                      disabled={isOtpMode}
                    />
                  )}
                />
              </div>
              <div className={`${isOtpMode && "hidden"}`}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={"Password"}
                      type={"password"}
                      placeholder={"Enter your password e.g. Johndoe@564"}
                      errorContent={errors?.password?.message}
                      disabled={isOtpMode}
                    />
                  )}
                />
              </div>
              {isOtpMode && (
                <div className=" w-full flex justify-center items-center items-start gap-4 pb-5 ">
                  {otp.map((digit, index) => (
                    <input
                      className={`${
                        error ? "border-error" : "border-[#DFEAF2]"
                      } w-[15%] h-14 font-bold border rounded-lg text-center`}
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleBackspace(index, e)}
                      onPaste={index === 0 ? handlePaste : null}
                    />
                  ))}
                </div>
              )}
              <Button
                mainPrimary={true}
                onClick={isOtpMode && onSubmit}
                type="submit"
                className={"mt-2 text-xs py-2 w-full rounded-lg"}
                disabled={loading || !isValid}
              >
                {loading
                  ? isOtpMode
                    ? "Verifying..."
                    : "Submitting..."
                  : isOtpMode
                  ? "Verify OTP"
                  : "Submit"}
              </Button>

              {isOtpMode && (
                <>
                  <Button
                    mainPrimary={true}
                    type={"button"}
                    onClick={() => setIsOtpMode(false)}
                    className={"mt-2 py-2 text-xs w-full rounded-lg"}
                    // disabled={loading}
                  >
                    Back
                  </Button>
                  <Button
                    // mainPrimary={true}
                    type={"button"}
                    onClick={handleResendOtp}
                    className="mt-4 py-0.5 px-2 w-auto text-xs dark:text-white rounded border-none"
                    disabled={loading}
                  >
                    Resend OTP
                  </Button>
                </>
              )}
            </form>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
