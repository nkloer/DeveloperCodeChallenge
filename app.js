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

  // all Rsults is the raw, pre-prettified json
  const allResults = response.jsonBody.businesses;

  // this is all the results, but in a more readable format
  const prettyJson = JSON.stringify(allResults, null, 4);

  // top rated ice cream stores in alpheretta in order of rating
  let alpherettaIceCream = allResults.filter(function (el) {
    return el.location.city = "alpheretta"
  });

  // top five of alpherettaIceCream
  let topFive = alpherettaIceCream.slice(0, 5)

  //getReviews gets all the reviews and displays them of the top5 icecream places
  for (let i = 0; i < topFive.length; i++) {
    getReviews(topFive[i].id)
  }
//   let topFiveReviews = topFive.forEach(reviews(topFive.alias))
  console.log(topFive);
}).catch(e => {
  console.log(e);
});

function getReviews(storeId) {
    client.reviews(storeId).then(response => {
        console.log(response.jsonBody.reviews[0].text);
      }).catch(e => {
        console.log(e);
      });
}