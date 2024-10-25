const Filter = ({filter, handleOnChange}) => {
    return (
        <div>
            <h2>Filter: </h2>
            Find Countries: <input value={filter} onChange={handleOnChange} />
        </div>
    )
}

export default Filter