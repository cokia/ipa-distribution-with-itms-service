import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => {
  console.info('✅ Connected to mongod server✅');
});
mongoose.connect('mongodb://docker.hanukoon.com:27017/', { useNewUrlParser: true, useUnifiedTopology: true });

const appSchema = new Schema({
  // rank: {type: String, required: true},
  name: { type: String, required: true },
  bundleid: { type: String, required: true },
  version: { type: String, required: true },
  ipafile: { type: String, required: false },
  plistfile: { type: String, required: false },
  imagefile: { type: String, required: false },
  data: { type: String, required: false },
});

const App = mongoose.model('app', appSchema);
const app = new App();

export interface IApp extends Document {
  name: String;
  bundleid: String;
  version: String;
  ipafile: String;
  plistfile: String;
  imagefile: String;
  data: String
}

export async function addApp(name:IApp['name'], bundleid:IApp['bundleid'], version:IApp['version'], data:IApp['version']) {
  const s3baseurl = 'https://ipa-distribution-hanu.s3.ap-northeast-2.amazonaws.com/';
  app.name = name;
  app.bundleid = bundleid;
  app.version = version;
  app.ipafile = `${s3baseurl}/${name}/${name}.ipa`;
  app.plistfile = `${s3baseurl}/${name}/downloads.plist`;
  app.imagefile = `${s3baseurl}/${name}/${name}.png`;
  app.data = data;
  app.save((err:any) => {
    if (err) {
      console.error(err);
    }
  });
}

export async function callFromAppName(name: string) {
  return app.findOne({ name }).select({ __v: 0 });
}

export async function appList() {
  return ((app.find().select({ __v: 0 })));
}
