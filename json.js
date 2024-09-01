const express = require('express');
const app = express();  // Store the function in app
const db = require('./db'); // Exported db from db.js for connection between node and MongoDB


require('dotenv').config()
// const person = require('./models/persons');
const menus=require('./models/menu')
const bodyParser=require('body-parser') //convert datatype into required datatype
app.use(bodyParser.json())
const PORT=process.env.PORT||3000
// Middleware to parse JSON bodies
app.use(express.json()); // Allows Express to parse JSON in request bodies

// Routes
app.get('/', (req, res) => {
  res.send('How may I help you?');
});

// app.get('/matar', (req, res) => {
//   const customize = {
//     add: "more matar",
//     add2: "paneer",
//     plate: 3
//   };
  // res.json(customize); // Send response as JSON
// });

// app.post('/idli', (req, res) => {
//   res.send("Made successfully");
// });
// app.post('/person', async(req, res) => {
//   try{
//     const data=req.body //assume it contains persons data
//   /*const newPerson=new person(); // from model/persons
//   newPerson.name=data.name;
//   newPerson.salary=data.salary;  newPerson.work=data.work;
//   newPerson.address=data.address;
//   newPerson.mobile=data.mobile;
//   newPerson.email=data.email;
//   newPerson.age=data.age;*/
//   //to avoid all this we can directly write
//   const newPerson=new person(data);
//   const response=await newPerson.save();
//   console.log('data saved');
//   res.status(200).json(response);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error:"internal server error"});

//   }
//   //save new person to database
//   //callabck function but we avoid to use it (give an error as well) instead of this we use async and wait 
//   /*newPerson.save((error,savedPerson)=>{
//     if(error){
//       console.log("not able to save");
//       req.statuts(500).json({error:"internal server error"});
//     }
//     else{
//       console.log("saved succesfully");
//       req.statusCode(200).json(savedPerson);
//     }*/
//   });
//   app.get('/person',async(req,res)=>{
//     try{
//       console.log("get function")
//       const data=await person.find();
//       console.log('data fetched');
//       res.status(200).json(data);

//     }
//     catch(err){
//       console.log(err);
//     res.status(500).json({error:"internal server error"});
//     }

//   });
//   app.get('/person/:worktype',async(req,res)=>{
//     try{
//       const worktype=req.params.worktype;//extract the worktype from url
//       if(worktype=="chef"||worktype=="manager"||worktype=="waiter"){
//         const work=await person.find({work:worktype});
//         console.log("work find");
//         res.status(400).json(work);
//       }
//       else{
//         res.status(404).json({error:"invalid work type"})
//       }
//     }catch(err){
//       console.log(err);
//       res.status(500).json({error:"unable to fetch data "})
//     }
//   })
app.post('/menu',async(req,res)=>{
  try{
    const data=req.body;
    const newmenu=new menus(data);
    const response=await newmenu.save();
    console.log('menu saved');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'internal error'});
  }
})


app.get('/menu', async (req, res) => {
  try {
    const data = await menus.find();
    console.log('Data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const personr=require('./routes/person_route')
app.use('/person',personr)
// Start the server
app.listen(PORT, () => console.log("Port number 3000 is assigned"));
