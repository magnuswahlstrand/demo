/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        './public/**/*.html',
        './public/**/*.css',
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
    ],
    theme: {
        extend: {
            width: {
                '1140': '1140px',
                '970': '970px',
                '750': '750px',
            },
            fontFamily: {
                'lora': ["'Lora'", 'serif'],
            },
            transitionProperty: {
                'height': 'height'
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}
