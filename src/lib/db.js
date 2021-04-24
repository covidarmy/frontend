const uuid = require("uuid")
const { connectToDatabase } = require("./mongo")


var TweetModel = require('../schemas/tweet.js')
var CityModel = require('../schemas/city.js')
var ResModel = require('../schemas/resource.js')

/**
 * @param {string} city
 */
module.exports.addCity = async (city) => {
  const db = await connectToDatabase();

}

/**
 * @param {string} tweetId
 */
module.exports.statusUpvote = async (tweetId) => {
    const db = await connectToDatabase()
    
    TweetModel.findOneAndUpdate({
      id: tweetId
    }, {
      $inc: {
        "status": 1
      }
    },
    function(err, response) {
      if (err) {
        return err;
      } else {
        return response;
      }
    });
}
/**
 * @param {string} tweetId
 */
module.exports.statusDownvote = async (tweetId) => {
      const db = await connectToDatabase()
      
      TweetModel.findOneAndUpdate({
        id: tweetId
      }, {
        $inc: {
          "status": -1
        }
      },
      function(err, response) {
        if (err) {
          return err;
        } else {
          return response;
        }
      });




}

module.exports.getTweets = async (city, resource) => {
  const db = await connectToDatabase()
    
  var query={};
  
    if (typeof city === "string" && typeof resource === "string"){
      
      let key1 = "location."+CityModel;
      query[key1]=true;

      let key2 = "for."+resource;
      query[key2]=true;
    }
    else if (typeof city === "string" ){
      let key = "location."+CityModel;
      query[key]=true;   
     }
    else if(typeof resource === "string"){
        let key = "for."+resource;
        query[key]=true;
    } 

      TweetModel
      .find(query)
      .exec((err, tweet) => {
        if (err) {
          console.log(err);
          return err
        }
        return tweet;
      });

}

module.exports.getAllTweets = async () => {
  const db = await connectToDatabase()
    
  var query={};
  
    TweetModel
      .find(query)
      .exec((err, tweet) => {
        if (err) {
          console.log(err);
          return err
        }
        return tweet;
      });

}

module.exports.getCities = async () => {
  CityModel
  .find({})
  .exec((err, city) => {
    if (err) {
      console.log(err);
      return err
    }
    return city;
  });

}

module.exports.getResources = async () => {
  ResModel
  .find({})
  .exec((err, city) => {
    if (err) {
      console.log(err);
      return err
    }
    return city;
  });

}

module.exports.getCityResources = async () => {
  //return (await store.doc("main/city_resources").get()).data()
  return {};
}
