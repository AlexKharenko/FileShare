import router from "@/router";
import store from "../store/index";

export default async function statusHandler(response) {
  const { status } = response;
  const JSONResponse = await response.json();
  if (status >= 200 && status < 300) {
    return JSONResponse;
  } else {
    if (status === 401) {
      store.commit("setIsAuthenticated", false);
      return router.push("/login");
    } else if (status === 400) {
      store.dispatch("setErrorMessage", JSONResponse.message);
      return JSONResponse;
    } else if (status === 403) {
      return router.push("/");
    } else if (status === 404) return router.push("/404");
    else if (status >= 500) return router.push("/500");
    else {
      return await response.json();
    }
  }
}
