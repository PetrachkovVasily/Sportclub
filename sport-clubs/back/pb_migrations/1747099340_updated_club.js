/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2682478530")

  // update field
  collection.fields.addAt(7, new Field({
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
      "other",
      "no category"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2682478530")

  // update field
  collection.fields.addAt(7, new Field({
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
})
