// import axios from "axios";

// export default {
//   searchAPIPost: function(query) {
//     return axios.post("https://api.nutritionix.com/v1_1/search", 
//       {
//           "appId": "e9a7abab",
//           "appKey": "0317c2e6f364bedfefb7d162aa830611",
//           "query": query,
//           "contentType": "application/json",
//           "filters": {
//             "not": {
//                 "item_type": 2
//             }
//           }
//       }
//     );
//   },

//   searchAPIGet: function(query) {
//     return axios.get(query);
//   },
//   // Gets all books
//   getUserData: function() {
//     return axios.get("/api/userData");
//   },

//   updateDate: function(id, update) {
//     console.log(id);
//     return axios.put('/api/userData/' + id, update)
//   },
//   // Gets the book with the given id
//   getBook: function(id) {
//     return axios.get("/api/userData/" + id);
//   },
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/userData/" + id);
//   },
//   // Saves a book to the database
//   saveDate: function(userData) {
//     return axios.post("/api/userData", userData);
//   }
// };
