import database from "../db/database.js";

const add = async (req, res) => {
  const {title, url, des} = req.body?.payload ?? {};

  if (typeof title === 'string' &&
      typeof des === 'string' &&
      typeof url === 'string') {

    const db = await database();
    const conformation = await db.collection('list').insertOne({url, des, title});

    if (conformation.acknowledged) {
      console.log(`Adding an item by the id of ${conformation.insertedId}`)
      res.status(200).send({id: conformation.insertedId});
    } else {
      res.status(500).send('We fucked up mb bro')
    }
    
  } else {
    res.status(400).send("Insufficient paramaters");
  }
}

export default add;