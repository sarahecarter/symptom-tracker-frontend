/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'
import Head from 'next/head'

const New = styled.button`
    display: block;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid gray;
    margin: 10px auto;
`

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
`

const Card = styled.div`
    height: 150px;
    width: 80%;
    max-width: 400px;
    margin: 10px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
    @media (min-width: 768px) {
        width: 250px;
        height: 250px;
    }
`

export default function Index({symptoms}, title, description) {
    return (
        <>
            <Head>
                <title>Symptoms</title>
            </Head>
            <div>
                <Link href="/symptoms/new">
                    <New>Track new symptom</New>
                </Link>
                <CardContainer>
                    {symptoms.map(symp => {
                        return <Link href={`/symptoms/${symp._id}`} key={symp._id}>
                            <Card>
                                <h2>{symp.symptom}</h2>
                                <h3>{symp.bodyPart}</h3>
                                <p>Started: {symp.startDate}</p>
                            </Card>
                        </Link>
                    })}
                </CardContainer>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.API_URL}/symptoms`)
    const data = await res.json()

    return  {
        props: {
            symptoms: data,
            title: "Symptoms List",
            description: "A list of all symptoms"
        }
    }
}