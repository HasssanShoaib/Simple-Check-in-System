// converts an array to object indexed by keyField
export const arrayToObject = (array, keyField) => (
	array.reduce((obj, item) => {
		obj[item[keyField]] = item;
		return obj;
	}, {})
)

// converts 24 hour clock to 12 hour AM/PM
export const convertTo12Hours = (hours) => {
	let hours12 = {};
	hours12.ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours12.hours = hours ? hours : 12;
	return hours12;
}