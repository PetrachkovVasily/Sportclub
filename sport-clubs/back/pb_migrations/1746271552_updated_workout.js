/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4123821208")

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_868223819",
    "hidden": false,
    "id": "relation137580723",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "workoutActivity_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4123821208")

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_868223819",
    "hidden": false,
    "id": "relation137580723",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "workoutActivity_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
