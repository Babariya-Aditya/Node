const {Client} = require('pg')
const client = new Client({
    host : "localhost",
    user : "postgres",
    port : 5432,
    password : "1234",
    database : "college"
})
client.connect();
client.query("select * from student", (err,res) =>{
    if(!err){
        console.log(res.rows)
    } else{
        console.log(err.message)
    }
    client.end();

   
})

client.query("insert into student (id,name) values (2,'kp')",(err,res)=>{
    if(!err){
        console.log("record inserted",res.rows[0])
    }
    else{
        console.log(err.message)

    }
    
});



