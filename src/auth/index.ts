const getCookie = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const cookie = params.get("cookie");
  if (cookie) {
    //window.localStorage.setItem("auth-cookie", cookie);
    window.history.replaceState(null, document.title, window.location.pathname);
  }
};

export { getCookie };
