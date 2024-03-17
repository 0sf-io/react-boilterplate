export function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isUndefined(value: unknown): boolean {
    return typeof value === "undefined";
}

export function isNull(value: unknown): boolean {
    return value === null;
}

export function isNullOrUndefined(value: unknown): boolean {
    return isUndefined(value) || isNull(value);
}

export function isString(value: unknown): boolean {
    return typeof value === "string";
}

export function ifStringOr(value: unknown, defaultValue: string): string {
    return isString(value) ? value as string : defaultValue;
}

export function isNumber(value: unknown) {
    return typeof value === "number";
}
