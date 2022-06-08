// fetch("http://localhost:6005/articles")
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

async function getArticles() {
  try {
    const res = await fetch("http://localhost:6005/articles?limit=10&page=1");
    const data = await res.json();
    get(".loader").style.display = "none";
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  const data = await getArticles();
  const ul = get("ul");
  let li = "";
  data.forEach((article, idx) => {
    li =
      li +
      `  <li>
          <div>
            <img src="./assets/images/image_7781.jpg" alt="" />
          </div>
          <div>
            <h3>${article.title}</h3>
            <p>${article.content.substr(0, 10)}...</p>
            <a href="details.html" data-id="${article._id}">Read More</a>
          </div>
        </li>`;
  });
  ul.innerHTML = li;
  getAll("a").forEach((tag) => {
    console.log("this");
    tag.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.setItem("article_id", e.target.dataset.id);
      console.log(location.href);
      location.href =
        "http://127.0.0.1:5500/trainings/my-blog-client/details.html";
    });
  });
}

main();
