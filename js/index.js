const apikey = "api_key=462819e074a0c3c53777a43a7e531bc7";
const base_url = "https://api.themoviedb.org/3";
const url1 = base_url + "/discover/movie?sort_by=popularity.desc&" + apikey;
const img_url = "https://image.tmdb.org/t/p/w500";

function getdata(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      putData(data.results);
    });
}

const main = document.querySelector("main");
function putData(data) {
  main.innerHTML = "";
  data.forEach((i) => {
    // console.log(i);
    const newcard = document.createElement("div");
    newcard.classList.add("card");

    newcard.innerHTML = `
    <img
    src="${img_url + i.poster_path}"
    alt="image"
    class="img"
    />
    <div class="about-sec">
      <div class="name">${i.title}</div>
      <div class="mini-text">${i.overview}</div>
      <div class="read-btn">
      <button class="read-more" id="${
        i.id
      }" ><a href="./movie.html" target="_blank">Read More</a></button>
       </div>
    </div>


     `;

    main.appendChild(newcard);
    document.getElementById(i.id).addEventListener("click", () => {
      let movie = i;
      localStorage.setItem("movieid", JSON.stringify(i));
    });
  });
}

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  let search = document.querySelector(".search");
  const searchval = search.value;
  if (searchval) {
    const url2 = base_url + "/search/movie?" + apikey;
    getdata(url2 + "&query=" + searchval);
  } else {
    getdata(url1);
  }
});

getdata(url1);
{
  /* <div id="ratings" class="rating">${i.vote_average}</div> */
}
