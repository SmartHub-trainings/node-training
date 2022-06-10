// fetch("http://localhost:6005/articles")
//   .then((res) => res.json())
//   .then((data) => console.log(data))

//   .catch((err) => console.log(err));

async function getArticles(page) {
  try {
    const res = await fetch(
      "http://localhost:6005/articles?limit=10&page=" + page
    );
    const data = await res.json();
    get(".loader").style.display = "none";
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function main(page) {
  const data = await getArticles(page);
  console.log(data);
  const ul = get("ul");
  let li = "";
  data.data.forEach((article, idx) => {
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
  li = li + "<button style='margin-top:50px;' id='next'>Next</button>";
  ul.innerHTML = li;
  get("#next").addEventListener("click", () => {
    if (page + 1 <= data.pages) {
      page = page + 1;

      main(page);
    }
  });
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

main(1);
