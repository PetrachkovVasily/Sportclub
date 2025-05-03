/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_207790276")

  // update collection data
  unmarshal({
    "name": "goal"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_207790276")

  // update collection data
  unmarshal({
    "name": "goals"
  }, collection)

  return app.save(collection)
})
