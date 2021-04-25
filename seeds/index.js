require("dotenv").config()
const { connectToDatabase } = require("../src/lib/mongo")
const City = require("../src/schemas/city")
const Resource = require("../src/schemas/resource")
const cities = require("./cities.json")
const resources = require("./resources.json")

;(async () => {
  const db = await connectToDatabase()

  for (const name in resources) {
    const data = resources[name]
    if (data) {
      const newData = new Resource({
        name,
        searchTerm: data,
      })
      
      Resource.find({name: newData.name}, (err, docs) => {
        if(!docs.length){
          await newData.save()
        }else{
          console.log("Resource Already Exists:", newData.name)
          throw new Error("Resource Already Exists!")
        }
      })

    }
  }

  for (const name in cities) {
    const data = resources[name]
    if (data) {
      const newData = new City({
        name,
      })

      City.find({name: newData.name}, (err, docs) => {
        if(!docs.length){
          await newData.save()
        }else{
          console.log("City Already Exists:", newData.name)
          throw new Error("City Already Exists!")
        }
      })
    }
  }

  await db.disconnect()
  process.exit(1)
})()
