/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2682478530")

  // remove field
  collection.fields.removeById("relation1680572944")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2682478530")

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_1128838045",
    "hidden": false,
    "id": "relation1680572944",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "admin_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
