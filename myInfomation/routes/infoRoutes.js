const express = require('express');
const router = express.Router()
const { getInfo, postInfo, editInfo, deleteInfo } = require("../controllers/infoControllers")

router.get("/", getInfo)
router.post("/", postInfo)

router.put("/:id", editInfo)
router.delete("/:id", deleteInfo)

module.exports = router