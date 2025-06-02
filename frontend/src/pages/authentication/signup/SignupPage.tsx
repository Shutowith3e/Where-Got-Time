import { MagicCard } from "@/components/magicui/magic-card";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);

  return (
    <>
      <div className="w-full shadow-none border-none flex justify-center items-center min-h-dvh flex-col">
        <div className="flex flex-col gap-2">
          <MagicCard gradientColor="262626" className="mx-auto rounded-2xl p-8">
            <div className="flex flex-col gap-4">
              <img src="/logo.png" className="h-8 mx-auto"></img>
              <h2 className="text-center text-lg font-semibold">
                Create Your Free Account
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
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
                    className="border-1 rounded-lg "
                    type="password"
                    placeholder=""
                    {...register("Password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                </div>
                <input
                  type="submit"
                  value="Sign Up"
                  className="text-indigo-800 bg-indigo-100 rounded-3xl px-4 py-2 hover:underline font-semibold"
                />
              </form>
            </div>
          </MagicCard>
          <div className="flex flex-row justify-between">
            <Link to="/">
              Back
            </Link>
            <Link to="/login" className="text-indigo-800 hover:underline">
              Have An Account?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
