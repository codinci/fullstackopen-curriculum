import { filterChange } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {


  const handleChange = (event) => {
	  const filteredWord = event.target.value
	  props.filterChange(filteredWord)
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter
      <input onChange={handleChange} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  filterChange,
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter;
