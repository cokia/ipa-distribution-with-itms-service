/* eslint-disable import/extensions */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import express, { Application } from 'express';
import cors from 'cors';
import {
  IApp, addApp, appList, callFromAppName,
} from './db';
import { generate_xml_string } from './xmlparser';

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
  const { ipaurl } = req.query;
  const { imageurl } = req.query;
  const { bundleid } = req.query;
  const { name } = req.query;
  await generate_xml_string(ipaurl, bundleid, name);
  res.status(200);
});

app.get('/applist', async (req, res) => {
  res.status(200).send(await (appList()));
});

app.get('/app/:id', async (req, res) => {
  res.status(200).send(callFromAppName(req.query.name));
});

app.post('/register/app', async (req, res) => {
  const {
    name, bundleid, version,
  } = req.query;

  const { data } = req.body;
  res.status(200).send(await (addApp(name, bundleid, version, data)));
});

app.post('/update', async (req, res) => {
  res.status(200).send(await callFromAppName(req.query.name));
});
