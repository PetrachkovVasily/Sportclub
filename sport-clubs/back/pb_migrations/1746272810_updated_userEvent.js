/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3118530537")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3350338852",
    "hidden": false,
    "id": "relation1641014600",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "userWorkoutActivity_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3118530537")

  // remove field
  collection.fields.removeById("relation1641014600")

  return app.save(collection)
})
