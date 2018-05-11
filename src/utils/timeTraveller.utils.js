// Mobx
import { TimeTraveller } from "mst-middlewares";
// Store
import store from "store";


const timeTraveller = TimeTraveller.create({}, { targetStore: store });

export default timeTraveller;