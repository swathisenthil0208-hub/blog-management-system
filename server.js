const express=require('express');
const app=express();
const PORT=3000;
app.get('/',(req,res)=>{res.send('Fresh start!Day1 Express Server Ready');});
app.listen(PORT,()=>{console.log('Server running live on http://localhost:${PORT}');});