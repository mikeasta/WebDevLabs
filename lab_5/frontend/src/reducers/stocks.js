const initState = [];

const stocks = (state = initState, action) => {
	switch (action.type)
	{
		case "SET_STOCKS":
			return action.stocks;
		default:
			return state;
	}
};

export default stocks;