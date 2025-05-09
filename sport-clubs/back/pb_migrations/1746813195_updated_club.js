/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2682478530")

  // remove field
  collection.fields.removeById("relation306617826")

  // add field
  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "select105650625",
    "maxSelect": 1,
    "name": "category",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "running",
      "workout",
      "busketball",
      "football",
      "swimming",
      "other"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2682478530")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1174553048",
    "hidden": false,
    "id": "relation306617826",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "category_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("select105650625")

  return app.save(collection)
})
