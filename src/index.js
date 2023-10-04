function handleReviewFormSubmission(e, reviewList) {
  // prevent default refresh behavior
  e.preventDefault();

  //   add new review to page
  const reviewValue = document.querySelector("#review").value;
  const liReview = document.createElement("li");
  liReview.innerHTML = reviewValue;
  reviewList.appendChild(liReview);

  //   clear form values upon submission
  e.target.reset();
}

function handleDescFormSubmission(e, beerDesc) {
  e.preventDefault();

  //   edit description
  const descValue = document.querySelector("#description").value;
  beerDesc.innerHTML = descValue;
  e.target.reset();
}

function allBeersMenu(data) {
  const beerList = document.querySelector("#beer-list");

  //   iterate data received
  data.forEach((beer) => {
    const liBeer = document.createElement("li");
    liBeer.innerHTML = beer.name;
    beerList.appendChild(liBeer);
  });
}

function seeFirstBeerDetails(data) {
  const beerName = document.querySelector("#beer-name");
  const beerImage = document.querySelector("#beer-image");
  const beerDesc = document.querySelector("#beer-description");
  const reviewList = document.querySelector("#review-list");
  const descriptionForm = document.querySelector("#description-form");
  const reviewForm = document.querySelector("#review-form");

  //   manipulate dom
  beerName.innerHTML = data.name;
  beerImage.src = data.image_url;
  beerDesc.innerHTML = data.description;

  //   iterate reviews
  data.reviews.forEach((review) => {
    const liReview = document.createElement("li");
    liReview.innerHTML = review;
    reviewList.appendChild(liReview);
  });

  descriptionForm.addEventListener("submit", (e) => {
    handleDescFormSubmission(e, beerDesc);
  });

  //   review form submission
  reviewForm.addEventListener("submit", (e) => {
    handleReviewFormSubmission(e, reviewList);
  });
}

function handleDOMContentLoaded(e) {
  // fetch API - 1
  fetch("http://localhost:3000/beers/1")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      seeFirstBeerDetails(data);
    })
    .catch((err) => {
      console.log(err);
    });

  // fetch API - all
  fetch("http://localhost:3000/beers")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      allBeersMenu(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// wait HTML to load first
document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
