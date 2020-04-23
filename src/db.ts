import mongoose, { Document, Schema } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// const mongourl = `mongodb://${process.env.mongo_id}:${process.env.mongo_pw}@${process.env.mogno_url}/ipa-ditribution`;
const mongourl = 'mongodb://hanu:hjww0904@docker.hanukoon.com:27017/ipa-ditribution?authSource=admin';
mongoose.connect(mongourl);

const appSchema = new Schema({
  // rank: {type: String, required: true},
  name: { type: String, required: true },
  bundleid: { type: String, required: true },
  version: { type: String, required: true },
  ipafile: { type: String, required: false },
  plistfile: { type: String, required: false },
  imagefile: { type: String, required: false },
  itmsurl: { type: String, required: false },
  data: { type: String, required: false },
});

const App = mongoose.model<IApp>('app', appSchema);
const app = new App();

export interface IApp extends Document {
  name: String;
  bundleid: String;
  version: String;
  ipafile: String;
  plistfile: String;
  imagefile: String;
  itmsurl: String;
  data: String;
}

export async function addApp(
  name: IApp['name'],
  bundleid: IApp['bundleid'],
  version: IApp['version'],
  data: IApp['version'],
) {
  try {
    const s3baseurl = 'https://ipa-distribution-hanu.s3.ap-northeast-2.amazonaws.com/';
    app.name = name;
    app.bundleid = bundleid;
    app.version = version;
    app.ipafile = `${s3baseurl}/${name}/${name}.ipa`;
    app.plistfile = `${s3baseurl}/${name}/downloads.plist`;
    app.imagefile = `${s3baseurl}/${name}/${name}.png`;
    app.data = data;
    app.itmsurl = `itms-services://?action=download-manifest&url=${s3baseurl}/${name}/downloads.plist`;
    await app.save();
  } catch (e) {
    console.error(e);
  }
  console.log('success!');
}

export async function callFromAppName(_id: string) {
  return App.findOne({ _id }).select({ __v: 0 });
}

export async function appList() {
  return App.find().select({ __v: 0 });
}
