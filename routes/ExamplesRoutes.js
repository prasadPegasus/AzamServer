const express = require('express');
const router = express.Router();
const validateObjectId=require('../middleware/validateObjectId');
const contoller = require('../controller/ExampleController')

router.get('/',contoller.getAllExamples); 
router.post('/',contoller.addOneExample)
router.put('/:id',contoller.UpdateOneExample);
router.delete('/:id', contoller.DeleteOneExample)
router.get('/:id',validateObjectId, contoller.getOneExample)

module.exports = router;