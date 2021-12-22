/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from "next/link"
import {useRouter} from "next/router"

export default function Show({symptom}, title, description) {
    const router = useRouter()
    const url = "http://sc-capstone-backend.herokuapp.com/symptoms/"

    const Card = styled.div`
    height: auto;
    width: 80%;
    max-width: 400px;
    margin: 10px auto;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
    & > * {
        margin: 5px;
    }
    @media (min-width: 768px) {

    }
`
    
    const handleDelete = async () => {
        await fetch(url + symptom._id, {
            method: "DELETE"
        })
        router.push("/symptoms")
    }

    return ( 
        <>
            <Card>
                <h2>{symptom.symptom}</h2>
                <h4>Body Part: {symptom.bodyPart}</h4>
                <h5>Date Started:</h5>
                <p>{symptom.startDate}</p>
                <h5>Severity:</h5>
                <p>{symptom.severity}</p>
                <h5>Notes:</h5>
                <p>{symptom.notes}</p>
                <Link href={`/symptoms/edit/${symptom._id}`}>
                    <button><a>Edit Symptom</a></button>
                </Link>
                <button onClick={handleDelete}>Delete Symptom</button>
            </Card>
            <Link href="/symptoms">
                <a>Back to Main List</a>
            </Link>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const id = ctx.query.id
    const res = await fetch(`${process.env.API_URL}/symptoms`)
    const data = await res.json()
    // finds the specific symptom from the returned data
    const symptom = data.find(symp => symp._id === id)

    return  {
        props: {
            symptom: symptom,
            title: "Symptom",
            description: "Shows a specific symptom"
        }
    }
}