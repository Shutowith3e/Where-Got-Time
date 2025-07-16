import { MagicCard } from "@/components/magicui/magic-card";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "@/context/AuthContext";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm();
  const { login, loginError } = useAuth();

  // navigate when logged in
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    const isSuccess = await login(email, password);

    if (isSuccess) {
      navigate("/mainUser");
    }
  };

  return (
    <>
      <div className="w-full shadow-none border-none flex justify-center items-center min-h-dvh flex-col bg-gradient-to-b from-rose-900/60 ">
        <div className="flex flex-col gap-2">
          <MagicCard gradientColor="262626" className="mx-auto rounded-2xl p-8 px-12">
            <div className="flex flex-col gap-4">
              <img src="/logo.png" className="h-8 mx-auto"></img>
              <h2 className="text-center text-lg font-semibold">Login</h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-rows-2">
                  <label>Email </label>{" "}
                  <input
                    className="border-1 rounded-lg px-3 p-1 text-sm"
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
                    className="border-1 rounded-lg text-sm px-3 p-1"
                    type="password"
                    placeholder="Enter Your Password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                </div>

                <input
                  type="submit"
                  value="Log In"
                  className="text-rose-800 bg-rose-400/15 rounded-3xl px-4 py-2 font-semibold hover:underline"
                />
                {loginError && (
                  <span className="text-center text-sm mt-2 text-red-600 font-semibold">
                    {loginError.message}
                  </span>
                )}
              </form>
            </div>
          </MagicCard>
          <div className="flex flex-row justify-between">
            <Link to="/">Back</Link>
            <Link to="/signup" className="text-rose-800 hover:underline">
              Don't Have An Account?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
