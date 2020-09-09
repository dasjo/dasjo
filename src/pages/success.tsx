import React from 'react'
import IndexLayout from '../layouts'
import { Link } from 'gatsby'

const SuccessPage = () => (
    <IndexLayout>
        <div className="row">
            <h1>Thanks for your message. I'll try to reach out to as soon as possible.</h1>
            <Link to="/" style={{marginTop: 'var(--gutter-small)'}} className="btn--text">Back to Home <span>&nbsp;&rarr;</span></Link>
        </div>
    </IndexLayout>
)

export default SuccessPage