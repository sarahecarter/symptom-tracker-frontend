/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Link from "next/link"
import colors from '../styles/colors'

const Back = () => {
    return <Link href="/symptoms">
        <a
        css={css`
            display: block;
            margin: 20px auto;
            text-align: center;
            cursor: pointer;
            &:hover {
                color: ${colors.secondary}
            }
        `}
        >Back to Main List</a>
    </Link>
}

export default Back
