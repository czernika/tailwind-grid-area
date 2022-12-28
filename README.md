# TailwindCSS plugin for Grid Areas

Add support for Grid areas within TailwindCSS

[![Running Tests](https://github.com/czernika/tailwind-grid-area/actions/workflows/tests.yml/badge.svg)](https://github.com/czernika/tailwind-grid-area/actions/workflows/tests.yml) [![Publish Release](https://github.com/czernika/tailwind-grid-area/actions/workflows/changelog.yml/badge.svg)](https://github.com/czernika/tailwind-grid-area/actions/workflows/changelog.yml) [![NPM Version](https://img.shields.io/npm/v/tailwindcss-grid-area)](https://www.npmjs.com/package/tailwindcss-grid-area)

## Usage

This plugin adds two new utilities for TailwindCSS to work with grid areas - `grid-areas-[<areas>]` and `grid-area-[<area>]` (or `grid-area/<named-area>`)

```html
<div class="grid grid-cols-5 grid-rows-3 bg-yellow-100">

    <div class="p-10 bg-blue-300 grid-area-auto"></div>

    <div class="p-10 bg-red-300 grid-area-[2/2/span_2/span_3]"></div>

</div>
```

Result:

![result for grid area](https://cdn.jsdelivr.net/gh/czernika/tailwind-grid-area@media/images/result-value.png)

Generated CSS:

```css
.grid-area-auto {
  grid-area: auto;
}

.grid-area-\[2\/2\/span_2\/span_3\] {
  grid-area: 2/2/span 2/span 3;
}
```

### Named Areas

```html
<div class="grid grid-areas-['sidebar_center_left'_'sidebar_footer_footer']">

    <div class="p-10 bg-blue-300 grid-area/left"></div>

    <div class="p-10 bg-yellow-300 grid-area/center"></div>

    <div class="p-10 bg-red-300 grid-area/sidebar"></div>

    <div class="p-10 bg-green-300 grid-area/footer"></div>

</div>
```

Result:

![result for grid named area](https://cdn.jsdelivr.net/gh/czernika/tailwind-grid-area@media/images/result.png)

Generated CSS:

```css
.grid-area\/left {
  grid-area: left;
}

.grid-area\/center {
  grid-area: center;
}

.grid-area\/sidebar {
  grid-area: sidebar;
}

.grid-area\/footer {
  grid-area: footer;
}

.grid-areas-\[\'sidebar_center_left\'_\'sidebar_footer_footer\'\] {
  grid-template-areas: 'sidebar center left' 'sidebar footer footer';
}
```

## Installation

```sh
npm i tailwindcss-grid-area
```

Require plugin within `plugins` section of `tailwind.config.js`

```js
// tailwind.config.js

module.exports = {
    // ...
    
    plugins: [
        require('tailwindcss-grid-area'),
    ],
}
```

## Configuration

Plugin provides some default utilities for `grid-area` - same syntax as for [global values](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area#syntax) for `grid-area` CSS property

| Utility | Generated CSS |
| --- | --- |
| `grid-area`, `grid-area-auto` | `grid-area: auto` |
| `grid-area-inherit` | `grid-area: inherit` |
| `grid-area-initial` | `grid-area: initial` |
| `grid-area-revert` | `grid-area: revert` |
| `grid-area-layer` | `grid-area: revert-layer` |
| `grid-area-unset` | `grid-area: unset` |

### Arbitrary Values

There are no default properties for `grid-areas` (as it is purely user-configured setting). However if you wish to use custom defined utility register it under `gridAreas` key

```js
// tailwind.config.js

module.exports = {
    // ...
    
    theme: {
        extend: {
            gridAreas: {
                app: "'header header' 'sidebar main' 'sidebar footer'",
            },
        },
    },
}
```

```html
<div class="grid grid-areas-app"></div>
```

More about `grid-template-areas` you may find on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Grid_Template_Areas)

Same valid for `grid-area` utility but key name is `gridArea`

```js
// tailwind.config.js

module.exports = {
    // ...
    
    theme: {
        extend: {
            gridArea: {
                custom: '1 / 1 / span 2 / 3',
            },
        },
    },
}
```

```html
<div class="grid-area-custom"></div>
```

When working with arbitrary values remember that Tailwind does NOT recognize spaces - use underscore `_` instead

```html
<div class="grid-area-[1_/_1_/_span_2_/_3]"></div>

<!-- Or -->
<div class="grid-area-[1/1/span_2/3]"></div>
```

### Using Labels

When working with named grid areas you may use Tailwind labels instead of arbitrary variants

```html
<div class="grid-area/header"></div>

<!-- Same as -->
<div class="grid-area-[header]"></div>
```

## License

Open-source under [MIT license](LICENSE)
