import express from 'express';
import * as tf from '@tensorflow/tfjs';

const app = express();
const model = tf.sequential();
TrainModel();

app.get('/:number',async (req,res)=>{
    const num = parseInt(req.params.number);
    let prediction = await PredictData(num);
    res.send(prediction);
});


async function PredictData(data){
    const prediction = await model.predict(tf.tensor([data]));
    return prediction.data();
}
async function TrainModel() {

    console.log('training the model');
    const x = [1,2,3,4,5,6,7,8,9,10];
    const y = [1,4,9,16,25,36,49,64,81,100];

    const xs = tf.tensor(x);
    const ys = tf.tensor(y);

  
    model.add(tf.layers.dense({units:1,inputShape:[1]}));
    model.compile({loss:'meanSquaredError',optimizer:'sgd'});

    await model.fit(xs,ys,{epochs:100000,shuffle:'true'});

    app.listen(3000, () => {
        console.log('app is live...');
        
    })
}