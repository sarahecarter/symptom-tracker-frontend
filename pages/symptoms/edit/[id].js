/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState, useRef } from "react";
import {useRouter} from 'next/router'
import Back from "../../../components/Back";
import colors from '../../../styles/colors'

const Form = styled.form`
    width: 80%;
    max-width: 450px;
    margin: 20px auto;
    input[type="submit"] {
        margin: 10px auto 30px;
        padding: 5px;
        display: block;
    }
    .check {
        text-align: center;
    }
    input[type="checkbox"] {
        margin: auto;
        width: 20px;
        height: 20px;
    }
    @media (min-width: 500px) {
        .check {
            flex-direction: row;
            align-items: center;
        }
        input[type="checkbox"] {
            margin: 10px;
        }
`

const FlexPair = styled.div`
    display: flex;
    flex-direction: column;
    color: ${colors.primary};
    > * {
        margin: 3px;
    }
    input, textarea {
        padding: 5px;
        border: 1px solid ${colors.primary};
        border-radius: 3px;
    }
    #severity {
        width: 60%;
    }
    #startDate {
        width: 60%;
    }
`
const Submit = styled.input`
    display: block;
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    margin: 30px auto 20px;
    background: ${colors.primaryAccent};
    color: ${colors.background};
    font-size: 1em;
    &:hover {
        background: ${colors.secondary};
    }
`

export default function Edit({symptom}) {
    const router = useRouter()
    const url = "https://sc-capstone-backend.herokuapp.com/symptoms/"

    const checkbox = useRef(null)

    const [formState, setFormState] = useState(symptom)

    const handleChange = (e) => {
        const newState = {...formState}
        newState[e.target.name] = e.target.value
        setFormState(newState)
    }

    const handleCheck = (e) => {
        const newState = {...formState}
        if (e.target.checked) {
            newState[e.target.name] = true
        }
        else {
            newState[e.target.name] = false
        }
        setFormState(newState)
    }

    const checkInactive = () => {
        const newState = {...formState}
        newState["inactive"] = checkbox.current.checked
        setFormState(newState)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        checkInactive()
        await fetch(url + symptom._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formState)
        })
        router.push("/symptoms")
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FlexPair>
                    <label htmlFor="bodyPart">Body Part</label>
                    <input 
                        id="bodyPart"
                        type="text"
                        name="bodyPart"
                        value={formState.bodyPart}
                        onChange={handleChange}
                        placeholder="Body Part"
                    />
                </FlexPair>

                <FlexPair>
                    <label htmlFor="symptom">Symptom</label>
                    <input 
                        id="symptom"
                        type="text"
                        name="symptom"
                        value={formState.symptom}
                        onChange={handleChange}
                        placeholder="Symptom"
                    />
                </FlexPair>

                <FlexPair>
                    <label htmlFor="startDate">Start Date</label>
                    <input 
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={formState.startDate}
                        onChange={handleChange}
                    />
                </FlexPair>

                <FlexPair>
                    <label htmlFor="severity">Severity (1-10)</label>
                    <input 
                        id="severity"
                        type="number"
                        name="severity"
                        value={formState.severity}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        step="1"
                        placeholder="1-10"
                    />
                </FlexPair>

                <FlexPair>
                    <label htmlFor="notes">Notes</label>
                    <textarea 
                        id="notes"
                        type="text"
                        name="notes"
                        value={formState.notes}
                        onChange={handleChange}
                        placeholder="Describe symptom here"
                    />
                </FlexPair>

                <FlexPair className="check">
                    <label htmlFor="inactive">Check if symptom is no longer active:</label>
                    <input 
                        id="inactive"
                        type="checkbox"
                        name="inactive"
                        value={formState.inactive}
                        onChange={handleCheck}
                        ref={checkbox}
                    />
                </FlexPair>

                <Submit type="submit" value="Update Symptom"/>
            </Form>
            <Back></Back>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const id = ctx.query.id
    const res = await fetch(`${process.env.API_URL}/symptoms`)
    const data = await res.json()
    // finds the specific symptom from the returned data
    const symptom = data.find(symp => symp._id === id)

    return {
        props: {
            title: "Edit Symptom Form",
            description: "This page is for editing the details of a symptom",
            symptom
        }
    }
}