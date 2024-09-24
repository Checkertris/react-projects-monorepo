import type { RecordLength } from './types';
export declare const isExtends: <T>(value: unknown) => value is T;
export declare const isEqual: <T>(value: unknown) => value is T;
export declare const recordLength: <T extends Record<PropertyKey, unknown>>(_record: T) => RecordLength<T>;
export declare const asValue: <T extends boolean>() => T;
//# sourceMappingURL=typeMethods.d.ts.map