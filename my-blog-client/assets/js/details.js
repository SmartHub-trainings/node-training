async function getArticles() {
  try {
    const id = localStorage.getItem("article_id");
    console.log(id);
    const res = await fetch("http://localhost:6005/articles/" + id);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

getArticles();
