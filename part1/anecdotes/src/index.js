import React, {useState} from 'react'
import ReactDOM from 'react-dom'

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getAllIndexes(arr, val) {
    let indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) !== -1){
        indexes.push(i);
    }
    return indexes;
}

function arrayAllMaxIndexes(array) {
    return getAllIndexes(array, array.reduce((a, b) => (Math.max(a, b))));
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

const PluralVoteCounter = ({value}) => (
    <>
        <Indicator verb={"have"} value={value} unit={"votes"}/>
    </>
)

const Anecdote = ({quotes, votes}) => {
    if (quotes.length === 1)
        return (
            <>
                {quotes[0]}<br/>
                <VoteCounter value={votes}/>
            </>
        )

    return (
        <>
            {
                quotes.map((quote) => {
                    return (
                        <>
                            {quote}<br/>
                        </>
                    )
                })
            }
            <PluralVoteCounter value={votes}/>
        </>
    )
}

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))

    const voteForAnecdote = position => {
        let newVotes = {...votes}
        newVotes[position] += 1
        setVotes(newVotes)
    }

    const anecdotesIndiciesWithMostVotes = arrayAllMaxIndexes(votes)
    let specialAnecdotes = []
    anecdotesIndiciesWithMostVotes.map((index) => {
        specialAnecdotes.push(anecdotes[index])
    } )

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote quotes={anecdotes[selected]} votes={votes[selected]}/>
            <Button text={"vote"} handleClick={() => voteForAnecdote(selected)}/>
            <Button text={"Next Anecdote"} handleClick={() => setSelected(getRandomInt(anecdotes.length))}/>
            <h1>Anecdote(s) with most votes</h1>
            <Anecdote quotes={specialAnecdotes} votes={votes[anecdotesIndiciesWithMostVotes[0]]}/>
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