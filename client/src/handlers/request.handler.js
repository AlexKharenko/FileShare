import store from "../store";

const preRequestSend = (loading) => {
  if (loading) store.dispatch("setLoadingStatus", true);
  store.dispatch("resetErrorMessage");
};

const afterRequestSend = () => {
  store.dispatch("setLoadingStatus", false);
};

export async function postRequest(
  address = "",
  data = "",
  loading = true,
  credentials = true,
  url = ""
) {
  preRequestSend(loading);
  const response = await fetch(
    `${url || process.env.VUE_APP_SERVER_URL}${address}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: !credentials ? "same-origin" : "include",
      body: JSON.stringify(data),
    }
  );
  afterRequestSend();
  return response;
}

export async function patchRequest(
  address = "",
  data = "",
  loading = true,
  credentials = true,
  url = ""
) {
  preRequestSend(loading);
  const response = await fetch(
    `${url || process.env.VUE_APP_SERVER_URL}${address}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: !credentials ? "same-origin" : "include",
      body: JSON.stringify(data),
    }
  );
  afterRequestSend();
  return response;
}

export async function updateRequest(
  address = "",
  data = "",
  loading = true,
  credentials = true,
  url = ""
) {
  preRequestSend(loading);
  const response = await fetch(
    `${url || process.env.VUE_APP_SERVER_URL}${address}`,
    {
      method: "UPDATE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: !credentials ? "same-origin" : "include",
      body: JSON.stringify(data),
    }
  );
  afterRequestSend();
  return response;
}

export async function getRequest(
  address = "",
  loading = true,
  credentials = true,
  url = ""
) {
  preRequestSend(loading);
  const response = await fetch(
    `${url || process.env.VUE_APP_SERVER_URL}${address}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: !credentials ? "same-origin" : "include",
    }
  );
  afterRequestSend();
  return response;
}

export async function deleteRequest(
  address = "",
  loading = true,
  credentials = true,
  url = ""
) {
  preRequestSend(loading);
  const response = await fetch(
    `${url || process.env.VUE_APP_SERVER_URL}${address}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: !credentials ? "same-origin" : "include",
    }
  );
  afterRequestSend();
  return response;
}
