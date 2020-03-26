/* eslint-disable no-unused-vars */
import express, { Application } from 'express';
import cors from 'cors';
import {} from './db';

class App {
  public application: Application;

  constructor() {
    this.application = express();
  }
}

const app = new App().application;
app.use(cors());
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.listen(3000, () => {
  console.info('✅ Start IPA Distribution Server ✅');
});

app.get('/', (req, res) => {
  res.status(200).send('IPA Distribution SERVER');
});

app.get('/generateplist', async (req, res) => {
  res.status(200).send(await ;
});

app.get('/applist', async (req, res) => {
  res.status(200).send(await (userRankedRepos(req.query.githubid)));
});

app.get('/app/:id', async (req, res) => {
  res.status(200).send(await (userReturn()));
});

