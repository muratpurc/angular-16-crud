import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { TutorialService } from './service/tutorials-service';

// Set up the express app
const app = express();

// Body parser for post data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Access-Control-Allow-Origin: *
app.use(cors({origin: '*'}));

const PORT = 5000;

// GET get all tutorials or by title
app.get('/api/tutorials', (req, res) => {
  const promise = TutorialService.createInstance();
  promise.then((service) => {
    let data;
    if (typeof req.query.title === 'string') {
      data = service.findByTitle(req.query.title);
    } else {
      data = service.fetchAll();
    }
    //console.log('app GET /api/tutorials data', data);
    res.status(200).send({
      success: data.length ? 'true' : 'false',
      message: data.length ? 'tutorials retrieved successfully' : 'could not retrieve tutorials',
      data: data
    });
  }).catch((err) => {
    console.log('app GET /api/tutorials err', err);
    res.status(500).send({success: 'false', message: 'Error', data: err});
  });
});

// GET get tutorial by id
app.get('/api/tutorials/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const promise = TutorialService.createInstance();
  promise.then((service) => {
    const data = service.fetchById(id);
    res.status(200).send({
      success: data.length ? 'true' : 'false',
      message: data.length ? 'tutorial retrieved successfully' : 'could not retrieve tutorial',
      data: data
    });
  }).catch((err) => {
    console.log('app GET /api/tutorials/:id err', err);
    res.status(500).send({success: 'false', message: 'Error', data: err});
  });
});

// POST create a new tutorial
app.post('/api/tutorials', (req, res) => {
  const promise = TutorialService.createInstance();
  promise.then((service) => {
    //console.log('app POST /api/tutorials req.body', req.body);
    const id = service.add(
      req.body.title,
      req.body.description,
      req.body.published,
    );
    res.status(200).send({
      success: id ? 'true' : 'false',
      message: id ? 'tutorial successfully created' : 'could not create tutorial',
      data: id
    });
  }).catch((err) => {
    console.log('app POST /api/tutorials err', err);
    res.status(500).send({success: 'false', message: 'Error', data: err});
  });
});

// PUT update a tutorial by id
app.put('/api/tutorials/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const promise = TutorialService.createInstance();
  promise.then((service) => {
    const result = service.update(
      id,
      req.body.title,
      req.body.description,
      req.body.published,
    );
  
    res.status(200).send({
      success: result ? 'true' : 'false',
      message: result ? 'tutorial updated successfully' : 'could not update tutorial',
      data: [result]
    });
  }).catch((err) => {
    console.log('app PUT /api/tutorials/:id err', err);
    res.status(500).send({success: 'false', message: 'Error', data: err});
  });
});

// DELETE delete a tutorial by id
app.delete('/api/tutorials/:id', (req, res) => {
  const promise = TutorialService.createInstance();
  promise.then((service) => {
    const id = parseInt(req.params.id, 10);
    const result = service.delete(id);
  
    res.status(200).send({
      success: result ? 'true' : 'false',
      message: result ? 'tutorial successfully deleted' : 'could not delete tutorial',
      data: [result]
    });
  }).catch((err) => {
    console.log('app DELETE /api/tutorials/:id err', err);
    res.status(500).send({success: 'false', message: 'Error', data: err});
  });
});

// DELETE delete all tutorials
app.delete('/api/tutorials', (req, res) => {
  const promise = TutorialService.createInstance();
  promise.then((service) => {
    const result = service.deleteAll();

    res.status(200).send({
      success: result ? 'true' : 'false',
      message: result ? 'tutorials successfully deleted' : 'could not delete tutorials',
      data: [result]
    });
  }).catch((err) => {
    console.log('app DELETE /api/tutorials err', err);
    res.status(500).send({success: 'false', message: 'Error', data: err});
  });
});

app.listen(PORT, () => {
  console.log(`** Express Server is listening on localhost:${PORT}, open your browser on http://localhost:${PORT}/ **`);
});
