export default function auth(reqLevel, redirectPage = "/") {
  const currentLevel = JSON.parse(sessionStorage.getItem("level"));
  if (currentLevel !== reqLevel) {
    window.location.assign(redirectPage);
  }
}
