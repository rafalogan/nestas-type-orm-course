export const existsOrError = (value: any, response: any) => {
	if (!value) throw response;
	if (Array.isArray(value) && value.length === 0) throw response;
	if (typeof value === 'string' && !value.trim()) throw response;
	if (typeof value === 'number' && !Number(value)) throw response;
};

export const notExistisOrError = (value: any, response: any) => {
	try {
		existsOrError(value, response);
	} catch (response) {
		return;
	}

	throw response;
};

export const equalsOrError = (valueA: any, valueB: any, response: any) => {
	if (valueA !== valueB) throw response;
};
