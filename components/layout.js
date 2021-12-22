/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Head from 'next/head'
import Link from 'next/link'


const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const NavLink = styled.a`
  margin: 5px;
  cursor: pointer;
`

const Hamburger = styled.div`
  height: 40px;
  margin: 10px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
`

const Bar = styled.div`
  width: 30px;
  height: 3px;
  background-color: black;
  margin: 3px;
`

const Footer = styled.div`
  text-align: center;
  margin: 40px;
`

export default function Layout({children, home, title, description}) {
    return (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <Flex>
            <Link href="/">
              <h1
                css={css`
                  font-size: 1.3em;
                  margin: 10px;
                  cursor: pointer;
                  @media (min-width: 500px) {
                    font-size: 1.8em;
                  }
                  @media (min-width: 768px) {
                    font-size: 2em;
                  }
                  @media (min-width: 1024px) {
                    font-size: 2.2em;
                  }
                `}
              >Symptom Tracker</h1>
            </Link>
            <Hamburger>
              <Bar></Bar>
              <Bar></Bar>
              <Bar></Bar>
            </Hamburger>
          </Flex>
          <Nav>
            <Link href="/">
              <NavLink>Home</NavLink>
            </Link>
            <Link href="/symptoms">
              <NavLink>Symptoms</NavLink>
            </Link>
          </Nav>
        </header>
        <main>{children}</main>
        <Footer>
          <p>Created by 
            <a 
              href="https://www.linkedin.com/in/scarterwebdev/"
              css={css`
                color: black;
                margin: 5px;
                &:hover {
                  color: purple;
                }
              `}
          >Sarah Carter</a></p>
        </Footer>
    </div>
    )
}