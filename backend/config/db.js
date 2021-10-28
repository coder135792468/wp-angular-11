import mongoose from 'mongoose';
const connectDB = async () =>{

   try {
       const conn = await mongoose.connect(process.env.MONGO_URL, {
           useNewUrlParser:true,
           useUnifiedTopology:true,
          
       });
       console.log(
           `MongoDB connected : ${conn.connection.host}`.cyan.underline.bold.italic        
       )
    } catch (error) {
       console.log(`Error:${error}`.red.underline.bold)
       process.exit(1);
    
   }
};

export default connectDB;