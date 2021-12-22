/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Link from "next/link"

const Back = () => {
    return <Link href="/symptoms">
        <a
        css={css`
            display: block;
            margin: 20px auto;
            text-align: center;
            cursor: pointer;
        `}
        >Back to Main List</a>
    </Link>
}

export default Back
