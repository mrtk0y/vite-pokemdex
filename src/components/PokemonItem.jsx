// TODO: how to use this component to display each Pokemon?

const Pokemon = ({ imageUrl, id, name, typeNames }) => {
  return (
    <div id="pokemon-show-list">
      <img src={imageUrl} />
      <p>N° {id}</p>
      <h3><strong>{name}</strong></h3>
      <div id="pokemon-type">
        <p className="pokemon-type">{typeNames}</p>
      </div>
    </div>
  )
}

export default Pokemon
