const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./routes/RestaurantRoutes.js')

const app = express();
app.use(express.json()); 

mongoose.connect('mongodb+srv://iftirahaman:sheak123@comp3123.yc82l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use(restaurantRouter);

app.listen(8081, () => { console.log('Server is running...') });

