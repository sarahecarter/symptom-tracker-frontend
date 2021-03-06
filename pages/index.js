import styled from '@emotion/styled'
import Head from 'next/head'
import Link from 'next/link'
import colors from '../styles/colors'

const Join = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 30px auto;
  text-align: center;
  border-radius: 10px;
  padding: 30px 10px;
  color: ${colors.primary};
  > * {
    margin: 15px;
  }
  h1 {
    margin-bottom: 30px;
    font-size: 
  }
  p {
    margin-bottom: 20px;
    font-weight: 300;
  }
  ul {
    text-align: left;
    font-weight: 300;
  }
  button {
    padding: 5px;
    background: ${colors.primaryAccent};
    color: ${colors.background};
    border: none;
    border-radius: 20px;
    font-size: 1.5em;
    cursor: pointer;
    &:hover {
      background: ${colors.secondary};
    }
  }
`

export default function Home(title, description) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Join>
        <h1>Welcome to the Symptom Tracker App</h1>
        <h3>Use this app to:</h3>
        <ul>
          <li>Keep track of any symptoms of illness</li>
          <li>Monitor your health</li>
          <li>Maintain a list of concerns for your doctor</li>
        </ul>
        <Link href="/symptoms">
          <button>Start Tracking</button>
        </Link>
      </Join>
    </div>
  )
}

export async function getStaticProps() {
  return  {
      props: {
          title: "Symptom Tracker Home",
          description: "Home page for symptom tracker app"
      }
  }
}