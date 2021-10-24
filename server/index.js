import router from './api/transcations/router.js';
import express from 'express';
import dotnet from 'dotenv';
import cors from 'cors';

dotnet.config({path:'./.env'})
const port = process.env.PORT || 8080

const app = express();
app.use(cors());
app.use('/', router);

app.listen(port, () => {
  console.log('server is up on port ' + port);
})
