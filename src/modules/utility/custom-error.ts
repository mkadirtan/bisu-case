export class CustomError extends Error {
	constructor(message: string, code: number) {
		super(message);
		this.code = code;
	}

	public readonly code: number;
}
