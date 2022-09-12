import mongoose from 'mongoose'


mongoose.connect(process.env.URI)





const connection = mongoose.connection




connection.once('open',()=>{
    console.log("db mongo is ok", connection.name)
})