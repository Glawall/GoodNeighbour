export interface ErrorObj {
  statusCode: number;
  message: string;
}

export interface Errors {
  [key: string]: ErrorObj;
}

export class AppError extends Error {
  statusCode: number;
  constructor(errorObj: ErrorObj) {
    super(errorObj.message);
    this.statusCode = errorObj.statusCode;
  }

  getErrorObj(): ErrorObj {
    return { statusCode: this.statusCode, message: this.message };
  }
}
