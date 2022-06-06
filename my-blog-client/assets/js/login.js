async function authLog(info) {
  try {
    const res = await fetch("http://localhost:6005/users/login", {
      method: "POST",
      body: JSON.stringify(info),
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function login(e) {
  e.preventDefault();
  const email = get("#email").value;
  const password = get("#password").value;
  const data = { email, password };
  console.log(data);
  const body = await authLog(data);
  console.log(body);
  // localStorage.setItem("token", body.token);
}

get("button").addEventListener("click", login);
