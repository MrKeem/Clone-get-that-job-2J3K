import { useForm, Controller } from "react-hook-form"; //1. นำเข้า React Hook Form, Controller = เพื่อเชื่อมต่อ field ใน input เข้ากับ react hook form
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect, useState } from "react";
import ArrowRight from "../images/registration-page/arrow-right.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogInInfo() {
  const { userData, setUserData } = useGlobalContext();
  const navigate = useNavigate();
  const [emailExists, setEmailExists] = useState(false);

  // 2. เราจะใช้ useForm(); เพื่อกำหนดค่าต่างๆ และส่งค่าที่จะใช้ในการจัดการ form
  const {
    handleSubmit, // <- ใช้เพื่อ manage เวลาส่งฟอร์ม
    control, // <- มาจาก controller .ใช้เพื่อเชื่อมต่อกับ field input ใน form
    // setError, // <- function สำหรับจัดการข้อความ error message ที่อยากให้แสดง
    formState: { errors }, // <-  เป็นค่าที่ใช้ในเก็บ error message ที่เรา set ขึ้นมา เวลากรอก form ไม่ครบ
  } = useForm();

  useEffect(() => {
    // ใช้ useEffect เพื่ออัปเดตเวลามีข้อมูลเปลี่ยนแปลง
    console.log("Updated userData:", userData);
  }, [userData]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      if (!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
        toast.error("Invalid email format");
        return;
      }
      if (emailExists === true) {
        toast.error("The email is already taken");
        return;
      }
      if (
        password.length < 8 ||
        !/^[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~_-]+$/.test(password)
      ) {
        toast.error(
          "Password must be at least 8 characters long and contain only normal password characters"
        );
        return;
      }
      if (data.confirmedPassword !== data.password) {
        toast.error("Password and password confirmation do not match");
        return;
      }
      await setUserData({
        email: control._fields.email._f.value,
        password: control._fields.password._f.value,
      });
      navigate("/user/register2");
    } catch (error) {
      console.error("Error during registration", error);
      toast.error("Error during registration");
    }
  };

  const fetchEmailFromDatabase = async (enteredEmail) => {
    try {
      const response = await axios.post(
        "https://clone-get-that-job-2-j3-k-backend.vercel.app/regist/checkDupEmail",
        { email: enteredEmail }
      );
      setEmailExists(response.data.exists);
    } catch (error) {
      console.error("Error during registration", error);
    }
  };
  return (
    <>
      <ToastContainer
        theme="colored"
        closeOnClick
        autoClose={2500}
        position="bottom-center"
      />
      <form
        className="font-Inter text-[10px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="email-input">
            <label htmlFor="email">
              <div className="mb-[4px] font-normal tracking-[1.5px]">EMAIL</div>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <input
                    className="mb-[16px] flex w-[360px] h-[36px] 
                  rounded-md border border-Pink bg-background p-[8px] 
                  text-[14px] placeholder:text-muted-foreground"
                    id="email"
                    type="email"
                    placeholder="some.user@mail.com"
                    {...field}
                    onChange={(e) => {
                      const enteredEmail = e.target.value;
                      fetchEmailFromDatabase(enteredEmail);
                      field.onChange(e);
                    }}
                    aria-describedby="email-error"
                  />
                )}
              />
            </label>
            <div
              id="email-error"
              className="text-red-500 text-[10px] uppercase font-bold tracking-[0.25px]"
            >
              {errors.email && errors.email.message}
            </div>
          </div>

          <div className="password-input">
            <label htmlFor="password">
              <div className="mb-[4px] font-normal tracking-[1.5px]">
                PASSWORD
              </div>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <input
                    className="mb-[16px] flex w-[360px] h-[36px] rounded-md border 
                  border-Pink bg-background p-[8px] text-[14px] 
                  placeholder:text-muted-foreground focus-visible:outline-none"
                    id="password"
                    type="password"
                    placeholder="******"
                    {...field}
                    aria-describedby="password-error"
                  />
                )}
              />
            </label>
            <div
              id="password-error"
              className="text-red-500 text-[10px] uppercase font-bold tracking-[0.25px] mt-0"
            >
              {errors.password && errors.password.message}
            </div>
          </div>

          <div className="confirmed-password-input">
            <label htmlFor="confirmed-password">
              <div className="mb-[4px] font-normal tracking-[1.5px]">
                PASSWORD CONFIRMATION
              </div>
              <Controller
                name="confirmedPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "Password confirmation is required",
                }}
                render={({ field }) => (
                  <input
                    className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink bg-background 
                  p-[8px] text-[14px] placeholder:text-muted-foreground"
                    id="confirmedpassword"
                    type="password"
                    placeholder="******"
                    {...field}
                    aria-describedby="confirmed-password-error"
                  />
                )}
              />
            </label>
            <div
              id="confirmed-password-error"
              className="text-red-500 text-[10px] uppercase font-bold tracking-[0.25px]"
            >
              {errors.confirmedPassword && errors.confirmedPassword.message}
            </div>
          </div>
          <div className="ml-[127px] w-[106px] h-[40px] px-[16px] py-[8px] active:bg-DarkPink hover:bg-LightPink bg-Pink rounded-[16px] text-white leading-[24px] font-[500px] text-[14px] tracking-[1.25px]">
            <button
              className="flex flex-row"
              type="submit"
              disabled={errors.confirmedPassword ? true : false}
            >
              <div className="ml-[10px]">NEXT</div>
              <img src={ArrowRight} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default LogInInfo;
