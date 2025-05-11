"use client"
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface GraficoProps {
    porcentaje: number
}

export default function Grafico({ porcentaje }: GraficoProps) {
    return (
        <div className='flex justify-center items-center w-full h-full'>
            <CircularProgressbar
                value={porcentaje}
                text={`${Math.round(porcentaje)}%`}
                styles={buildStyles({
                    pathColor: porcentaje > 50 ? '#22c55e' : porcentaje > 25 ? '#eab308' : '#ef4444',
                    textColor: '#000000',
                    trailColor: '#d6d3d1',
                })}
            />
        </div>
    )
}
