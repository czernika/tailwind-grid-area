import { expect, test } from 'vitest'

import postcss from 'postcss'
import tailwind from 'tailwindcss'

const resolveConfig = (config) => {
    const plugins = [
        require('../index'),
    ]

    return {...config, ...{plugins}}
}

const processTailwind = async (input, config) => {
    return await postcss(tailwind(resolveConfig(config)))
        .process(input, {
            from: undefined
        })
        .then(result => result.css)
}

expect.extend({
    toMatchCSS(received, expected) {
        const { isNot } = this

        const actual = received.replace(/\n/g, '').replace(/\s\s+/g, '')
        const expectedVal = expected.replace(/\n/g, '').replace(/\s\s+/g, '')

        return {
            pass: actual === expectedVal,
            message: () => `CSS does${isNot ? ' not' : ''} matches`,
            actual: actual,
            expected: expectedVal,
        }
    }
})

test('it asserts grid area generate proper default values', async () => {
    let config = {
        content: [
            {
                raw: '<div class="grid-area-inherit"></div>',
            },
        ]
    }

    const expected = `.grid-area-inherit {
        grid-area: inherit
    }`
    await expect(processTailwind('@tailwind utilities;', config)).resolves.toMatchCSS(expected)
})

test('it asserts grid area generate proper values from config', async () => {
    let config = {
        content: [
            {
                raw: '<div class="grid-area-custom"></div>',
            },
        ],
        theme: {
            extend: {
                gridArea: {
                    custom: '1 / 1'
                }
            }
        }
    }

    const expected = `.grid-area-custom {
        grid-area: 1 / 1
    }`
    await expect(processTailwind('@tailwind utilities;', config)).resolves.toMatchCSS(expected)
})

test('it asserts grid area may use labels', async () => {
    let config = {
        content: [
            {
                raw: '<div class="grid-area/custom"></div>',
            },
        ]
    }

    const expected = `.grid-area\\/custom {
        grid-area: custom
    }`
    await expect(processTailwind('@tailwind utilities;', config)).resolves.toMatchCSS(expected)
})

test('it asserts grid template areas may use custom config values', async () => {
    let config = {
        content: [
            {
                raw: '<div class="grid-areas-custom"></div>',
            },
        ],
        theme: {
            extend: {
                gridAreas: {
                    custom: "'header header' 'aside main'"
                }
            }
        }
    }

    const expected = `.grid-areas-custom {
        grid-template-areas: 'header header' 'aside main'
    }`
    await expect(processTailwind('@tailwind utilities;', config)).resolves.toMatchCSS(expected)
})

test('it asserts grid template areas resolves arbitrary values', async () => {
    let config = {
        content: [
            {
                raw: '<div class="grid-areas-[\'header_header\'_\'aside_main\']"></div>',
            },
        ],
    }

    const expected = `.grid-areas-\\[\\'header_header\\'_\\'aside_main\\'\\] {
        grid-template-areas: 'header header' 'aside main'
    }`
    await expect(processTailwind('@tailwind utilities;', config)).resolves.toMatchCSS(expected)
})
