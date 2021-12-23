/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from "next/link"
import Back from '../../components/Back'
import {useRouter} from "next/router"
import colors from '../../styles/colors'

const Card = styled.div`
height: auto;
width: 80%;
max-width: 400px;
margin: 20px auto;
border-left: 1px solid silver;
border-right: 1px solid silver;
border-bottom: 1px solid silver;
border-radius: 10px;
text-align: center;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
font-size: 1.1em;
box-shadow: 5px 5px 10px silver;
div.heading {
    background: linear-gradient(106deg, rgba(29,53,87,1) 0%, rgba(69,123,157,1) 85%);
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    color: ${colors.background};
    padding: 10px;
}
div.inactive {
    background: gray;
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    color: ${colors.background};
    padding: 10px;
}
> * {
    margin-bottom: 10px;
}
.severe {
    color: ${colors.secondary};
    font-weight: 600;
}
.mild {
    color: ${colors.primaryAccent};
    font-weight: 600;
}
p {
    font-weight: 300;
}
@media (min-width: 768px) {

}
`

const ButtonContainer = styled.div`
    display: flex;
    > * {
        margin: 5px;
    }
    button {
        padding: 5px;
        border-radius: 20px;
        border: none;
        background: ${colors.primaryAccent};
        color: ${colors.background};
        font-weight: 400;
        font-size: .9em;
        cursor: pointer;
        &:hover {
            background: ${colors.secondary};
        }
    }

    .delete {
        background: ${colors.primary};
    }
`

export default function Show({symptom}, title, description) {
    const router = useRouter()
    const url = "https://sc-capstone-backend.herokuapp.com/symptoms/"

    const handleDelete = async () => {
        await fetch(url + symptom._id, {
            method: "DELETE"
        })
        router.push("/symptoms")
    }

    const calculateTimeElapsed = (start) => {
        // reformat date
        const year = start.split('').slice(0,4).join('')
        const month = start.split('').slice(5,7).join('')
        const day = start.split('').slice(8,10).join('')
        // Create dates
        const startDate = new Date(year, month -1, day, 0, 0, 0)
        const now = new Date()
        // find difference in UTC and convert to days
        const difference = now.getTime() - startDate.getTime() 
        const timeElapsed = Math.floor(difference / (1000 * 60 * 60 * 24))
        return timeElapsed === 1 ? `${timeElapsed} day ago` : `${timeElapsed} days ago`
    }

    console.log(symptom)

    return ( 
        <>
            <Card>
                <div className={symptom.inactive ? "inactive" : "heading"}>
                    <h2>{symptom.symptom}</h2>
                </div>
                <p className={symptom.inactive ? "severe" : ""}>{symptom.inactive ? "No longer active": ""}</p>
                <h4>Body Part: {symptom.bodyPart}</h4>
                <h4>Date Started:</h4>
                <p>{symptom.startDate} {symptom.inactive ? "" : `(${calculateTimeElapsed(symptom.startDate)})`}</p>
                <h4>Severity:</h4>
                <p className={symptom.severity > 5 ? "severe" : "mild"}>{symptom.severity}</p>
                <h4>Notes:</h4>
                <p>{symptom.notes}</p>
                <ButtonContainer>
                    <Link href={`/symptoms/edit/${symptom._id}`}>
                        <button><a>Edit Symptom</a></button>
                    </Link>
                    <button onClick={handleDelete} className="delete">Delete</button>
                </ButtonContainer>
            </Card>
            <Back></Back>
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