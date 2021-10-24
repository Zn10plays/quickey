import { ObjectId } from "bson";
import database from '../db/database.js';

const remove = async (req, res) => {
  const itemId = req.body.listItemId ?? false;
  console.log(`Deleting item by the id of ${itemId}`)
  if (itemId) {
    const db = await database();
    const request = await db.collection('list').deleteOne({_id:new ObjectId(itemId)});
    if (request.acknowledged) {
      res.send('ok');
    } else res.status(400).send('Incorrect ID');
  
  } else {
    res.status(400).send("Insufficient paramaters");
  }
}

export default remove;