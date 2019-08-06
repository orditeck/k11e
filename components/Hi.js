import withLaxElement from "./withLaxElement";

export default withLaxElement(
    React.forwardRef(
        (props, ref) => <section
            {...props}
            ref={ref}
            className="fullscreen hi"
            id="hi"
        >
            <div className="container">
                <div className="content">
                    <article
                        className="lax"
                        data-lax-translate-y="0 0, vh (vh*0.05)"
                        data-lax-anchor="#hi">
                        <h3
                            className="lax"
                            data-lax-translate-y="0 0, vh (vh*0.05)"
                            data-lax-anchor="#hi"
                        >Bonjour, je suis</h3>
                        <h1
                            className="lax"
                            data-lax-translate-y="0 0, vh (vh*0.05)"
                            data-lax-anchor="#hi"
                        >Keven Lefebvre</h1>
                        <h2
                            className="lax"
                            data-lax-translate-y="0 0, vh (vh*0.1)"
                            data-lax-anchor="#hi"
                        >Stratège numérique</h2>
                    </article>
                </div>
            </div>
        </section>
    )
)
