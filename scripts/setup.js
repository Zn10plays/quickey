import { MongoClient } from 'mongodb'
import fs from 'fs/promises';

async function main() {
  try {
    const files = await fs.readdir('./');
    if (files.includes('.env')) {
      console.log('setup is already compleate \n if you think you messsed something up try removing then delete the env and try again');
    } else {
      console.log("");
      console.log("");
      const resDB = await getUserResponce('What is your mongodb url? (default: mongodb://127.0.0.1:27017/)');
      const resPort = await getUserResponce('What do you want the port to be? (default: 5050)');
      const url = resDB || "mongodb://127.0.0.1:27017/";
      const port = resPort || 5050;
      console.log(url, port);
      await configuredb(url);
      await createEnv(url, port);
      process.exit()
      
    }
  } catch (e) {
    console.log(e);
    process.exit();
  }
}

async function getUserResponce(prompt) {
  console.log(prompt)
  return new Promise((res, rej) => {
    process.stdin.once('data', data => {
      res(data.toString().trim());
    });
  })
}

async function createEnv(url, port) {
  return fs.writeFile('./.env', `URL=\"${url}\"\nPORT=${port}`)
}

async function configuredb (url) {
  try {
    return new Promise (async (resolve, reject) => {
      const client = new MongoClient(url);
      await client.connect();
      const db = client.db('quickey');
      const accountsCollection = await db.collection('accounts');
      if (!await accountsCollection.findOne({username: 'admin'}).length >= 1) {
        console.log('inserting a account')
        await accountsCollection.insertOne({
          token: "adminiscool",
          hasAccess: true,
          username: "admin",
          password: "iamcool"
        });
      }
      const listCollection = await db.collection('list')
      if (!await listCollection.findOne({title: "hello this is the title"}).length >= 1) {
        console.log('inserting a item')
        await listCollection.insertOne({
          title: "hello this is the title",
          des: "this is the description",
          url: "this is the url",
          img: null
        });
      }
      resolve();
    })
  } catch(err) {console.log(err)}
}

main();
