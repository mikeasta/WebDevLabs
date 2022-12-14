const initState = [];

const brokers = (state = initState, action) => {
	switch (action.type)
	{
		case "SET_BROKERS":
			return action.brokers;
		case "UPDATE_BROKER":
		{
			const record = state.find(record => +record.id === +action.id);
			for (let prop in action.broker)
			{
				record[prop] = action.broker[prop];
			}
			return state;
		}
		default:
			return state;
	}
};

export default brokers;