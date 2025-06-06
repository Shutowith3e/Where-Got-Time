import { MagicCard } from "@/components/magicui/magic-card";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utlis";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    getFieldState,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const { invalid: pwInvalid, isDirty: pwDirty } = getFieldState("Password");
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);

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
                <div className="grid grid-rows-2">
                  <label>Email </label>{" "}
                  <input
                    className="border-1 rounded-lg px-3 text-sm"
                    type="text"
                    placeholder="name@example.com"
                    {...register("Email", {
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
                    {...register("Password", {
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
                    {...register("PasswordCheck", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      validate: (val: string) => {
                        if (watch("Password") != val) {
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
