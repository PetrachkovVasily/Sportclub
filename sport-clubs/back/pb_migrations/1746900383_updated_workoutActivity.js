/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_868223819")

  // remove field
  collection.fields.removeById("relation2176868502")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_868223819")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3963244867",
    "hidden": false,
    "id": "relation2176868502",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "activity_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
