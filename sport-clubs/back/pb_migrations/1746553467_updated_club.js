/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2682478530")

  // add field
  collection.fields.addAt(12, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_387906101",
    "hidden": false,
    "id": "relation2002166687",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "chatMessage_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2682478530")

  // remove field
  collection.fields.removeById("relation2002166687")

  return app.save(collection)
})
