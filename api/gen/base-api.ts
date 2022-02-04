/* tslint:disable */
/* eslint-disable */

import { Response } from 'express';
import JSONbig from 'json-bigint';

/** Exception type that holds a HTTP status and body. */
export class ApiError extends Error {
	/**
	 * Construct this `ApiError`.
	 *
	 * @param status
	 *   The HTTP status to send.
	 * @param body
	 *   The HTTP body to send.
	 * @param message
	 *   The exception message.
	 *
	 *   Defaults to the body.
	 */
	constructor(
		public status: number,
		public body: any,
		message: string = JSONbig.stringify(body),
	) {
		super(message);
	}
}

/** Base class for API controllers. */
export abstract class BaseApi {
	/**
	 * Convenience method for handling API errors.
	 *
	 * @param res
	 *   Express response object.
	 * @param data
	 *   Promise that resolves to the response payload.
	 */
	async handleResponse<T>(res: Response, data: Promise<T>): Promise<void> {
		let body: string;
		try {
			body = JSONbig.stringify(await data);
		} catch (error) {
			console.error(error);
			if (error instanceof ApiError) {
				res.status(error.status);
				body = JSONbig.stringify(error.body);
			} else {
				res.status(500);
				body = JSONbig.stringify(
					error instanceof Error ? error.message : error,
				);
			}
		}
		if (body) {
			res.set('Content-Type', 'application/json').send(body);
		} else {
			res.send();
		}
	}
}
