/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3129944864")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool1179282302",
    "name": "recieved",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3129944864")

  // remove field
  collection.fields.removeById("bool1179282302")

  return app.save(collection)
})
