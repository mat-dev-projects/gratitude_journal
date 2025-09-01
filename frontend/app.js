async function addEntry() {
  const text = document.getElementById("gratitudeText").value;
  if (!text) return alert("Please write something!");

  const res = await fetch("/api/entry/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
 })
  .then(res => res.json())
  .then(data => {
  alert("Saved entry!");
})
 .catch(err => console.error(err));;
  const data = await res.json();
  alert(data.message);
}

async function getRandomEntry() {
  const res = await fetch("/api/entry_random");
  const data = await res.json();
  document.getElementById("randomEntry").innerText = data.text || "No past entries found.";
}

// Authentication helpers (Static Web Apps handles login/logout redirects)
document.getElementById("loginBtn").onclick = () => {
  window.location.href = "/.auth/login/github"; // can be /google, /aad, etc.
};
document.getElementById("logoutBtn").onclick = () => {
  window.location.href = "/.auth/logout";
};

// Check login state
fetch("/.auth/me")
  .then(r => r.json())
  .then(data => {
    if (data.clientPrincipal) {
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("logoutBtn").style.display = "block";
      document.getElementById("app").style.display = "block";
    }
  });
