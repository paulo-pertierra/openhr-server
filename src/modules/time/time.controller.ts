/*
 * This is the Controller. All HTTP Request logic should be here, including validations and error handling.
 * No business logic as much as possible, state changes and business logic is in the services, eg. Calculating time of work.
 * Further reading: Developer Documentation.
 *
 */

import * as timeService from './time.service';

import type { Request, Response, NextFunction } from 'express';
