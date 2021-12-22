import { useState } from "react"
import {useRouter} from 'next/router'
import bodyParts from '../../data/data'
import Link from 'next/link'


export default function New(props) {
    const router = useRouter()
    const url = "http://sc-capstone-backend.herokuapp.com/symptoms"

    const [bodyPartIndex, setBodyPartIndex] = useState(0)
    const [symptomList, setSymptomList] = useState([])

    const [formState, setFormState] = useState({
        bodyPart: null,
        symptom: null,
        startDate: null,
        severity: null,
        notes: null
    })

    // const updateSymptomList = async (index) => {
    //    const res =  await fetch(`https://healthwise.p.rapidapi.com/body/symptoms/${index}`, {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "healthwise.p.rapidapi.com",
    //             "x-rapidapi-key": "4ee919ad6cmsh5063f9e60e2124ap1b74d1jsn5a1c434b42bd"
    //         }
    //     })
    //     const {data} = await res.json()
    //     let symptomList = []
    //     data.result[0].symptoms.map((symptom) => {
    //         symptomList.push(symptom.symptom)
    //     })
    //     setSymptomList(symptomList)
    // }

    // const handleChangeSelect = (e) => {
    //     setBodyPartIndex(e.target.selectedIndex)
    //     updateSymptomList(bodyPartIndex)
    // }

    const handleChange = (e) => {
        const newState = {...formState}
        newState[e.target.name] = e.target.value
        setFormState(newState)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formState)
        })

        router.push("/symptoms")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="bodyPart">Body Part</label>
                    <input 
                        id="bodyPart"
                        type="text"
                        name="bodyPart"
                        value={formState.bodyPart}
                        onChange={handleChange}
                        placeholder="Body Part"
                    />
                    {/* <select
                        onChange={handleChangeSelect}
                    >
                        <option>other</option>
                        {bodyParts.map((part, index) => {
                            return <option key={index} id={index}>{part}</option>
                        })}
                    </select> */}
                </div>

                <div>
                    <label htmlFor="symptom">Symptom</label>
                    <input 
                        id="symptom"
                        type="text"
                        name="symptom"
                        value={formState.symptom}
                        onChange={handleChange}
                        placeholder="Symptom"
                    />
                </div>

                <div>
                    <label htmlFor="startDate">Start Date</label>
                    <input 
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={formState.startDate}
                        onChange={handleChange}
                    />
                </div>

                <div>
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
                </div>

                <div>
                    <label htmlFor="notes">Notes</label>
                    <textarea 
                        id="notes"
                        type="text"
                        name="notes"
                        value={formState.notes}
                        onChange={handleChange}
                        placeholder="Describe symptom here"
                    />
                </div>

                <input type="submit" value="Add Symptom"/>
            </form>
            <Link href="/symptoms">
                <a>Back to main list</a>
            </Link>
        </div>
    )
}

export async function getStaticProps(ctx) {
    return {
        props: {
            title: "New Symptom Form",
            description: "This page is for adding a new symptom to be tracked"
        }
    }
}


