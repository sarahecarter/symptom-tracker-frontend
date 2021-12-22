/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import colors from '../styles/colors'

// Styled Components
const Header = styled.header`
  background-color: ${colors.primary};
  color: white;
`

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`

const Nav = styled.nav`
  display: none;
  padding-bottom: 20px;
  &.showMenu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 100%;
  }
  @media (min-width: 768px) {
    display: flex;
    margin: 10px;
    padding-bottom: 0;
  }
`

const NavLink = styled.a`
  margin: 5px;
  cursor: pointer;
  &:hover {
    color: ${colors.primaryLight};
  }
`

const Hamburger = styled.div`
  height: 40px;
  margin: 10px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  &.cross .bar-1 {
    transform: rotate(45deg) translate(3px, 10px);
  }
  &.cross .bar-2 {
    opacity: 0;
  }
  &.cross .bar-3 {
    transform: rotate(-45deg) translate(2px, -10px);
  }
  @media (min-width: 768px) {
    display: none;
  }
`

const Bar = styled.div`
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 3px;
`

const Footer = styled.div`
  text-align: center;
  margin: 40px;
  font-weight: 300;
`

export default function Layout({children, home, title, description}) {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleToggle = () => {
      menuOpen === true ? setMenuOpen(false) : setMenuOpen(true)
    }

    return (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header>
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
            <Hamburger onClick={() => handleToggle()} className={`${menuOpen ? "cross" : ""}`}>
              <Bar className="bar-1"></Bar>
              <Bar className="bar-2"></Bar>
              <Bar className="bar-3"></Bar>
            </Hamburger>
            <Nav className={`${menuOpen ? "showMenu" : ""}`}>
              <Link href="/">
                <NavLink>Home</NavLink>
              </Link>
              <Link href="/symptoms">
                <NavLink>Symptoms</NavLink>
              </Link>
            </Nav>
          </Flex>
        </Header>
        <main>{children}</main>
        <Footer>
          <p>Created by 
            <a 
              href="https://www.linkedin.com/in/scarterwebdev/"
              css={css`
                color: black;
                margin: 5px;
                &:hover {
                  color: ${colors.primaryAccent};
                }
              `}
          >Sarah Carter</a></p>
        </Footer>
    </div>
    )
}