/* Open when someone clicks on the span element */

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
// openNav();
closeNav();

document.getElementById("btn").addEventListener("click", openNav);

const overlayContent = document.getElementById("overlay-content");
const apikey = "api_key=462819e074a0c3c53777a43a7e531bc7";
const base_url = "https://api.themoviedb.org/3";
const img_url = "https://image.tmdb.org/t/p/w500";
let a = localStorage.getItem("movieid");
let data = JSON.parse(a);
function fetchVideos() {
  fetch(base_url + "/movie/" + data.id + "/videos?" + apikey)
    .then((res) => {
      return res.json();
    })
    .then((dataa) => {
      if (dataa) {
        document.getElementById("poster").innerHTML = `<img src="${
          img_url + data.poster_path
        }"
alt="image"
class="img"
/>
<h3 id="raiting">Ratings  ${data.vote_average}</h3>
`;

        document.getElementById("title").innerHTML = data.title;
        document.getElementById("overview").innerHTML = data.overview;

        if (dataa.results.length > 0) {
          let embed = [];
          let dots = [];
          dataa.results.map((video, idx) => {
            // console.log(video);
            if (video.site == "YouTube") {
              embed.push(
                `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.key}" title="${video.name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                `
              );

              dots.push(`
              <span class="dot">${idx + 1}</span>
              `);
            }
          });
          var content = `
          <h1 class="videomovie">${data.original_title}</h1><br/>
          ${embed.join("")}
          <br/>
          <div class="dots">${dots.join("")}</div>
          `;
          overlayContent.innerHTML = content;
          activeslide = 0;
          showvideos();
        } else {
          overlayContent.innerHTML = "<h1>No Results Found</h1>";
        }
      }
    });
}

var activeslide = 0;
var totvideos = 0;

function showvideos() {
  let embedclasses = document.querySelectorAll(".embed");
  let dots = document.querySelectorAll(".dot");

  totvideos = embedclasses.length;
  embedclasses.forEach((embdtag, idx) => {
    if (activeslide == idx) {
      embdtag.classList.add("show");
      embdtag.classList.remove("hide");
    } else {
      embdtag.classList.add("hide");
      embdtag.classList.remove("show");
    }
  });

  dots.forEach((dot, indx) => {
    if (activeslide == indx) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}
const leftarrow = document.getElementById("left-arrow");
const rightarrow = document.getElementById("right-arrow");

leftarrow.addEventListener("click", () => {
  if (activeslide > 0) {
    activeslide--;
  } else {
    activeslide = totvideos - 1;
  }
  showvideos();
});
rightarrow.addEventListener("click", () => {
  if (activeslide < totvideos - 1) {
    activeslide++;
  } else {
    activeslide = 0;
  }
  showvideos();
});

function fetchSimilarVideos() {
  fetch(base_url + "/movie/" + data.id + "/similar?" + apikey)
    .then((res) => {
      return res.json();
    })
    .then((dataa) => {
      showData(dataa.results);
    });
}

const main = document.querySelector("main");
function showData(data) {
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
    </div>
    <div class="overview">
    <h3>Overview</h3>
     ${i.overview}
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

function fetchReviews() {
  fetch(base_url + "/movie/" + data.id + "/reviews?" + apikey)
    .then((res) => {
      return res.json();
    })
    .then((dataa) => {
      if (dataa) {
        showreviews(dataa.results);
      }
    });
}

function showreviews(data) {
  // console.log(data);
  data.forEach((review) => {
    let img = review.author_details.avatar_path;
    let image = img.slice(1, img.length);
    let date = review.created_at;
    let showdate = date.slice(0, 10);
    let reviews = document.getElementById("reviews");
    const revieww = document.createElement("div");
    revieww.classList.add("review");
    revieww.innerHTML = `
    
    <div class="review">
    <div class="review-header">
    <div class="user">
    <img src="${image}" alt="img" class="avatar" />
    
    <div class="name">${review.author}</div>
  </div>
</div>
<div class="content">
  ${review.content}
  <div class="date">Posted on : ${showdate}</div>

</div>
</div>
`;
    reviews.appendChild(revieww);
  });
}
fetchReviews();
fetchVideos();
fetchSimilarVideos();
