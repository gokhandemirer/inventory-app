export const enum Inventory {
	MinNameLength = 3,
	MaxNameLength = 40,
	MinQuantity = 1,
	MaxQuantity = 1000,
	MaxDescriptionLength = 100,
}

export const startsWithLetterRegex = /^[a-z][a-z0-9\s]*$/i;

export const startsWithLetterRegexErrorMessage =
	'Name must start with a letter and contain only letters, numbers and spaces';