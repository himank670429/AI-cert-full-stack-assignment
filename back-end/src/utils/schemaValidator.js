const validatorSchema = {
	title: function (value) {
		return typeof value === "string";
	},
	description: function (value) {
		return typeof value === "string";
	},
	dueDate: function (value) {
		if (typeof value !== "number") {
			return false;
		}

		const parsedDate = new Date(value);
		return !isNaN(parsedDate.getTime());
	},
	completed: function (value) {
		return typeof value === "boolean";
	},
};

class KeyError extends Error {
	constructor(message) {
		super(message);
		this.name = "KeyError"; 
	}
}

class ValueError extends Error{
    constructor(message) {
		super(message);
		this.name = "ValueError"; 
	}
}

module.exports = function check(object) {
	for (const key in object) {
        if (key === 'id') continue
		if (!validatorSchema[key]) {
			throw new KeyError(`invalid property name ${key}`);
		}
		if (!validatorSchema[key](object[key])) {
			console.log(key);
			throw new ValueError(`invalid property values passed to ${key}`);
		}
	}

	for (const key in validatorSchema) {
		if (!object.hasOwnProperty(key)) {
			throw new KeyError(`${key} is not defined in the object`);
		}
	}
	return object;
};
