import z, { ZodEnum, ZodObject } from 'zod'
import { cva, type Config, type Props } from 'class-variance-authority'
import { ZodComponentProp } from './ZodComponentProp'

export type VariantMap = Record<string, Record<string, string[] | string>>

type VariantShape<T extends VariantMap> = {
    [K in keyof T]: ZodEnum<keyof T[K][] & [string, ...string[]]>
}

export class ZodVariant<T extends VariantMap> extends ZodComponentProp<
    ZodObject<VariantShape<T>>,
    string
> {
    private readonly cva: (props: Props<T>) => string
    constructor(base: string, config: Config<T>) {
        let shape = {} as VariantShape<T>
        if (config.variants) {
            shape = Object.entries(config.variants).reduce(
                (prev, [variant, options]) => ({
                    ...prev,
                    [variant]: z.enum(Object.keys(options) as unknown as [string, ...string[]]),
                }),
                {} as VariantShape<T>
            )
        }
        super(z.object(shape))
        this.cva = cva(base, config)
    }

    override _valueToProp(value: {
        [k in keyof z.objectUtil.addQuestionMarks<
            z.baseObjectOutputType<VariantShape<T>>,
            any
        >]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<VariantShape<T>>, any>[k]
    }): string {
        return this.cva(value as Props<T>)
    }
}
