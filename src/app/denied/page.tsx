import Link from 'next/link'
import React from 'react'

function DeniedPage() {
    return (
        <>
            <h1>Denied Page</h1>
            <p>Back to <Link href='/admin'>Home Page</Link></p>
        </>
    )
}

export default DeniedPage