import mongoose, { Types, Document } from 'mongoose';
import { getUserDetailInformation } from './githubapi';

const { Schema } = mongoose;

mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => {
  console.info('✅ Connected to mongod server✅');
});

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
// interface IRepo extends Document {
// 	// rank: string;
//   name: string;
//   department: string;
//   year: string;
//   githubid: string;
//   reponame: string;
//   repourl: string;
//   description: string;
//   stargazer: string;
//   stargazer_count: Number;
//   forkazger: Number;
//   language: string;
// }

// const repoSchema = new Schema({
//   // rank: {type: String, required: true},
//   name: { type: String, required: true },
//   department: { type: String, required: true },
//   year: { type: String, required: true },
//   githubid: { type: String, required: true },
//   reponame: { type: String, required: true },
//   repourl: { type: String, required: true },
//   description: { type: String, required: false },
//   stargazer: { type: Array, required: true },
//   stargazer_count: { type: Number, required: true },
//   forkazger_count: { type: Number, required: true },
//   language: { type: String, required: false },
// });

// const Repo = mongoose.model<IRepo>('repo', repoSchema);

// interface IUser extends Document {
//   name: string;
//   department: string;
//   year: string;
//   githubid: string;
//   dimigoinID: String;
//   bio: String;
//   email: String;
//   followers: number;
//   public_repos: number;
//   total_stars: number;
// }

// const userSchema = new Schema({
//   name: { type: String, required: true },
//   department: { type: String, required: true },
//   year: { type: String, required: true },
//   githubid: { type: String, required: true },
//   dimigoinID: { type: String, required: false },
//   bio: { type: String, required: false },
//   email: { type: String, required: false },
//   followers: { type: Number, required: false },
//   public_repos: { type: Number, required: false },
//   total_stars: { type: Number, required: false },
// });

// const User = mongoose.model<IUser>('user', userSchema);

// export async function addDBUser(name: string, dimigoinID: string | undefined, department: string, year: string, githubid: string) {
//   // tslint:disable-next-line: await-promise
//   const count = await (await (User.find({ githubid }).countDocuments()));
//   const data = await getUserDetailInformation(githubid);
//   const bio = data[0];
//   const email = data[1];
//   const followers = data[2];
//   const public_repos = data[3];

//   if (count === 0) {
//     const user = new User({
//       name, githubid, year, department, bio, email, followers, public_repos,
//     });
//     user.save();
//   } else if (count !== 0) {
//     console.log(`[👤 user exist]${name}(${githubid})`);
//   }
// }
// export async function userStarCountUpdate(starcount: number, githubid: string) {
//   const User = mongoose.model<IUser>('user', userSchema);
//   // tslint:disable-next-line: await-promise
//   const target_user = await (User.findOne({ githubid }));
//   if (target_user) {
//     target_user.total_stars = starcount;
//     target_user.save();
//   }
// }
// export async function addDBRepo(githubid: string, reponame: string, repourl: string, description: string, stargazer: string[] | undefined, stargazer_count: Number, forkazger_count: Number, language: string | undefined) {
// //   try {
//   const Repo = mongoose.model('repo', repoSchema);
//   const userInfo = await callFromUserDB(githubid);
//   if (!userInfo) {
//     console.log('no user info. user add error');
//     return;
//   }
//   const { department, year, name } = userInfo;
//   // tslint:disable-next-line: await-promise
//   const count = await (await (Repo.find({ repourl }).countDocuments()));
//   if (count === 0) {
//     const repo = new Repo({
//       name, department, year, githubid, reponame, repourl, description, stargazer, stargazer_count, forkazger_count, language,
//     });
//     repo.save();
//   } else if (count !== 0) {
//     Repo.update(
//       { githubid, reponame },
//       {
//         $set: {
//           description, stargazer, stargazer_count, forkazger_count, language,
//         },
//       }, /* query */
//       { multi: true },
//     );
//   }
// }

// export async function callFromUserDB(githubid: string) {
//   return User.findOne({ githubid });
// }

// export async function repoReturn() {
//   const Repo = mongoose.model('repo', repoSchema);
//   return ((Repo.find().select({ __v: 0 }).sort({ stargazer_count: -1 }).limit(100)));
//   // return(Repo.find().sort( { "stargazer_count": -1, "forkazger_count": -1 } ));
// }
// export async function userReturn() {
//   const User = mongoose.model<IUser>('user', userSchema);
//   return ((User.find().select({ __v: 0, dimigoinid: 0 }).sort({ total_star: -1 }).limit(100)));
//   // return(Repo.find().sort( { "stargazer_count": -1, "forkazger_count": -1 } ));
// }

// export async function oneUserReturn(githubid: string) {
//   return ((User.findOne({ githubid }, { __v: 0, dimigoinid: 0 })));
// }

// export async function userRankedRepos(githubid: string) {
//   return ((Repo.find({ githubid }).select({ __v: 0 }).sort({ stargazer_count: -1 }).limit(10)));
// }

// repoDBRank()
