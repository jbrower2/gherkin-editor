/* tslint:disable */
/* eslint-disable */

import BigNumber from 'bignumber.js';
import EmailValidator from 'email-validator';
import { DateTime } from 'luxon';

/**
 * Determines if something is `undefined` or `null`.
 *
 * @param thing
 *   The thing to test.
 * @return
 *   * `true` if `thing` was `undefined` or `null`.
 *   * `false` otherwise.
 */
export const isUndefined = (thing: unknown): thing is undefined | null =>
	thing === undefined || thing === null;

/**
 * Validates that something is `undefined`, `null`, or passes a specific validation.
 *
 * @param thing
 *   The thing to test.
 * @param validate
 *   The validator to use when `thing` is not `undefined` or `null`.
 * @param context
 *   The context to report in error messages.
 * @returns
 *   * `undefined` if `thing` was `undefined` or `null`.
 *   * the result of `validate` otherwise.
 */
export const validateOpt = <T>(
	thing: unknown,
	validate: (thing: unknown, context: string[]) => T,
	context: string[],
): T | undefined => (isUndefined(thing) ? undefined : validate(thing, context));

/**
 * Validates that something is an object.
 *
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @return
 *   `true` if `thing` was an object.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not an object.
 */
export const validateObject = (thing: unknown, context: string[]): true => {
	if (typeof thing === 'object') {
		return true;
	}
	throw new TypeError(
		`Expected '${context.join(
			'.',
		)}' to be an object, but found: ${thing} (${typeof thing})`,
	);
};

/**
 * Helper type to use types as values.
 *
 * @see {@link https://github.com/microsoft/TypeScript/issues/2444#issuecomment-84332319}
 */
export interface Type<T> {
	new (...args: never[]): T;
}

/**
 * Validates that something is a specific type.
 *
 * @param typeRef
 *   The type to test against.
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @return
 *   `thing` if the it was the specified type.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not the specified type.
 */
export const validateType = <T>(
	typeRef: Type<T>,
	thing: unknown,
	context: string[],
): T => {
	if (thing instanceof typeRef) {
		return thing;
	}
	throw new TypeError(
		`Expected '${context.join(
			'.',
		)}' to be ${typeRef}, but found: ${thing} (${typeof thing})`,
	);
};

/**
 * Validates that something is a boolean.
 *
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @param defaultValue
 *   The value to return when `thing` is `undefined` or `null`.
 * @return
 *   * `thing` if it was a boolean.
 *   * `defaultValue` if `thing` was `undefined` or `null`.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not a boolean.
 */
export const validateBoolean = (
	thing: unknown,
	context: string[],
	defaultValue?: boolean,
): boolean => {
	if (typeof thing === 'boolean') {
		return thing;
	}
	if (isUndefined(thing) && defaultValue !== undefined) {
		return defaultValue;
	}
	throw new TypeError(
		`Expected '${context.join(
			'.',
		)}' to be a boolean, but found: ${thing} (${typeof thing})`,
	);
};

/**
 * Validates that something is `"true"` or `"false"`.
 *
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @param defaultValue
 *   The value to return when `thing` is `undefined` or `null`.
 * @return
 *   * `true` if `thing` was `"true"`.
 *   * `false` if `thing` was `"false"`.
 *   * `defaultValue` if `thing` was `undefined` or `null`.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not `"true"` or `"false"`.
 */
export const validateBooleanString = (
	thing: unknown,
	context: string[],
	defaultValue?: boolean,
): boolean => {
	if (thing === 'true') {
		return true;
	}
	if (thing === 'false') {
		return false;
	}
	if (isUndefined(thing) && defaultValue !== undefined) {
		return defaultValue;
	}
	throw new TypeError(
		`Expected '${context.join(
			'.',
		)}' to be "true" or "false", but found: ${thing} (${typeof thing})`,
	);
};

/**
 * Validates that something is `"Y"` or `"N"`.
 *
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @param defaultValue
 *   The value to return when `thing` is `undefined` or `null`.
 * @return
 *   * `true` if `thing` was `"Y"`.
 *   * `false` if `thing` was `"N"`.
 *   * `defaultValue` if `thing` was `undefined` or `null`.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not `"Y"` or `"N"`.
 */
export const validateBooleanYN = (
	thing: unknown,
	context: string[],
	defaultValue?: boolean,
): boolean => {
	if (thing === 'Y') {
		return true;
	}
	if (thing === 'N') {
		return false;
	}
	if (isUndefined(thing) && defaultValue !== undefined) {
		return defaultValue;
	}
	throw new TypeError(
		`Expected '${context.join(
			'.',
		)}' to be "Y" or "N", but found: ${thing} (${typeof thing})`,
	);
};

/**
 * Validates that something is a `BigNumber`.
 *
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @return
 *   `thing` if it was a `BigNumber`.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not a `BigNumber`.
 */
export const validateNumber = (
	thing: unknown,
	context: string[],
): BigNumber => {
	if (thing instanceof BigNumber && thing.isFinite()) {
		return thing;
	}
	throw new TypeError(
		`Expected '${context.join(
			'.',
		)}' to be a number, but found: ${thing} (${typeof thing})`,
	);
};

/**
 * Validates that something is a number string.
 *
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @return
 *   `thing` if it was a number string.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not a number string.
 */
export const validateNumberString = (
	thing: unknown,
	context: string[],
): BigNumber => {
	if (typeof thing === 'string') {
		const number = new BigNumber(thing);
		if (number.isFinite()) {
			return number;
		}
	}
	throw new TypeError(
		`Expected '${context.join(
			'.',
		)}' to be a number string, but found: ${thing} (${typeof thing})`,
	);
};

/**
 * Validates that something is an integer `BigNumber`.
 *
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @return
 *   `thing` if it was an integer `BigNumber`.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not an integer `BigNumber`.
 */
export const validateInteger = (
	thing: unknown,
	context: string[],
): BigNumber => {
	const number = validateNumber(thing, context);
	if (number.isInteger()) {
		return number;
	}
	throw new TypeError(
		`Expected '${context.join(
			'.',
		)}' to be an integer, but found: ${thing} (${typeof thing})`,
	);
};

/**
 * Validates that something is an integer string.
 *
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @return
 *   `thing` if it was an integer string.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not an integer string.
 */
export const validateIntegerString = (
	thing: unknown,
	context: string[],
): BigNumber => {
	const number = validateNumberString(thing, context);
	if (number.isInteger()) {
		return number;
	}
	throw new TypeError(
		`Expected '${context.join(
			'.',
		)}' to be an integer string, but found: ${thing} (${typeof thing})`,
	);
};

/** Options for validating strings. */
export type ValidateStringOps = {
	/** Minimum string length. */
	minLength?: number;

	/** Maximum string length. */
	maxLength?: number;

	/** Flag to validate proper email format. */
	email?: true;
};

/**
 * Validates that something is a string.
 *
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @param options
 *   The string validation options (minLength, maxLength, email).
 * @return
 *   `thing` if it was a string.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not a string.
 */
export const validateString = (
	thing: unknown,
	context: string[],
	options: ValidateStringOps = {},
): string => {
	if (typeof thing !== 'string') {
		throw new TypeError(
			`Expected '${context.join(
				'.',
			)}' to be a string, but found: ${thing} (${typeof thing})`,
		);
	}
	const { minLength, maxLength, email } = options;
	if (
		minLength !== undefined &&
		thing.length < minLength &&
		maxLength !== undefined &&
		thing.length > maxLength
	) {
		const message =
			minLength === undefined
				? `at most ${maxLength}`
				: maxLength === undefined
				? `at least ${minLength}`
				: minLength === maxLength
				? `exactly ${minLength}`
				: `between ${minLength} and ${maxLength}`;
		throw new TypeError(
			`Expected '${context.join(
				'.',
			)}' to be ${message} characters, but found: ${thing}`,
		);
	}
	if (email && !EmailValidator.validate(thing)) {
		throw new TypeError(
			`Expected '${context.join('.')}' to be an email, but found: ${thing}`,
		);
	}
	return thing;
};

/**
 * Validates that something is a valid Oracle date string with no time component.
 *
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @return
 *   A `DateTime` at midnight UTC if `thing` was a valid Oracle date string with no time component.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not a valid Oracle date string with no time component.
 */
export const validateOracleDateString = (
	thing: unknown,
	context: string[],
): DateTime => {
	const s = validateString(thing, context, { minLength: 19, maxLength: 19 });
	const m = /^(\d{4})-(\d{2})-(\d{2})T00:00:00$/.exec(s);
	if (m) {
		const [, year, month, day] = m;
		return DateTime.utc(
			parseInt(year, 10),
			parseInt(month, 10),
			parseInt(day, 10),
		);
	}
	throw new TypeError(
		`Expected '${context.join(
			'.',
		)}' to be a date string with no time component, but found: ${s}`,
	);
};

/**
 * Validates that something is a valid ISO date string with no time component.
 *
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @return
 *   A `DateTime` at midnight UTC if `thing` was a valid ISO date string with no time component.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not a valid ISO date string with no time component.
 */
export const validateDateString = (
	thing: unknown,
	context: string[],
): DateTime => {
	const s = validateString(thing, context, { minLength: 10, maxLength: 10 });
	const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
	if (m) {
		const [, year, month, day] = m;
		return DateTime.utc(
			parseInt(year, 10),
			parseInt(month, 10),
			parseInt(day, 10),
		);
	}
	throw new TypeError(
		`Expected '${context.join(
			'.',
		)}' to be a date string with no time component, but found: ${s}`,
	);
};

/**
 * Validates that something is a valid Oracle date-time string.
 *
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @return
 *   A `DateTime` if `thing` was a valid Oracle date-time string.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not a valid Oracle date-time string.
 */
export const validateOracleDateTimeString = (
	thing: unknown,
	context: string[],
): DateTime => {
	const s = validateString(thing, context, { minLength: 19, maxLength: 19 });
	const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/.exec(s);
	if (m) {
		const [, year, month, day, hour, minute, second] = m;
		return DateTime.fromObject({
			year: parseInt(year, 10),
			month: parseInt(month, 10),
			day: parseInt(day, 10),
			hour: parseInt(hour, 10),
			minute: parseInt(minute, 10),
			second: parseInt(second, 10),
			zone: 'America/New_York',
		}).toUTC();
	}
	throw new TypeError(
		`Expected '${context.join('.')}' to be a date-time string, but found: ${s}`,
	);
};

/**
 * Validates that something is a valid ISO date-time string.
 *
 * @param thing
 *   The thing to test.
 * @param context
 *   The context to report in error messages.
 * @return
 *   A `DateTime` if `thing` was a valid ISO date-time string.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not a valid ISO date-time string.
 */
export const validateDateTimeString = (
	thing: unknown,
	context: string[],
): DateTime => {
	const s = validateString(thing, context, { minLength: 24, maxLength: 24 });
	const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/.exec(
		s,
	);
	if (m) {
		const [, year, month, day, hour, minute, second, millisecond] = m;
		return DateTime.utc(
			parseInt(year, 10),
			parseInt(month, 10),
			parseInt(day, 10),
			parseInt(hour, 10),
			parseInt(minute, 10),
			parseInt(second, 10),
			parseInt(millisecond, 10),
		);
	}
	throw new TypeError(
		`Expected '${context.join('.')}' to be a date-time string, but found: ${s}`,
	);
};

const addIndex = (context: string[], i: number | string): string[] => {
	if (!context.length) return [i.toString()];
	return [...context.slice(0, -1), `${context[context.length - 1]}[${i}]`];
};

/**
 * Validates that something is an array.
 *
 * @param thing
 *   The thing to test.
 * @param mapper
 *   The function to apply to each array item.
 * @param context
 *   The context to report in error messages.
 * @return
 *   `thing` if it was an array.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not an array.
 */
export const validateArray = <T>(
	thing: unknown,
	mapper: (thing: unknown, context: string[]) => T,
	context: string[],
): ReadonlyArray<T> => {
	if (Array.isArray(thing)) {
		return thing.map((x, i) => mapper(x, addIndex(context, i)));
	}
	throw new TypeError(
		`Expected '${context.join(
			'.',
		)}' to be an array, but found: ${thing} (${typeof thing})`,
	);
};

/**
 * Validates that something is an array.
 *
 * @param thing
 *   The thing to test.
 * @param mapper
 *   The function to apply to each array item.
 * @param context
 *   The context to report in error messages.
 * @return
 *   `thing` if it was an array.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not an array.
 */
export const validateParamArray = <T>(
	thing: unknown,
	mapper: (thing: unknown, context: string[]) => T,
	context: string[],
): ReadonlyArray<T> =>
	Array.isArray(thing)
		? thing.map((x, i) => mapper(x, addIndex(context, i)))
		: [mapper(thing, context)];

/**
 * Validates that something is a map.
 *
 * @param thing
 *   The thing to test.
 * @param valueMapper
 *   The function to apply to each object value.
 * @param context
 *   The context to report in error messages.
 * @return
 *   `thing` if it was a map.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not a map.
 */
export const validateMap = <T>(
	thing: unknown,
	valueMapper: (thing: unknown, context: string[]) => T,
	context: string[],
): ReadonlyMap<string, T> => {
	if (thing && typeof thing === 'object') {
		const map = new Map<string, T>();
		Object.entries(thing).forEach(([key, value]) => {
			map.set(key, valueMapper(value, addIndex(context, key)));
		});
		return map;
	}
	throw new TypeError(
		`Expected '${context.join(
			'.',
		)}' to be a map, but found: ${thing} (${typeof thing})`,
	);
};

/**
 * Converts a map to JSON.
 *
 * @param map
 *   The map to convert.
 * @param printValue
 *   The function to convert each object value to JSON.
 * @return
 *   A JSON version of `map`.
 */
export const printMap = <T>(
	map: ReadonlyMap<string, T>,
	printValue: (value: T) => any,
): any => {
	const result: any = {};
	map.forEach((value, key) => {
		result[key] = printValue(value);
	});
	return result;
};

/**
 * Tests whether something is one of a known list of values.
 *
 * @param thing
 *   The thing to test.
 * @param values
 *   The list of known values.
 * @return
 *   * `true` if `thing` was one of the known values.
 *   * `false` otherwise.
 */
export const isOneOf = <E>(thing: unknown, values: readonly E[]): thing is E =>
	values.includes(thing as E);

/**
 * Validates that something is one of a known list of values.
 *
 * @param thing
 *   The thing to test.
 * @param values
 *   The list of known values.
 * @param context
 *   The context to report in error messages.
 * @return
 *   `thing` if it was one of the known values.
 * @throws {TypeError}
 *   Throws a `TypeError` if `thing` was not one of the known values.
 */
export const validateOneOf = <E>(
	thing: unknown,
	values: readonly E[],
	context: string[],
): E => {
	if (isOneOf(thing, values)) {
		return thing;
	}
	throw new TypeError(
		`Expected '${context.join('.')}' to be one of [${values.join(
			', ',
		)}], but found: ${thing}`,
	);
};
