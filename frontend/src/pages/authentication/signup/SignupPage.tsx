import { MagicCard } from "@/components/magicui/magic-card";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utlis";
import supabase from "@/helper/supabaseClient";
import { useState } from "react";

export default function SignupPage() {
  /* Object destructuring -> uses react hook form*/
  const {
    register,
    handleSubmit,
    watch,
    getFieldState,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [message, setMessage] = useState("");

  const { invalid: pwInvalid, isDirty: pwDirty } = getFieldState("password");

  /*errors is what we get back from react hook form (useForm) and error is what we get back from supabase */
  const onSubmit = async (data: any, error: any) => {
    const { email, password } = data;
    console.log(data);
    console.log(errors);
    await supabase.auth.signUp({
      email: email,
      password: password,
    });
    setMessage("");
    if (error) {
      setMessage(`${error.message}`);
      return;
    } else {
      setMessage("Please Check Your Email!");
    }
  };

  return (
    <>
      <div className="w-full shadow-none border-none flex justify-center items-center min-h-dvh flex-col bg-gradient-to-b from-violet-900/60">
        <div className="flex flex-col gap-2">
          <MagicCard gradientColor="262626" className="mx-auto rounded-2xl p-8">
            <div className="flex flex-col gap-4">
              <img src="/logo.png" className="h-8 mx-auto"></img>
              <h2 className="text-center text-lg font-semibold">
                Create Your Free Account
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {message && (
                  <span className="text-center text-sm mt-2">{message}</span>
                )}
                <div className="grid grid-rows-2">
                  <label>Email </label>{" "}
                  <input
                    className="border-1 rounded-lg px-3 text-sm"
                    type="text"
                    placeholder="name@example.com"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                </div>
                <div className="grid grid-rows-2">
                  <label>Password </label>
                  <input
                    className="border-1 rounded-lg text-sm px-3"
                    type="password"
                    placeholder=""
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*., ?])/gm,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                  {(pwInvalid || !pwDirty) && (
                    <p className="text-[10px] text-red-500">
                      Min 6 Characters, 1 Upper, 1 Lower, 1 Number
                    </p>
                  )}
                </div>
                <div className="grid grid-rows-2">
                  <label>Re-Enter Password </label>
                  <input
                    className="border-1 rounded-lg text-sm px-3"
                    type="password"
                    placeholder=""
                    {...register("passwordCheck", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      validate: (val: string) => {
                        if (watch("password") != val) {
                          return "Your passwords do no match";
                        }
                      },
                    })}
                  />
                </div>
                <input
                  disabled={!isValid}
                  type="submit"
                  value="Sign Up"
                  className={cn(
                    "text-indigo-800 bg-indigo-100 rounded-3xl px-4 py-2 font-semibold",
                    !isValid && "bg-gray-200"
                  )}
                />
              </form>
            </div>
          </MagicCard>
          <div className="flex flex-row justify-between">
            <Link to="/">Back</Link>
            <Link to="/login" className="text-indigo-800 hover:underline">
              Have An Account?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
