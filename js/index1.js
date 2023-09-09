// !===================================>HTML ELEMENTS
const openSideNav = document.getElementById("openSideNav");
const closeSideNav = document.getElementById("closeSideNav");

// ^===================================>loading screen
$(document).ready(function () {
  $("#loadingScreen").fadeOut(1000, function () {
    $("body").css("overflow", "auto");
    $("#loadingScreen").remove();
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
/************************************************** */

/********************MOvies******************************* */
let search = document.getElementById("search")
search.addEventListener("keyup", function () {
  if (search.value == "") {
    getMovies()
  } else {
    show(search.value)
  }
})
async function show(term) {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ0MjRjMjBiY2E1MTBiMDU2NzViYjAwMGYyOThiYyIsInN1YiI6IjY0ZTcyZjUwNTI1OGFlMDEyY2E0NzM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2HIZPh6Ji79TGDoWLgYkdYkTSI-1i_VzYYq00FkG1w'
    }
  };
  let req = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false`, options)

  let showList = (await req.json()).results

  display(showList, "Search")

}
/*************************End Movies**************************************** *///
$('li').click(function () {
  if (this.innerHTML == "Now Playing") {
    getMovies()
    closesideNav()
  } else if (this.innerHTML == 'Popular') {
    getpopular()
    closesideNav()
  }
  else if (this.innerHTML == 'Top Rated') {
    getTopRated()
    closesideNav()
  }
  else if (this.innerHTML == 'Trending') {
    getTrending()
    closesideNav()
  }
  else if (this.innerHTML == 'Upcoming') {
    getUpcoming()
    closesideNav()
  }

})
function display(showList, id) {
  let temp = ""


  showList.forEach((item) => {

    if (item.poster_path == null) {
      temp += ` <div class="col-md-4">
          <div class="item rounded position-relative border border-info text-center">
         <img src="images/default-movie.jpg" class="w-100 rounded-top ">
         <div class="layer ">
         <h2>${item.original_title}</h2> 
         <p>${item.overview}</p>
         <div class="position-absolute rounded-circle p-3 m-3 bg-info  stert-0">${item.vote_average}</div>   
         </div>
          </div>   
          </div> `
    }

    else {

      temp += ` <div class="col-md-4">
          <div class="item rounded position-relative border border-info text-center">
              <img src="${'https://image.tmdb.org/t/p/w500' + item.poster_path}" class="w-100 rounded-top ">
  
  
              <div class="layer ">
                  <h2>${item.original_title}</h2>
                  <p>${item.overview}</p>
                  <div class="position-absolute rounded-circle p-3 m-3 bg-info  stert-0">${item.vote_average}</div>
              </div>
          </div>
      </div>  `

    }


  })
  document.getElementById(id).innerHTML = temp
}

/**********************************Get***************************************** */
async function getMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ0MjRjMjBiY2E1MTBiMDU2NzViYjAwMGYyOThiYyIsInN1YiI6IjY0ZTcyZjUwNTI1OGFlMDEyY2E0NzM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2HIZPh6Ji79TGDoWLgYkdYkTSI-1i_VzYYq00FkG1w'
    }
  };

  let req = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)

  let showList = (await req.json()).results

  display(showList, "nowPlaying")
}
async function getpopular() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ0MjRjMjBiY2E1MTBiMDU2NzViYjAwMGYyOThiYyIsInN1YiI6IjY0ZTcyZjUwNTI1OGFlMDEyY2E0NzM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2HIZPh6Ji79TGDoWLgYkdYkTSI-1i_VzYYq00FkG1w'
    }
  };

  let req = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)

  let showList = (await req.json()).results

  display(showList, "popular")
}
async function getTopRated() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ0MjRjMjBiY2E1MTBiMDU2NzViYjAwMGYyOThiYyIsInN1YiI6IjY0ZTcyZjUwNTI1OGFlMDEyY2E0NzM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2HIZPh6Ji79TGDoWLgYkdYkTSI-1i_VzYYq00FkG1w'
    }
  };

  let req = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)



  let showList = (await req.json()).results

  display(showList, "topRated")
}
async function getTrending() {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ0MjRjMjBiY2E1MTBiMDU2NzViYjAwMGYyOThiYyIsInN1YiI6IjY0ZTcyZjUwNTI1OGFlMDEyY2E0NzM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2HIZPh6Ji79TGDoWLgYkdYkTSI-1i_VzYYq00FkG1w'
    }
  };

  let req = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)

  let showList = (await req.json()).results

  display(showList, "trending")
}
async function getUpcoming() {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ0MjRjMjBiY2E1MTBiMDU2NzViYjAwMGYyOThiYyIsInN1YiI6IjY0ZTcyZjUwNTI1OGFlMDEyY2E0NzM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._2HIZPh6Ji79TGDoWLgYkdYkTSI-1i_VzYYq00FkG1w'
    }
  };

  let req = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
  let showList = (await req.json()).results

  display(showList, "upcoming")
}
/**********************************Get***************************************** */
/*********************************DATA USER********************************* */

/*********************************DATA USER********************************* */
/**$('#contact #name').on("input",function(){
  const regex = /^[a-zA-z\s]{1,36}$/
  const $error =  $('#name').next();
  const $this = $(this);
  if($(this).val() == "")
  {
    hideError($error,$this);
  }
  else if(regex.test($(this).val()))
  {
    hideError($error,$this);
  }
  else
  {
    $error.html("Invalid Name , only Characters allowed");
    ShowError($error,$this);
  }
})
$('#contact #email').on("input",function(){
  const regex = /^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{3}$/;
  const $error =  $('#email').next();
  const $this = $(this);
  if($(this).val() == "")
  {
      hideError($error,$this);
  }
  else if(regex.test($(this).val()))
  {
      hideError($error,$this);
  }
  else
  {
    $error.html("Invalid Email , try example@domain.com");
    ShowError($error,$this);
  }
})
$('#contact #phone').on("input",function(){
  const regex = /^(02)?(01)[0125][0-9]{8}$/;
  const $error =  $('#phone').next();
  const $this = $(this);
  if($(this).val() == "")
  {
      hideError($error,$this);
  }
  else if(regex.test($(this).val()))
  {
      hideError($error,$this);
  }
  else
  {
    $error.html("Invalid Phone Number");
    ShowError($error,$this);
  }
})
$('#contact #age').on("input",function(){
  const regex = /^(1[6-9]|[2-9][0-9]|100)$/;
  const $error =  $('#age').next();
  const $this = $(this);
  if($(this).val() == "")
  {
      hideError($error,$this);
  }
  else if(regex.test($(this).val()))
  {
      hideError($error,$this);
  }
  else
  {
      $error.html("Your age must be over 16+");
    ShowError($error,$this);
  }
})
$('#contact #password').on("input",function(){
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const $error =  $('#password').next();
  const $this = $(this);
  if($(this).val() == "")
  {
      hideError($error,$this);
  }
  else if(regex.test($(this).val()))
  {
      hideError($error,$this);
  }
  else
  {
    $error.html("password must contain numbers & letters at least 8 character");
    ShowError($error,$this);
  }
})
$('#contact #repassword').on("input",function(){
  const $error =  $('#repassword').next();
  const $this = $(this);
  if($(this).val() == "")
  {
      hideError($error,$this);
  }
  else if($(this).val() == $('#password').val())
  {
      hideError($error,$this);
  }
  else
  {
    $error.html("Password not match");
    ShowError($error,$this);
  }
})
$('.showPass').click(function(){
  if ($('#password').attr('type') == "text") 
  {
      $('#password').attr('type','password');
      $('.showPass').html('<i data-show="show" class="fa-solid fa-eye-slash"></i>');
  } else {
      $('#password').attr('type','text');
      $('.showPass').html('<i data-show="show" class="fa-solid fa-eye"></i>');
  }
})
$('#password').focus(function(){
  $('.showPass').css("opacity",1);
  $('.showPass').css("bottom",10);
})
$(document).click(function(e){
  if($(e.target)[0] == $('#password')[0] || $(e.target).attr('data-show') == $('.showPass i').attr('data-show') )
  {
      $('.showPass').css("opacity",1);
      $('.showPass').css("bottom",10);
  }
  else
  {
      $('.showPass').css("opacity",0);
      $('.showPass').css("bottom",-20);
  }
})
function hideError($error,$this)
{
  $this.css("border-bottom-color", "#CED4DA");
  $error.html(null);
  $error.removeClass('animate__animated animate__flipInX');
  $error.addClass('animate__animated animate__fadeOutUp');
}
function ShowError($error,$this)
{
  $this.css("border-bottom-color", "rgb(214, 46, 51)");
  $error.removeClass('animate__animated animate__fadeOutUp');
  $error.addClass('animate__animated animate__flipInX');
}
function formButtonValidation(){
  let buttonLocation =  $(`form button`).css("marginLeft")
      if(buttonLocation == "250px")
      {
         $(`form button`).css({"marginLeft":"0px"});
      }
      else
      {
         $(`form button`).css({"marginLeft":"250px"});
      }
     $(`form button`).keydown(function(e){
         if(e.key == "Enter")
         {
             event.preventDefault();
         }
     })
}

 */



