const PersonForm = ({addPerson, newName, newNumber, onChangeName, onChangeNumber}) => {
    return (
        <div>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={onChangeName}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={onChangeNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm