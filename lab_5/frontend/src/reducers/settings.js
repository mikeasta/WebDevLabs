const initState = {
	emulation: false,
	startDate: "08/11/2022",
	updateRate: 0,
	emulatedStocks: [],
	stocksInfo: []
};

const settings = (state = initState, action) => {
	switch (action.type)
	{
		case "SET_OPTIONS":
			return action.options;
		case "SET_START_DATE":
			return {
				...state,
				startDate: action.date
			};
		case "SET_UPDATE_RATE":
			return {
				...state,
				updateRate: action.rate
			};
		case "ADD_STOCK_TO_EMULATION":
			return {
				...state,
				emulatedStocks: [
					...state.emulatedStocks,
					action.id
				]
			};
		case "REMOVE_STOCK_FROM_EMULATION":
			return {
				...state,
				emulatedStocks: state.emulatedStocks.filter(
					id => id !== action.id
				)
			};
		default:
			return state;
	}
};

export default settings;