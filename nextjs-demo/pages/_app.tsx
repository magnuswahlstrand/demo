import {MDXProvider} from '@mdx-js/react'
import "../styles/styles.css"

// import {Header} from '../components/Header'
const components = {
    // h1: Header
}

export default function App({Component, pageProps}) {
    return (
        <MDXProvider components={components}>
            <Component {...pageProps} />
        </MDXProvider>
    )
}
