/**
 * @returns {string} returns an error message for the min length
 * @example
 * getMinLengthErrorMessage('Name', 3); // 'Name must be at least 3 characters long'
 * getMinLengthErrorMessage('Name', 10); // 'Name must be at least 10 characters long'
 * getMinLengthErrorMessage('Name', 0); // 'Name is required'
 * getMinLengthErrorMessage('Name', -1); // 'Name is required'
 */
export const getMinLengthErrorMessage = (minLength: number, name: string) => {
	if (minLength < 1) {
		return `${name} is required`;
	}
	return `${name} must be at least ${minLength} characters long`;
};

/**
 * @returns {string} returns an error message for the max length
 * @example
 * getMaxLengthErrorMessage('Name', 3); // 'Name must be at most 3 characters long'
 * getMaxLengthErrorMessage('Name', 10); // 'Name must be at most 10 characters long'
 */
export const getMaxLengthErrorMessage = (maxLength: number, name: string) => {
	return `${name} must be at most ${maxLength} characters long`;
};