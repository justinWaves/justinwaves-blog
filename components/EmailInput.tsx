import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface EmailFormInput {
  name: string;
  email: string;
}
function EmailInput() {
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
    <div className=" flex flex-col md:flex-row p-2 mx-auto md:mx-0 text-center mb-10 md:mb-0 w-full md:w-2/3 max-w-md">
      <h1 className=" text-slate-300 text-2xl mb-5 md:mb-0 md:mr-10 animate-pulse whitespace-nowrap ">
        join mailing list
      </h1>
      <div className="flex flex-col space-x-2  ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", { required: true })}
            type="text"
            className="decoration-white h-10 w-full text-xl p-2 rounded-md mb-2"
            placeholder="Name"
          />
          <input
            {...register("email", { required: true })}
            type="email"
            className="decoration-white h-10 w-full text-xl p-2 rounded-md"
            placeholder="Email"
          />
          <button className="text-lg text-slate-900 h-10 w-full bg-sky-300 mt-2 rounded-md">
            send
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
