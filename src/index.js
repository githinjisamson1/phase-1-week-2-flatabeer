// Code here

function handleDOMContentLoaded() {
  // grab elements
  const ulBeer = document.querySelector("#beer-list");
  const h2 = document.querySelector("#beer-name");
  const image = document.querySelector("#beer-image");
  const em = document.querySelector("#beer-description");
  const formDesc = document.querySelector("#description-form");
  const textareaDesc = document.querySelector("#description");
  const ulReview = document.querySelector("#review-list");
  const formReview = document.querySelector("#review-form");
  const textareaReview = document.querySelector("#review");

  //   fetch API - all
  fetch("http://localhost:3000/beers")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.map((beer) => {
        //   console.log(data);

        const li = document.createElement("li");
        li.textContent = beer.name;
        ulBeer.appendChild(li);
      });
    });

  // fetch API  - 1
  fetch("http://localhost:3000/beers/1")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //   console.log(data);

      //   manipulate the dom
      h2.textContent = data.name;
      image.src = data.image_url;
      em.textContent = data.description;

      //   iterate/display reviews
      data.reviews.map((review) => {
        const li = document.createElement("li");
        li.textContent = review;
        ulReview.appendChild(li);
      });
    });

  // edit beer description
  formDesc.addEventListener("submit", function (e) {
    // console.log(e.target);

    e.preventDefault();
    em.textContent = textareaDesc.value;
    formDesc.reset();
  });

  // add review
  formReview.addEventListener("submit", function (e) {
    // console.log(e.target);

    e.preventDefault();
    const li = document.createElement("li");
    li.textContent = textareaReview.value;
    ulReview.appendChild(li);
    formReview.reset();
  });
}

// waits for markup/HTML to load first
document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
