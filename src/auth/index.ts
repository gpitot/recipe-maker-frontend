const getCookie = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const cookie = params.get("cookie");

  console.log("[g] cookie is ", cookie);
  if (cookie) {
    window.localStorage.setItem("auth-cookie", cookie);
  }
};

export { getCookie };
