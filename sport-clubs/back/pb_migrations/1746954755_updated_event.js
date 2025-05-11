/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4041782348")

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2682478530",
    "hidden": false,
    "id": "relation1629030962",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "club_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4041782348")

  // remove field
  collection.fields.removeById("relation1629030962")

  return app.save(collection)
})
