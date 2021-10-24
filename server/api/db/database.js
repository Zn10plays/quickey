import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({path:'.env'});

const url = process.env.URL || "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);

let currentDB;

async function getConnecton() {
  if (currentDB) {
    return currentDB;
  } else {
    await client.connect();
    currentDB = client.db('quickey');
    return currentDB;
  }
}

export default getConnecton;
