/**
 * Exposes an interface to extend the validator and add new methods to it.
 */
export function extend(name: string, method: ValidationMethod, message?: string): void;

/**
 * Sanitizes a given set of data with given set of rules.
 */
export function sanitize<T>(data: T, rules: Rules): T;

/**
 * Validate a set of async validations mapped as field and rule called rules.
 */
export function validate<T>(data: T, rules: Rules, messages?: Messages): Promise<T>;

/**
 * Just like validate but waits for all the validations to occur and returns an array of errors.
 */
export function validateAll<T>(data: T, rules: Rules, messages?: Messages): Promise<T>;

export namespace is {
  /**
   * Tells whether input is above comparison input.
   */
  function above(input: number, comparsionInput: number): boolean;

  /**
   * Tells whether input is affirmative or not.
   */
  function affirmative(input: string): boolean;

  /**
   * Tells whether input is after given date.
   */
  function after(input: string | Date, afterDate: string | Date): boolean;

  /**
   * Tells whether input is after certain offset from current date.
   */
  function afterOffsetOf(input: string, number: number, key: string): boolean;

  /**
   * Makes sure given field contains letters only.
   */
  function alpha(input: string): boolean;

  /**
   * Tells whether input is a valid alpha numeric string or not.
   */
  function alphaNumeric(input: string | number): boolean;

  /**
   * Tells whether input is a valid array or not.
   */
  function array(input: any[]): boolean;

  /**
   * Tells whether input is before a given date.
   */
  function before(input: string | Date, beforeDate: string | Date): boolean;

  /**
   * Tells whether input is before certain offset from current date.
   */
  function beforeOffsetOf(input: string, number: number, key: string): any;

  /**
   * Tells whether a value lies between 2 values or not.
   */
  function between(input: number, min: number, max: number): boolean;

  /**
   * Tells whether input is a valid credit card number or not.
   */
  function creditCard(input: string): boolean;

  /**
   * Tells whether input is a valid date or not .
   */
  function date(input: string | Date, strict: boolean): boolean;

  /**
   * Tells whether input is a valid date for a given format or not.
   */
  function dateFormat(input: string, formats: any[]): boolean;

  /**
   * Tells whether given input is a valid email address or not.
   */
  function email(input: string): boolean;

  /**
   * Tells whether input is empty or not.
   */
  function empty(input: any): boolean;

  /**
   * Tells whether input is a even number or not.
   */
  function even(input: number): boolean;

  /**
   * Tells whether input exists or not.
   */
  function existy(input: any): boolean;

  /**
   * Exposes an interface to extend the raw validator and add own methods to it.
   */
  function extend(name: string, method: Function): void;

  /**
   * Tells whether input is falsy or not, opposite of truthy.
   */
  function falsy(input: any): boolean;

  /**
   * Tells whether input date is in future or not.
   */
  function future(input: string | Date): boolean;

  /**
   * Tells whether a value lies in an array or not.
   */
  function inArray(input: string, comparsionArray: any[]): boolean;

  /**
   * Tells whether a given date is between 2 dates or not.
   */
  function inDateRange(input: string | Date, minDate: string | Date, maxDate: string | Date): boolean;

  /**
   * Makes sure all values of one array are present in another array.
   */
  function intersectAll(input: any[], intersectionArray: any[]): boolean;

  /**
   * Makes sure any one value of one array is present in another array.
   */
  function intersectAny(input: any[], intersectionArray: any[]): boolean;

  /**
   * Tells whether ip address is a valid ipv4 or ipv6 ip address.
   */
  function ip(input: string): boolean;

  /**
   * Tells whether ip address is a valid ipv4 ip address.
   */
  function ipv4(input: string): boolean;

  /**
   * Tells whether ip address is a valid ipv6 ip address.
   */
  function ipv6(input: string): boolean;

  /**
   * Tells whether input is a valid JSON string or not.
   */
  function json(input: string): boolean;

  /**
   * Tells whether input is a negative number or not.
   */
  function negative(input: number): boolean;

  /**
   * Tells type of input is a valid number or not.
   */
  function number(input: any): boolean;

  /**
   * Tells whether input is a valid object or not.
   */
  function object(input: any): boolean;

  /**
   * Tells whether input is a odd number or not.
   */
  function odd(input: number): boolean;

  /**
   * Tells whether input date is in past or not.
   */
  function past(input: string | Date): boolean;

  /**
   * Tells whether given input is a valid phone number or not.
   */
  function phone(input: string | number): boolean;

  /**
   * Tells whether input is a positive number or not.
   */
  function positive(input: number): boolean;

  /**
   * Executes a given regex on a given input.
   */
  function regex(input: string, regex: string | RegExp): boolean;

  /**
   * Tells whether 2 values are identically same.
   */
  function same(input: any, comparsionInput: any): boolean;

  /**
   * Matches 2 input are of same type or not.
   */
  function sameType(input: any, comparsionInput: any): boolean;

  /**
   * Tells whether an array is sorted or not.
   */
  function sorted(input: any[]): boolean;

  /**
   * Tells whether input is of type string or not.
   */
  function string(input: any): boolean;

  /**
   * Tells whether input date is a valid date is today or not.
   */
  function today(input: string | Date): boolean;

  /**
   * Tells whether input date is a valid date to tomorrow or not.
   */
  function tomorrow(input: string | Date): boolean;

  /**
   * Tells whether input is truthy or not.
   */
  function truthy(input: any): boolean;

  /**
   * Tells whether input is under comparison input.
   */
  function under(input: number, comparsionInput: number): boolean;

  /**
   * Tells whether given input is a valid url or not.
   */
  function url(input: string): boolean;

  /**
   * Tells whether input date is a valid date from yesterday or not.
   */
  function yesterday(input: any): any;
}

export namespace sanitizor {
  /**
   * Removes blacklisted values from string.
   */
  function blacklist(value: string, args: any[]): string;

  function camelCase(value: string): string;

  function capitalize(value: string): string;

  function decapitalize(value: string): string;

  /**
   * Escapes an input if it's a string.
   */
  function escape(value: string): string;
  function escape(value: any): any;

  /**
   * Exposes an interface to extend filters.
   */
  function extend(name: string, method: Function): void;

  function humanize(value: string): string;

  /**
   * Normalizes an email by removing all unncessary characters from it.
   */
  function normalizeEmail(value: string, args: any[]): string;

  function plural(value: string): string;

  function singular(value: string): string;

  function slug(value: string): string;

  function stripLinks(value: string): string;

  function stripTags(value: string, args: any[]): string;

  function title(value: string): string;

  /**
   * Coverts a value to boolean all values with positive inputs yields to true.
   */
  function toBoolean(value: any): boolean;

  function toDash(value: string): string;

  /**
   * Converts a date to a date object or return null when invalid date
   */
  function toDate(value: any): Date | null;

  /**
   * Converts a value to float or returns NaN when unable to make it a flat.
   */
  function toFloat(value: any): number;

  /**
   * Coverts a value to integer or returns NaN.
   */
  function toInt(value: any, args: any[]): number;

  function underscore(value: string): string;
}

export interface ValidationMethod {
  (data: any, field: string, message: string, args: any[], get: Function): Promise<any>;
}

export interface MessageMethod {
  (field: string, validation: string, args: any[]): string;
}

export interface Error {
  field?: string;
  validation?: string;
  message?: string;
}

export interface Data {
  [x: string]: any;
}

export interface Rules {
  [x: string]: string;
}

export interface Messages {
  [x: string]: string | MessageMethod;
}
