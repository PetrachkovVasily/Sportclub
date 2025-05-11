/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4041782348")

  // remove field
  collection.fields.removeById("date2393256231")

  // remove field
  collection.fields.removeById("date4098681852")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2393256231",
    "max": 0,
    "min": 0,
    "name": "startTime",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4098681852",
    "max": 0,
    "min": 0,
    "name": "endTime",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4041782348")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "date2393256231",
    "max": "",
    "min": "",
    "name": "startTime",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date4098681852",
    "max": "",
    "min": "",
    "name": "endTime",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // remove field
  collection.fields.removeById("text2393256231")

  // remove field
  collection.fields.removeById("text4098681852")

  return app.save(collection)
})
