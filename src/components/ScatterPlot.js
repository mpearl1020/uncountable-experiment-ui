import React from 'react'
import { Label, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, ZAxis } from 'recharts';
import '../styles/scatterplot.scss';

function ScatterPlot(props) {
    
    const { experimentData, inputProperty, outputProperty } = props;

    const minX = Math.min(...experimentData.map(datum => datum['x']));
    const maxX = Math.max(...experimentData.map(datum => datum['x']));

    const xDelta = ((maxX - minX) / 2) / 10;

    const minY = Math.min(...experimentData.map(datum => datum['y']));
    const maxY = Math.max(...experimentData.map(datum => datum['y']));

    const yDelta = Math.floor(((maxY - minY) / 2) / 10);
    
    return (
        <div className='scatter-plot'>
            {inputProperty.localeCompare('') !== 0 && outputProperty.localeCompare('') !== 0 &&
                <div className='graph-components'>
                    <div className='title'>
                        <p>{`${inputProperty} versus ${outputProperty}`}</p>
                    </div>
                    <ScatterChart
                        width={1000}
                        height={500}
                        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
                    >
                        <CartesianGrid />
                        <XAxis 
                            type='number' 
                            dataKey='x' 
                            name={inputProperty}
                            domain={[Math.min(...experimentData.map(datum => datum['x'])) - xDelta, Math.max(...experimentData.map(datum => datum['x'])) + xDelta]}
                        >
                            <Label position='insideBottom' offset={-5} style={{ textAnchor: 'middle', fontWeight: 'bold' }}>
                                {inputProperty}
                            </Label>
                        </XAxis>
                        <YAxis 
                            type='number' 
                            dataKey='y' 
                            name={outputProperty}
                            domain={[Math.min(...experimentData.map(datum => datum['y'])) - yDelta, Math.max(...experimentData.map(datum => datum['y'])) + yDelta]}
                        >
                            <Label angle={270} position='left' offset={4} style={{ textAnchor: 'middle', fontWeight: 'bold' }}>
                                {outputProperty}
                            </Label>
                        </YAxis>
                        <Tooltip cursor={{ strokeDasharray: '5 5' }} />
                        <Scatter data={experimentData} fill='#8884d8' line lineType='fitting' />
                    </ScatterChart>
                </div>
            }
        </div>
    );
}

export default ScatterPlot;