export const setStocks = stocks => {
	return {
		type: "SET_STOCKS",
		stocks
	};
};

export const setBrokers = brokers => {
	return {
		type: "SET_BROKERS",
		brokers
	};	
};

export const updateBroker = (id, broker) => {
	return {
		type: "UPDATE_BROKER",
		id,
		broker
	};
};

export const setOptions = options => {
	return {
		type: "SET_OPTIONS",
		options
	};
};

export const setStartDate = date => {
	return {
		type: "SET_START_DATE",
		date
	};
};

export const setUpdateRate = rate => {
	return {
		type: "SET_UPDATE_RATE",
		rate
	};
};

export const addStockToEmulation = id => {
	return {
		type: "ADD_STOCK_TO_EMULATION",
		id
	};
};

export const removeStockFromEmulation = id => {
	return {
		type: "REMOVE_STOCK_FROM_EMULATION",
		id
	};
};
