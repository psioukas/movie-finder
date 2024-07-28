export default function isEmptyString(data: unknown): boolean {
    return typeof data === 'string' && data.trim().length === 0;
}