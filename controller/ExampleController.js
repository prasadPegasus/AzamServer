const {Example,validateExample} = require('../models/Example');

exports.getAllExamples =  async (req, res)=>{
    const result = await Example.find()
        .sort('name');
    res.send(result);
}
exports.addOneExample =  async  (req, res)=>{
    const { error } = validateExample(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Example({
        name: req.body.name
    });

    const result = await genre.save()
    res.send(result);
}

exports.UpdateOneExample= async (req, res) => {
    const { error } = validateExample(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    console.log("Routes");
    
    const genre = await Example.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true })

    if (!genre) return res.status(400).send("This genre doesnt exist");

    res.send(genre);
}

exports.DeleteOneExample= async (req, res) => {

    const genre = await Example.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(400).send("This genre doesnt exist");

    res.send(genre);
}

exports.getOneExample=async (req, res) => {
    
    const genre = await Example.findById(req.params.id);

    if (!genre) return res.status(400).send("This genre doesnt exist");

    res.send(genre);
}