import { useEffect } from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { useAppDispatch, useAppSelector } from '../../hooks.ts'
import { buildChartOptions } from '../../utils/charts.tsx'


export function Data() {

    const dispatch = useAppDispatch()
    const { data, isLoading, error } = useAppSelector(state => state.charts)

    useEffect(() => {
        dispatch({ type: 'charts/getChartsFetch' })
    }, [dispatch])

    const charts = [
        {
            title: 'Aceleração RMS',
            options: buildChartOptions(data!, 'Aceleração RMS (g)', 'accelerationRms')
        },
        {
            title: 'Temperatura',
            options: buildChartOptions(data!, 'Temperatura (ºC)', 'temperature')
        },
        {
            title: 'Velocidade RMS',
            options: buildChartOptions(data!, 'Aceleração (g)', 'velocityRms')
        }
    ]

    return (
        <main>
            <div>
                <h1>Análise de dados</h1>
            </div>
            <div>
                <span>Máquina 1023</span>
                <span>Ponto 20192</span>
                <span>200 RPM</span>
                <span>16g</span>
                <span>20 min</span>
            </div>
            <div>
                {charts.map((item, index) => {
                    return (
                        <div key={item.title + index}>
                            <div>
                                <h2>{item.title}</h2>
                            </div>
                            {
                                isLoading
                                    ? <p>Loading...</p>
                                    : error
                                        ? <p>{error}</p>
                                        : <HighchartsReact highcharts={Highcharts} options={item.options} />
                            }
                        </div>
                    )
                })}
            </div>
        </main>
    )
}
