import React, { useState } from 'react'

const FAQForm = props => {

    const [data, setData] = useState({
        question: "",
        answer: ""
    })

    const handleInputChange = event => {
        // setting new question - what we are altering, getter and : setter
        setData({ ...data, [event.currentTarget.name]: event.currentTarget.value })
    }

       // function to clear out the form
    const clearForm = () => {
        setData({
            question: "",
            answer: ""
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        props.handleNewFAQ(data)
        clearForm()
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="Question">Enter a question</label>
            {/* id and name are the same as param on line 6 */}
            <input id="Question"
                name="question"
                type="text"
                /* we need value to be read as current React state, not DOM!*/
                value={data.question}
                onChange={handleInputChange} />
            <br />

            <label htmlFor="Answer">Enter a answer</label>
            {/* id and name are the same as param on line 7 */}
            <input id="Answer"
                name="answer"
                type="text"
                 /* we need value to be read as current React state, not DOM!*/
                value={data.answer}
                onChange={handleInputChange} />
            <br />
            <input type="submit" value="Add FAQ"></input>
            <button type="button" onClick={clearForm}>Clear Form</button>
        </form>
    )

}

export default FAQForm