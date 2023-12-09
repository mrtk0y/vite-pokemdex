// TODO: how to use this component to display each Pokemon?

const Pokemon = ({ imageUrl, id, name, typeNames, isShow }) => {
  return (
    // TODO: convert css for `isHidden` class
    <div className={`${isShow ? "" :"isHidden"} m-2 h-4/5 w-36 rounded-lg bg-white capitalize flex flex-col justify-center items-center`}>
      <img src={imageUrl} />
      <p>N° {id}</p>
      <h3><strong>{name}</strong></h3>
      <div className="flex justify-around items-center capitalize mb-3.5 gap-2">
        {typeNames.map((typeName) => (
          <p key={typeName} className="rounded bg-green-300 px-3">{typeName}</p>
        ))}
      </div>
    </div>
  )
}

export default Pokemon
