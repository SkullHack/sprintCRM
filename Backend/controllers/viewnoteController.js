const note = require('../models/notes.model');

//to view notes 
exports.viewNotes = async(req,res)=>{
    const id = req.query.id;
    try{
        const notes = await note.find({employeeName:id});
        res.status(200).json({notes})
    }catch(err){
        console.log(err, 'viewnoteController.viewNotes error');
        res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
};