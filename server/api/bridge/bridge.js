import { Router, json } from "express";
import { validator } from "../auth/auth.js";
import add from "./add.js";
import remove from "./remove.js";
import list from "./list.js";

const bride = Router();

bride.use(json());

bride.use('/', validator);
bride.route('/add').post(add);
bride.route('/remove').post(remove);
bride.post('/list', list);

export default bride;