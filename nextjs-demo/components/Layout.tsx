// components/layout.js
import Navbar from './Navbar'
// import Footer from './footer'

import {ReactNode} from "react";
import {Container} from "@mantine/core";

interface Props {
    children: ReactNode;
}

export default function Layout({children}: Props) {
    return (
        <>
            <Navbar />
            <Container>
                <main>{children}</main>
            </Container>

        </>
    )
}
