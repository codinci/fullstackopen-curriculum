const Total = (props) => {
  console.log(props)
  return (
    <p>
      Number of exercises {" "}
      {props.numberOfExercises[0].exercises +
        props.numberOfExercises[1].exercises +
        props.numberOfExercises[2].exercises}
    </p>
  );
}

export default Total;