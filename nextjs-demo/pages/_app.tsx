import {MDXProvider} from '@mdx-js/react'
import "../styles/styles.css"
import type {AppProps} from 'next/app'

// import {Header} from '../components/Header'
const components = {
    // h1: Header
}


export default function App({Component, pageProps}: AppProps) {
    return (
        <MDXProvider components={components}>
            <Component {...pageProps} />
        </MDXProvider>
    )
}
