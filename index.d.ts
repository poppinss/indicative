export function extend(name: string, method: ValidationMethod, message: string): void;

export function sanitize<T>(data: T, rules: Rules): any;

export function validate<T>(data: T, rules: Rules, messages?: Messages): T;

export function validateAll<T>(data: T, rules: Rules, messages?: Messages): T;

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
  function dateFormat(input: string, formats: any[], locale: string): boolean;

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

  function extend(name: any, method: any): void;

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
  function blacklist(value: any, args: any): any;

  function camelCase(value: any): any;

  function capitalize(value: any): any;

  function decapitalize(value: any): any;

  function escape(value: any): any;

  function extend(name: any, method: any): void;

  function humanize(value: any): any;

  function normalizeEmail(value: any, args: any): any;

  function plural(value: any): any;

  function singular(value: any): any;

  function slug(value: any): any;

  function stripLinks(value: any): any;

  function stripTags(value: any, args: any): any;

  function title(value: any): any;

  function toBoolean(value: any): any;

  function toDash(value: any): any;

  function toDate(value: any): any;

  function toFloat(value: any): any;

  function toInt(value: any, args: any): any;

  function underscore(value: any): any;
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

export interface Rules {
  [x: string]: string;
}

export interface Messages {
  [x: string]: string | MessageMethod;
}