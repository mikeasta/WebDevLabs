import { combineReducers } from "redux";
import stocks from "./stocks";
import brokers from "./brokers";
import settings from "./settings";

const reducer = combineReducers({
	stocks,
	brokers,
	settings
});

export default reducer;