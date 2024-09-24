interface ArrayTransforms<T, KOut extends PropertyKey, VOut> {
    key?: (item: T, index: number) => KOut;
    value?: (item: T, index: number) => VOut;
    filter?: (item: T, index: number) => boolean;
}
export declare function reduceArray<T, KOut extends PropertyKey = number, VOut = T>(array: T[], transform?: ArrayTransforms<T, KOut, VOut>): Record<KOut, VOut>;
export {};
//# sourceMappingURL=reduceArray.d.ts.map