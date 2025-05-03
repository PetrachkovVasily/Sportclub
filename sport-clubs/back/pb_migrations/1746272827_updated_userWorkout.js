/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350338852")

  // update collection data
  unmarshal({
    "name": "userWorkoutActivity"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350338852")

  // update collection data
  unmarshal({
    "name": "userWorkout"
  }, collection)

  return app.save(collection)
})
