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
      await newData.save()
    }
  }

  for (const name in cities) {
    const data = resources[name]
    if (data) {
      const newData = new City({
        name,
      })
      await newData.save()
    }
  }

  await db.disconnect()
  process.exit(1)
})()
