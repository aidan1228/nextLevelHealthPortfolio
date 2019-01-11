import axios from "axios";

export default {
  searchAPIPost: function(query) {
    return axios.post("https://api.nutritionix.com/v1_1/search", 
      {
          "appId": "e9a7abab",
          "appKey": "0317c2e6f364bedfefb7d162aa830611",
          "query": query,
          "contentType": "application/json",
          "filters": {
            "not": {
                "item_type": 2
            }
          }
      }
    );
  },

  searchAPIGet: function(query) {
    return axios.get(query);
  },
  // Gets all books
  getUserData: function(accessToken, username) {
    const headers = {'Authorization': `Bearer ${accessToken}`}
    console.log("headers: ", headers);
    return axios.get("/api/userData/" + username, { headers });
  },

  getTodaysData: function(accessToken, username) {
    const headers = {'Authorization': `Bearer ${accessToken}`}
    console.log("headers: ", headers);
    return axios.get("/api/userData/date/" + username, { headers });
  },

  updateDate: function(id, update) {
    console.log(id);
    return axios.put('/api/userData/' + id, update)
  },
  
  saveDate: function(accessToken, userData) {
    const headers = {'Authorization': `Bearer ${accessToken}`}
    return axios.post("/api/userData", userData, { headers });
  }
};
