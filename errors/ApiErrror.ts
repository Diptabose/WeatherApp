export class ApiError extends Error {
  private errorStatus: number;
  constructor(message: string, status: number, options?: ErrorOptions) {
    super(message, options);
    this.errorStatus = status;
    this.name = "ApiError";
  }
  get status(): number {
    return this.errorStatus;
  }
}
