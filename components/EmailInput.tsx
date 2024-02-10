import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface EmailInputProps {
  className?: string;
}

interface EmailFormInput {
  name: string;
  email: string;
}
const EmailInput: React.FC<EmailInputProps> = ({className})  => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormInput>();

  const onSubmit: SubmitHandler<EmailFormInput> = async (data) => {
    fetch("/api/enterEmail", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return !submitted ? (
    <div className={`${className}`}>
      <h1 className=" text-white font-thin text-2xl mb-3 animate-pulse whitespace-nowrap  ">
        join mailing list
      </h1>
      <div className="flex flex-col space-x-2  ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", { required: true })}
            type="text"
            className="decoration-white h-8 w-72 text-md p-2 rounded-md mb-2"
            placeholder="Name"
          />
          <input
            {...register("email", { required: true })}
            type="email"
            className="decoration-white h-8 w-72 text-md p-2 rounded-md"
            placeholder="Email"
          />
          <button className="text-xl  text-slate-900 h-8 w-72 bg-[#CC8470] hover:bg-[#A34141] mt-2 rounded-md cursor-pointer">
       JOIN
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className=" p-10 text-slate-300 text-2xl text-center ">
      <h1>Thank you for joining the mailing list! 🎊</h1>
      <br />
      <h1>🌊🌊🌊🌊🌊🌊🌊🌊🌊</h1>
    </div>
  );
}

export default EmailInput;
