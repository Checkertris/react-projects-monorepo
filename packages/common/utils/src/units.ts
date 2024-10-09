export const units = {
    liquid: {
        tsp: { text: 'teaspoon', ratio: 4.9, variants: ['teaspoon', 'teaspoons', 'tsp'] },
        tbsp: { text: 'tablespoon', ratio: 14.8, variants: ['tbsp', 'tablespoon', 'tablespoons'] },
        cup: { text: 'cup', ratio: 236.6, variants: ['cup', 'cups'] },
        ml: { text: 'milliliter', ratio: 1, variants: ['ml', 'milliliter', 'milliliters'] },
        l: { text: 'liter', ratio: 1000, variants: ['l', 'liter', 'liters'] },
        'fl oz': {
            text: 'fluid ounce',
            ratio: 29.6,
            variants: ['fl oz', 'fluid ounce', 'fluid ounces'],
        },
    },
    mass: {
        lb: { text: 'pound', ratio: 453.6, variants: ['lb', 'pound', 'pounds'] },
        g: { text: 'gram', ratio: 1, variants: ['g', 'gram', 'grams'] },
        kg: { text: 'kilogram', ratio: 1000, variants: ['kg', 'kilogram', 'kilograms'] },
        oz: { text: 'ounce', ratio: 28.3, variants: ['oz', 'ounce', 'ounces'] },
    },
}

export function convertLiquid(
    unit: keyof typeof units.liquid,
    value: number,
    newUnit: keyof typeof units.liquid
) {
    return (value / units.liquid[unit].ratio) * units.liquid[newUnit].ratio
}

export function convertMass(
    unit: keyof typeof units.mass,
    value: number,
    newUnit: keyof typeof units.mass
) {
    return (value / units.mass[unit].ratio) * units.mass[newUnit].ratio
}
