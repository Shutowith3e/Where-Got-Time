import supabase from "@/helper/supabaseClient";
import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

// create base url to for be call
// convert the be snake case to camel case for fe use
const axiosInstance = applyCaseMiddleware(
  axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000",
  }),
  {
    ignoreHeaders: true,
    ignoreParams: true,
    // stripRegexp is the same by default
    caseOptions: { stripRegexp: /[^A-Z0-9[\]]+/gi },
  }
);

// add jwt token to headers before req is sent
axiosInstance.interceptors.request.use(async (context) => {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    context.headers.Authorization = `Bearer ${data.session.access_token}`;
  }

  return context;
});

export default axiosInstance;
