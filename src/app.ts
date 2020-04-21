/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  IApp, addApp, appList, callFromAppName,
} from './db';
import { uploadplist, uploadipa, uploadimage } from './awss3';
import { generate_xml_string } from './xmlparser';

dotenv.config();

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
  const { data, image, ipa } = req.body;
  uploadipa(name, ipa);
  uploadimage(name, image);
  addApp(name, bundleid, version, data);
  const s3baseurl = 'https://ipa-distribution-hanu.s3.ap-northeast-2.amazonaws.com/';
  const ipaurl = `${s3baseurl}/${name}/${name}.ipa`;
  const plistcontext = await generate_xml_string(ipaurl, bundleid, name);
  await uploadplist(name, plistcontext);
  res.status(200).send(await (addApp(name, bundleid, version, data)));
});

app.post('/update', async (req, res) => {
  res.status(200).send(await callFromAppName(req.query.name));
});
