const plugin = require('tailwindcss/plugin')

module.exports = plugin(function({ matchUtilities, theme }) {
    matchUtilities(
        {
            'grid-area': (value, {modifier}) => {
                if (modifier !== null) {
                    value = modifier
                }

                return {
                    'grid-area': value,
                }
            }
        },
        {
            values: Object.assign(theme('gridArea', {}), {
                DEFAULT: 'auto',
                'auto': 'auto',
                'inherit': 'inherit',
                'initial': 'initial',
                'revert': 'revert',
                'layer': 'revert-layer',
                'unset': 'unset',
            }),
            modifiers: 'any',
        }
    )

    matchUtilities(
        {
            'grid-areas': (value) => ({
                'grid-template-areas': value,
            })
        },
        {
            values: theme('gridAreas', {})
        }
    )
})
