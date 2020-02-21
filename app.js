// $.ajax({
//     url: "https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco/reviews",
//     type: "GET",
//     crossDomain: true,
//     headers: {
//         'Authorization': 'Bearer bGjwk70663lZrFXl3rZgMcX_wbvmt4wV2GWyyowrxwvCJOeBtgi_k-uEGZn3pT68E1gI-UtBltYheZ51QEi9oYCFp3FDEQAekFiHziYqMh0m8VGXvnxHS5sqCalOXnYx' 
//     },
// success: data => {
//     console.log(data);
// },
// error: e => {
//     console.log(e);
// }
// })

'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'bGjwk70663lZrFXl3rZgMcX_wbvmt4wV2GWyyowrxwvCJOeBtgi_k-uEGZn3pT68E1gI-UtBltYheZ51QEi9oYCFp3FDEQAekFiHziYqMh0m8VGXvnxHS5sqCalOXnYx';

const searchRequest = {
  location: 'alpheretta, ga',
  term: 'food',
  categories: 'icecream, all',
  sort_by: 'rating'
};

const client = yelp.client(apiKey);


client.search(searchRequest).then(response => {
  const allResults = response.jsonBody.businesses;
  const prettyJson = JSON.stringify(allResults, null, 4);
  let alpherettaIceCream = allResults.filter(function (el) {
    return el.location.city = "alpheretta"
  });
  let topFive = alpherettaIceCream.slice(0, 5)
  let reviewAlias = topFive.filter(function (el) {
    return el.alias
})
//   let topFiveReviews = topFive.forEach(reviews(topFive.alias))
  console.log(reviewAlias);
}).catch(e => {
  console.log(e);
});

function reviews(storeId) {
    client.reviews(storeId).then(response => {
        console.log(response.jsonBody.reviews[0].text);
      }).catch(e => {
        console.log(e);
      });
}