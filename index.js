// import express from 'express';
// import * as tf from '@tensorflow/tfjs';

// const app = express();
// const PORT = 3000;

// let xs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
// let ys = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400];


// const model = tf.sequential();
// model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
// model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

// async function trainModel() {
//   const xsTensor = tf.tensor(xs);
//   const ysTensor = tf.tensor(ys);
//   await model.fit(xsTensor, ysTensor, { epochs: 1000, shuffle: true });
//   console.log('Model trained');
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
// }
// trainModel();

// async function TensorFunc(id) {
//   const inputTensor = tf.tensor([id]);
//   const prediction = await model.predict(inputTensor);
//   return prediction.dataSync()[0];
// }

// app.get('/:id', async (req, res) => {
//   const id = parseInt(req.params.id);
//   const result = await TensorFunc(id);
//   res.send({ prediction: result });
// });


