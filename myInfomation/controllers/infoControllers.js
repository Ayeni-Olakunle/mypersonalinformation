const asynHandler = require("express-async-handler")
const info = require("../model/infoModel")


const getInfo = asynHandler(async (req, res) => {
    const infos = await info.find()
    res.status(200).json(infos)
})

const postInfo = asynHandler(async (req, res) => {
    if (!req.body.linkName && req.body.link && req.body.description) {
        res.status(400)
        throw new Error("Please add a text")
    }
    const infos = await info.create({
        linkName: req.body.linkName,
        link: req.body.link,
        description: req.body.description,
    })
    res.status(200).json(infos)
})

const editInfo = asynHandler(async (req, res) => {
    const updateInfo = await info.findById(req.params.id);
    if (!updateInfo) {
        res.status(400)
        throw new Error("Infomation not found")
    }
    const updatedInfo = await info.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedInfo)
})

const deleteInfo = asynHandler(async (req, res) => {
    const deleteInfo = await info.findById(req.params.id);
    if (!deleteInfo) {
        res.status(400)
        throw new Error("Infomation not found")
    }

    await deleteInfo.remove();
    res.status(200).json({ message: `Item with the id of ${req.params.id} as being deleted` })
})

module.exports = {
    getInfo,
    postInfo,
    editInfo,
    deleteInfo
}