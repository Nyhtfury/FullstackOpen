import React, {useState} from 'react'
import ReactDOM from 'react-dom'

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Indicator = ({verb, value, unit}) => (
    <>
        {verb} {value} {unit}
    </>
)

const VoteCounter = ({value}) => {
    if (value === 1)
        return (
            <>
                <Indicator verb={"Has"} value={value} unit={"vote"}/>
            </>
        )

    return (
        <>
            <Indicator verb={"Has"} value={value} unit={"votes"}/>
        </>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf, 0))

    const voteForAnecdote = position => {
        let newVotes = {...votes}
        newVotes[position] += 1
        setVotes(newVotes)
    }

    return (
        <div>
            {props.anecdotes[selected]}<br/>
            <VoteCounter value={votes[selected]}/><br/>
            <Button text={"vote"} handleClick={() => voteForAnecdote(selected)}/>
            <Button text={"Next Anecdote"} handleClick={() => setSelected(getRandomInt(props.anecdotes.length))}/>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
)