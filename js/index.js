// !===================================>HTML ELEMENTS
const openSideNav = document.getElementById("openSideNav");
const closeSideNav = document.getElementById("closeSideNav");
const nowPlaying = document.getElementById("nowPlaying");
const popular = document.getElementById("popular");
const topRated = document.getElementById("topRated");
const trending = document.getElementById("trending");
const upcoming = document.getElementById("upcoming");
const Search = document.getElementById("Search");

// ^===================================>loading screen
$(document).ready(function () {
  $("#loadingScreen").fadeOut(1000, function () {
    $("body").css("overflow", "auto");
    $("#loadingScreen").remove();
    getMovies()
  });
});
$("section").ready(function () {
  $("#innerLoadingScreen").fadeOut(1000, function () {
    $("#innerLoadingScreen").remove();
  });
});
function opensidnav() {
  $(".nav-tab").animate({ marginLeft: "0" }, 500);
  openSideNav.classList.replace("d-block", "d-none");
  closeSideNav.classList.replace("d-none", "d-block");
}

function closesideNav() {
  $(".nav-tab").animate({ marginLeft: "-341" }, 500);
  closeSideNav.classList.replace("d-block", "d-none");
  openSideNav.classList.replace("d-none", "d-block");
}
$("#openSideNav").click(opensidnav);
$("#closeSideNav").click(closesideNav);

//^=============================================================>
$(window).scroll(function () {
  let sectionOffset = $(".searchContainer").offset().top;
  let windowScroll = $(window).scrollTop();
  if (windowScroll > sectionOffset) {
    $(".upIcon").css("display", "flex");
  } else {
    $(".upIcon").css("display", "none");
  }
});
$(".upIcon").click(function () {
  $("html,body").animate({ scrollTop: 0 }, 700);
});
/********************MOvies******************************* */
let search = document.getElementById("search");
search.addEventListener("keyup", function () {
  if (search.value == "") {
    getMovies();
  } else {

    show(search.value);
  }
});
async function show(term) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ0MjRjMjBiY2E1MTBiMDU2NzViYjAwMGYyOThiYyIsInN1YiI6IjY0ZTcyZjUwNTI1OGFlMDEyY2E0NzM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2HIZPh6Ji79TGDoWLgYkdYkTSI-1i_VzYYq00FkG1w",
    },
  };
  let req = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${term}&api_key=e0d424c20bca510b05675bb000f298bc=en-US&include_adult=false`,
    options
  );

  let showList = (await req.json()).results;

  display(showList, "Search");
}
/*************************End Movies**************************************** */ //
$("li").click(function () {
  if (this.innerHTML == "Now Playing") {
    topRated.innerHTML = "";
    popular.innerHTML = "";
    upcoming.innerHTML = "";
    Search.innerHTML = "";
    getMovies();
    closesideNav();
  } else if (this.innerHTML == "Popular") {
    topRated.innerHTML = "";
    popular.innerHTML = "";
    upcoming.innerHTML = "";
    Search.innerHTML = "";
    getpopular();
    closesideNav();
  } else if (this.innerHTML == "Top Rated") {
    topRated.innerHTML = "";
    popular.innerHTML = "";
    upcoming.innerHTML = "";
    Search.innerHTML = "";
    getTopRated();
    closesideNav();
  } else if (this.innerHTML == "Trending") {
    topRated.innerHTML = "";
    popular.innerHTML = "";
    upcoming.innerHTML = "";
    Search.innerHTML = "";
    getTrending();
    closesideNav();
  } else if (this.innerHTML == "Upcoming") {
    topRated.innerHTML = "";
    popular.innerHTML = "";
    upcoming.innerHTML = "";
    Search.innerHTML = "";
    getUpcoming();
    closesideNav();}
    else if (this.innerHTML == "search") {
      topRated.innerHTML = "";
      popular.innerHTML = "";
      upcoming.innerHTML = "";
      trending.innerHTML = "";
      show()
      closesideNav();}

});
/*******************************display Api*************************************** */
function display(showList, id) {
  let temp = "";

  showList.forEach((item) => {
    if (item.poster_path == null) {
      temp += ` 
      <div class="col-md-4">
      <div class="item rounded border border-info position-relative p-3">
        <img src="images/default-movie.jpg" class="w-100 rounded-top" />
        <div class="layer m-auto pt-4">
          <h2 class="title text-center">${item.original_title}</h2>
          <p class="desc">${item.overview}</p>
          <span class="vote">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
          </span>

          <div class="vote position-absolute rounded-circle p-3 m-3 border border-2  border-success stert-0">
            ${item.vote_average?.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
      `;
    } else {
      //?.split().slice(0, 3)//
      temp += ` <div class="col-md-4">
          <div class="item rounded border border-info position-relative">
              <img src="${"https://image.tmdb.org/t/p/w500" + item.poster_path
        }" class="w-100 rounded-top ">
  
  
              <div class="layer p-3">
                  <h2 class="title text-center">${item.original_title}</h2>
                  <p class="desc">${item.overview}</p>
                  <span class="vote">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star-half-stroke"></i>
                  </span>
                  <div class="position-absolute rounded-circle p-3 m-3 border border-success  stert-0">${item.vote_average
        }</div>
              </div>
          </div>
      </div>  `;
    }
  });
  document.getElementById(id).innerHTML = temp;
}

/*********************************ALL api********************************* */

async function getMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ0MjRjMjBiY2E1MTBiMDU2NzViYjAwMGYyOThiYyIsInN1YiI6IjY0ZTcyZjUwNTI1OGFlMDEyY2E0NzM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2HIZPh6Ji79TGDoWLgYkdYkTSI-1i_VzYYq00FkG1w",
    },
  };

  let req = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  );

  let showList = (await req.json()).results;

  display(showList, "nowPlaying");
}

async function getpopular() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ0MjRjMjBiY2E1MTBiMDU2NzViYjAwMGYyOThiYyIsInN1YiI6IjY0ZTcyZjUwNTI1OGFlMDEyY2E0NzM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2HIZPh6Ji79TGDoWLgYkdYkTSI-1i_VzYYq00FkG1w",
    },
  };

  let req = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );

  let showList = (await req.json()).results;

  display(showList, "popular");
}
async function getTopRated() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ0MjRjMjBiY2E1MTBiMDU2NzViYjAwMGYyOThiYyIsInN1YiI6IjY0ZTcyZjUwNTI1OGFlMDEyY2E0NzM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2HIZPh6Ji79TGDoWLgYkdYkTSI-1i_VzYYq00FkG1w",
    },
  };

  let req = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );

  let showList = (await req.json()).results;

  display(showList, "topRated");
}
async function getTrending() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ0MjRjMjBiY2E1MTBiMDU2NzViYjAwMGYyOThiYyIsInN1YiI6IjY0ZTcyZjUwNTI1OGFlMDEyY2E0NzM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2HIZPh6Ji79TGDoWLgYkdYkTSI-1i_VzYYq00FkG1w",
    },
  };

  let req = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  );

  let showList = (await req.json()).results;

  display(showList, "trending");
}
async function getUpcoming() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ0MjRjMjBiY2E1MTBiMDU2NzViYjAwMGYyOThiYyIsInN1YiI6IjY0ZTcyZjUwNTI1OGFlMDEyY2E0NzM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2HIZPh6Ji79TGDoWLgYkdYkTSI-1i_VzYYq00FkG1w",
    },
  };

  let req = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    options
  );
  let showList = (await req.json()).results;

  display(showList, "upcoming");
}

/*  nowPlaying.innerHTML = "";
${item.vote_average?.split().slice(0, 5)}
*/

/////////////////////////////////////////////////
