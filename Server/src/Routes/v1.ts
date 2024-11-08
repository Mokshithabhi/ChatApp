import express from 'express';
const v1 = express.Router();
import authRoute from './auth';
import messageRoute from './messages'
import userRoute from './user'

v1.use('/v1/api/auth',authRoute);
v1.use('/v1/api/messages',messageRoute)
v1.use('/v1/api/users',userRoute)


export default v1