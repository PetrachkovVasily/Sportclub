/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2682478530")

  // remove field
  collection.fields.removeById("relation3018627582")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2682478530")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_1719819397",
    "hidden": false,
    "id": "relation3018627582",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "achievement_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
