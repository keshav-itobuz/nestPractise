class CustomError extends Error {
  message: string;
  extensions: {};
  constructor(code: string, message: string) {
    super(message);
    this.message = message;
    this.extensions = {
      code: code,
    };
  }
}
export default CustomError;
