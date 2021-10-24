import database from '../db/database.js';

const list = async (req, res) => {
  const db = await database();
  const items = await db.collection('list').find().toArray();
  res.send(items);
}

export default list;