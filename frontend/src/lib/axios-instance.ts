import supabase from "@/helper/supabaseClient";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000",
});

axiosInstance.interceptors.request.use(async (context) => {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    context.headers.Authorization = `Bearer ${data.session.access_token}`;
  }

  return context;
});

export default axiosInstance;
