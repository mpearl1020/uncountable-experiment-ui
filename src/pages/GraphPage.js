import React, { useState } from 'react';
import ScatterPlot from '../components/ScatterPlot';
import { inputKeys, outputKeys, getInputOutputPairs } from '../utils/data_parsers';
import { Select } from '@mantine/core';
import '../styles/graphpage.scss';

function GraphPage() {

    const [inputProperty, setInputProperty] = useState('');
    const [outputProperty, setOutputProperty] = useState('');

    return (
        <div className='graph-page'>
            <div className='settings'>
                <Select
                    value={inputProperty}
                    onChange={(input) => setInputProperty(input)}
                    label='Select an Input'
                    placeholder='Experiment Input'
                    searchable
                    data={inputKeys}
                />
                <Select
                    value={outputProperty}
                    onChange={(output) => setOutputProperty(output)}
                    label='Select an Output'
                    placeholder='Experiment Output'
                    searchable
                    data={outputKeys}
                />
            </div>
            <ScatterPlot
                experimentData={getInputOutputPairs(inputProperty, outputProperty)}
                inputProperty={inputProperty}
                outputProperty={outputProperty}
            />
        </div>
    );
}

export default GraphPage;