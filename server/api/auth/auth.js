import { Router, json } from 'express';
import database from '../db/database.js';


const auth = Router();

auth.use(json());


auth.post('/confirm', async (req, res) => {
  const db = await database();
  const { token } = req.body;

  const responce = await db.collection('accounts').findOne({ token });
  const hasAccess = responce?.hasAccess;
  console.log(`confirming ${token} for user ${responce.username}`)
  if (hasAccess) {
    res.send({userHasAccess: hasAccess});
  } else {
    res.status(400).send('bad credits')
  }
});

auth.post('/auth', async (req, res) => {
  const db = await database();
  
  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  const responce = await db.collection('accounts').findOne({ username, password });
  const { hasAccess, token } = responce ?? {};
  
  if (hasAccess) {
    res.send({userHasAccess: hasAccess, token});
  } else {
    res.status(400).send('Invalid credentials')
  }
});

const validator = async (req, res, next) => {
  const token = req.body?.token;
  if (token == null) {
    next(new Error('INVALID AUTH'));
  }

  const db = await database();
  const account = await db.collection('accounts').findOne({token: token});

  next(account?.hasAccess ? null : new Error('INVALID AUTH'));
}

export default auth;
export { validator };