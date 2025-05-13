/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350338852")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3118530537",
    "hidden": false,
    "id": "relation2764338602",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "userEvent_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350338852")

  // remove field
  collection.fields.removeById("relation2764338602")

  return app.save(collection)
})
