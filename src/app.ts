/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
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
app.use(express.json());

app.use(bodyParser({ limit: '2000mb' }));

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/', (req, res) => {
  res.status(200).send('IPA Distribution SERVER');
});

app.get('/applist', async (req, res) => {
  const lists = await appList();
  res.status(200).send(lists);
});

app.get('/app/:id', async (req, res) => {
  const callapp = await callFromAppName(req.params.id);
  res.status(200).send(callapp);
});

app.post('/register/app', async (req, res) => {
  try {
    const { name, bundleid, version } = req.query;
    const { data, image, ipa } = req.body;
    console.log(req.body);
    if (data) {
      uploadipa(name, ipa);
      uploadimage(name, image);
      const s3baseurl = 'https://ipa-distribution-hanu.s3.ap-northeast-2.amazonaws.com/';
      const ipaurl = `${s3baseurl}/${name}/${name}.ipa`;
      const plistcontext = await generate_xml_string(ipaurl, bundleid, name);
      uploadplist(name, plistcontext);
      await addApp(name, bundleid, version, data);
    }
    res.status(200).send();
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

app.listen(3000, () => {
  console.info('✅ Start IPA Distribution Server ✅');
});
