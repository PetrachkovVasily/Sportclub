/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3118530537")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool1028501215",
    "name": "isFinished",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3118530537")

  // remove field
  collection.fields.removeById("bool1028501215")

  return app.save(collection)
})
