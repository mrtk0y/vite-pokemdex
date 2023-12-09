const PokemonItem = ({ imageUrl, id, name, typeNames, isShow }) => {
  return (
    // TODO: handle `isShow`
    <div className="card w-full bg-base-100 shadow-xl mx-auto">
      <figure>
        <img src={imageUrl} alt="Pokemon Image" />
      </figure>
      <div className="card-body">
        <p>N° {id}</p>
        <h2 className="card-title capitalize">{name}</h2>
        <div className="card-actions justify-center">
          {typeNames.map((typeName) => (
            <div key={typeName} className="badge badge-outline">{typeName}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonItem
