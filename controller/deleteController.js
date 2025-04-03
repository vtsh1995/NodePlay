
const postmodel = require('../model/postmodel')

exports.deleteResource = async(req,res) =>{
  const { resourceId } = req.body
  try{
    const deleteResouce = await postmodel.findByIdAndDelete({_id : resourceId});
    if(!deleteResouce){
       return res.status(404).json({message : 'resource not found'})
    }
    res.status(200).json({message: 'record deleted'})
  } catch(err){
    const error = new Error('Resource not deleted something went wrong' , err);
    error.status =500;
    throw error;
  }
  
}