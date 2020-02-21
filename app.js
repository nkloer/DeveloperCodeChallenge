'use strict';

const yelp = require('yelp-fusion');

const apiKey = 'bGjwk70663lZrFXl3rZgMcX_wbvmt4wV2GWyyowrxwvCJOeBtgi_k-uEGZn3pT68E1gI-UtBltYheZ51QEi9oYCFp3FDEQAekFiHziYqMh0m8VGXvnxHS5sqCalOXnYx';

const searchRequest = {
  location: 'alpheretta, ga',
  term: 'food',
  categories: 'icecream, all',
  sort_by: 'rating'
};

const client = yelp.client(apiKey);


let checkCity = []
let entry = []
let finalArray = []


var promise = new Promise(function (resolve, reject) {

  client.search(searchRequest).then(response => {

    // allResults containes all results that meet search req
    const allResults = response.jsonBody.businesses;

    //prettyJson is the prettifed version
    const prettyJson = JSON.stringify(allResults, null, 4);

    //checks the buisness's location according to location.city
    let alpharettaIceCream = allResults.filter(function (el) {
      return el.location.city = "alpharetta"
    })

    //loop to begin populating array with what we want
    for (let i = 0; i < alpharettaIceCream.length; i++) {
      checkCity = alpharettaIceCream[i].location.display_address[1]
    
    //checks the city in the display_address if buisness is actually in Alpharetta before pushing it,
      if (checkCity.includes('Alpharetta,')) {
        entry.push({
          name: alpharettaIceCream[i].name,
          alias: alpharettaIceCream[i].alias,
          rating: alpharettaIceCream[i].rating,
          address: alpharettaIceCream[i].location.display_address[0] + " " + alpharettaIceCream[i].location.city,
          review: "",
          user: ""
        })
      }
    }
    resolve()
  });
}
).then(function () {
  //for loop runs through reviews, looking at the current entry's alias to get the user and the review
  for (let i = 0; i < 5; i++) {
    client.reviews(entry[i].alias).then(response => {
      let storeReview = response.jsonBody.reviews[0];
      entry[i].review = storeReview.text;
      entry[i].user = storeReview.user.name;
      finalArray.push(entry[i])
      if (finalArray.length === 5) {
        console.log(finalArray);
      }
    }, function (err) {
      console.log(err)
    })
  }
}

)