import express from 'express';
import cors from 'cors';
import clientRoute from './routes/clientRoute.ts';

const app = express();
const port = 8100;

app.use(cors());
app.use(express.json());

app.get('/', function(request, response){
    response.send({
        api_version: '0.0.1',
        status: 'OK',
    });
});

app.use('/api', clientRoute);

app.listen(port, function(){
    console.log(`Listening from port ${port}`);
});