import styled from '@emotion/styled'
import Link from 'next/link'
import Head from 'next/head'
import colors from '../../styles/colors'

const Button = styled.button`
    display: block;
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    margin: 30px auto 20px;
    background: ${colors.primaryAccent};
    color: ${colors.background};
    font-size: 1em;
    box-shadow: 5px 5px 10px silver;
    &:hover {
        box-shadow: none;
        background: ${colors.secondary};
    }
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
    border: .5px solid silver;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    box-shadow: 5px 5px 10px silver;
    color: ${colors.primary};
    div {
        background: ${colors.primary};
        color: white;
        width: 100%;
        margin: 0;
        padding: 20px;
        border-radius: 10px 10px 0px 0px;
    }
    p {
        color: ${colors.secondary};
        margin-bottom: 20px;
        font-weight: 400;
        span {
            color: ${colors.primary};
        }
    }
    &:hover {
        box-shadow: none;
    }
    @media (min-width: 768px) {
        width: 25%;
        height: 200px;
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
                    <Button>Track new symptom</Button>
                </Link>
                <CardContainer>
                    {symptoms.map(symp => {
                        return <Link href={`/symptoms/${symp._id}`} key={symp._id}>
                            <Card>
                                <div>
                                    <h2>{symp.symptom}</h2>
                                </div>
                                <h3>{symp.bodyPart}</h3>
                                <p>Started: <span>{symp.startDate}</span></p>
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