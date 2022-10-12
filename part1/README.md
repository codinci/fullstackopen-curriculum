### About
This contains exercises of part 1 on fullstackopen
### Challenges
<p>In the creation of anecdote a few challenges were faced.</p>
<p>They include:</p>
<ul>
<li>Creating a zero filled array of a particular length

```js
const [votes, setVotes] = useState(() => Array(anecdoteLength).fill(0));
```
</li>
<li>Increasing the value of each individual anecdote vote

```js
const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected]++;

    setVotes(copy);
  }
```
One needs to copy the array in order to increment each value
</li>
</ul>