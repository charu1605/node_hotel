const express=require("express")
const router=express.Router()
const person = require('./../models/persons');
const { validate } = require("../models/menu");
router.post('/', async(req, res) => {
    try{
      const data=req.body //assume it contains persons data
    /*const newPerson=new person(); // from model/persons
    newPerson.name=data.name;
    newPerson.salary=data.salary;  newPerson.work=data.work;
    newPerson.address=data.address;
    newPerson.mobile=data.mobile;
    newPerson.email=data.email;
    newPerson.age=data.age;*/
    //to avoid all this we can directly write
    const newPerson=new person(data);
    const response=await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:"internal server error"});
  
    }
    //save new person to database
    //callabck function but we avoid to use it (give an error as well) instead of this we use async and wait 
    /*newPerson.save((error,savedPerson)=>{
      if(error){
        console.log("not able to save");
        req.statuts(500).json({error:"internal server error"});
      }
      else{
        console.log("saved succesfully");
        req.statusCode(200).json(savedPerson);
      }*/
    });
    router.get('/',async(req,res)=>{
      try{
        console.log("get function")
        const data=await person.find();
        console.log('data fetched');
        res.status(200).json(data);
  
      }
      catch(err){
        console.log(err);
      res.status(500).json({error:"internal server error"});
      }
  
    });
    router.get('/:worktype',async(req,res)=>{
      try{
        const worktype=req.params.worktype;//extract the worktype from url
        if(worktype=="chef"||worktype=="manager"||worktype=="waiter"){
          const work=await person.find({work:worktype});
          console.log("work find");
          res.status(400).json(work);
        }
        else{
          res.status(404).json({error:"invalid work type"})
        }
      }catch(err){
        console.log(err);
        res.status(500).json({error:"unable to fetch data "})
      }
    })
    router.put('/:id',async(req,res)=>{
        try{
            const id=req.params.id;
            const getid=req.body;
            const response=await person.findByIdAndUpdate(id,getid,{
                new:true,
                runValidators:true,
            })
            if(!response){
               return res.status(404).json({error:"invalid id"});
            }
            console.log("data updated");
            res.status(400).json(response);

        }catch(err){
            console.log(err);
            res.status(500).json({error:"internal error"})

        }
    })

    router.delete('/:id',async(req,res)=>{
        try{
            const id=req.params.id;
            const response=await person.findByIdAndDelete(id);
            if(!response){
                return res.status(404).json({error:"invalid id"});
            }
            console.log("data deleted");
            res.status(400).json({message:"deleted successfully"});
        }
        catch(err){
            console.log(err);
            res.status(500).json({error:"internal error"})
        }
    })

    module.exports=router