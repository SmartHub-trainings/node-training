const token = localStorage.getItem("token");
async function createAnArticle(info) {
  try {
    const res = await fetch("http://localhost:6005/articles", {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    location.href = "http://127.0.0.1:5500/trainings/my-blog-client/login.html";
  }
}
async function getUserDetails(info) {
  try {
    console.log(token);
    const res = await fetch("http://localhost:6005/users/a-user", {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);

    if (data.error) {
      location.href =
        "http://127.0.0.1:5500/trainings/my-blog-client/login.html";
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
getUserDetails();

async function getDataFromForm(event) {
  try {
    event.preventDefault();
    const title = get(".title").value;
    const category = get(".category").value;
    const content = get(".content").value;
    const body = { title, category, content };
    console.log(body);
    const article = await createAnArticle(body);
  } catch (error) {
    console.log(error);
    location.href = "http://127.0.0.1:5500/trainings/my-blog-client/login.html";
  }
}

get("#create-article").addEventListener("click", getDataFromForm);
