

export default function Amount({label, cantidad}:{label:string, cantidad:number}) {
    return (
        <p className="text-2xl font-bold">
            {label}: <span className="font-bold text-amber-500">${cantidad}</span>
        </p>
    )
}

