const loginForm = document.getElementById("loginForm");
const dashboard = document.getElementById("dashboard");
const userSpan = document.getElementById("user");
const message = document.getElementById("message");
const logoutBtn = document.getElementById("logoutBtn");

// Check session on page load
fetch("/me")
  .then(res => {
    if (!res.ok) throw new Error();
    return res.json();
  })
  .then(data => {
    showDashboard(data.user.username);
  })
  .catch(() => {
    showLogin();
  });

// Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (res.ok) {
    showDashboard(username);
  } else {
    message.textContent = "Invalid login";
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await fetch("/logout", { method: "POST" });
  showLogin();
});

function showDashboard(username) {
  loginForm.classList.add("hidden");
  dashboard.classList.remove("hidden");
  userSpan.textContent = username;
  message.textContent = "";
}

function showLogin() {
  loginForm.classList.remove("hidden");
  dashboard.classList.add("hidden");
}
