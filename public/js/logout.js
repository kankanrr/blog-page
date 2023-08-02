const logoutHandler = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/");
    alert("Now logged out.");
  } else {
    alert("Error logging out.");
  }
};

document.querySelector("#logout").addEventListener("click", logoutHandler);
