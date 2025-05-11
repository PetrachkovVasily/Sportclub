/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3963244867")

  // remove field
  collection.fields.removeById("relation1569515225")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3963244867")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_868223819",
    "hidden": false,
    "id": "relation1569515225",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "workoutActivity",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
