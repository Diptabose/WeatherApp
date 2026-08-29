import { ApiError } from "./ApiErrror";
export class InvalidParameterError extends ApiError {
  constructor(message: string, errorCode: number, options?: ErrorOptions) {
    super(message, errorCode, options);
    this.name = "Invalid Parameters Errors";
  }
}
