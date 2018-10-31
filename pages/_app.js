import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import '../styles/main.scss'

export default class Nevek extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render () {
        const { Component, pageProps } = this.props

        return (
            <Container>
                <Head>
                    <title>Keven Lefebvre | Stratège numérique à Chicoutimi, Saguenay (Québec)</title>
                </Head>
                <Component {...pageProps} />
            </Container>
        )
    }
}
