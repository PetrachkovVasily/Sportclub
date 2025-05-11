/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4123821208")

  // remove field
  collection.fields.removeById("relation1912072331")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4123821208")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4041782348",
    "hidden": false,
    "id": "relation1912072331",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "event_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
