import React, { useState, useEffect } from 'react';
import ExperimentCard from '../components/ExperimentCard';
import { getOutputRange, getExperimentsInRange } from '../utils/data_parsers';
import { RangeSlider } from '@mantine/core';
import SortButton from '../components/SortButton';
import '../styles/datapage.scss';

function DataPage() {

    const [viscosityRange, setViscosityRange] = useState([getOutputRange('Viscosity')[0], getOutputRange('Viscosity')[1]]);
    const [cureTimeRange, setCureTimeRange] = useState([getOutputRange('Cure Time')[0], getOutputRange('Cure Time')[1]]);
    const [elongationRange, setElongationRange] = useState([getOutputRange('Elongation')[0], getOutputRange('Elongation')[1]]);
    const [tensileStrengthRange, setTensileStrengthRange] = useState([getOutputRange('Tensile Strength')[0], getOutputRange('Tensile Strength')[1]]);
    const [compressionSetRange, setCompressionSetRange] = useState([getOutputRange('Compression Set')[0], getOutputRange('Compression Set')[1]]);

    const [viscosityAsc, setViscosityAsc] = useState(true);
    const [cureTimeAsc, setCureTimeAsc] = useState(true);
    const [elongationAsc, setElongationAsc] = useState(true);
    const [tensileStrengthAsc, setTensileStrengthAsc] = useState(true);
    const [compressionSetAsc, setCompressionSetAsc] = useState(true);

    const [experimentsData, setExperimentsData] = useState(getExperimentsInRange(viscosityRange, cureTimeRange, elongationRange, tensileStrengthRange, compressionSetRange));

    useEffect(() => {
        setExperimentsData(getExperimentsInRange(viscosityRange, cureTimeRange, elongationRange, tensileStrengthRange, compressionSetRange));
    }, [viscosityRange, cureTimeRange, elongationRange, tensileStrengthRange, compressionSetRange]);

    return (
        <div className='data-page'>
            <div className='query-settings'>
                <div className='sort-buttons'>
                    <SortButton 
                        ascending={viscosityAsc} 
                        setAscending={setViscosityAsc} 
                        experimentsData={experimentsData} 
                        setExperimentsData={setExperimentsData} 
                        outputProperty='Viscosity' 
                    />
                    <SortButton 
                        ascending={cureTimeAsc} 
                        setAscending={setCureTimeAsc} 
                        experimentsData={experimentsData} 
                        setExperimentsData={setExperimentsData} 
                        outputProperty='Cure Time' 
                    />
                    <SortButton 
                        ascending={elongationAsc} 
                        setAscending={setElongationAsc} 
                        experimentsData={experimentsData} 
                        setExperimentsData={setExperimentsData} 
                        outputProperty='Elongation' 
                    />
                    <SortButton 
                        ascending={tensileStrengthAsc} 
                        setAscending={setTensileStrengthAsc} 
                        experimentsData={experimentsData} 
                        setExperimentsData={setExperimentsData} 
                        outputProperty='Tensile Strength' 
                    />
                    <SortButton 
                        ascending={compressionSetAsc} 
                        setAscending={setCompressionSetAsc} 
                        experimentsData={experimentsData} 
                        setExperimentsData={setExperimentsData} 
                        outputProperty='Compression Set' 
                    />
                </div>
                <div className='filter-sliders'>
                    <p>Select a range for viscosity</p>
                    <RangeSlider 
                        value={viscosityRange} 
                        onChange={setViscosityRange} 
                        label={(value) => value.toFixed(1)} 
                        minRange={0.1}
                        step={0.01}
                        min={getOutputRange('Viscosity')[0]} 
                        max={getOutputRange('Viscosity')[1]}
                    />
                    <p>Select a range for cure time</p>
                    <RangeSlider 
                        value={cureTimeRange} 
                        onChange={setCureTimeRange} 
                        label={(value) => value.toFixed(1)} 
                        minRange={0.1}
                        step={0.01}
                        min={2.84} 
                        max={3.98}
                    />
                    <p>Select a range for elongation</p>
                    <RangeSlider 
                        value={elongationRange} 
                        onChange={setElongationRange} 
                        label={(value) => value.toFixed(1)} 
                        minRange={0.1}
                        step={0.1}
                        min={getOutputRange('Elongation')[0]} 
                        max={getOutputRange('Elongation')[1]}
                    />
                    <p>Select a range for tensile strength</p>
                    <RangeSlider 
                        value={tensileStrengthRange} 
                        onChange={setTensileStrengthRange} 
                        label={(value) => value.toFixed(1)} 
                        minRange={0.1}
                        step={0.1}
                        min={getOutputRange('Tensile Strength')[0]} 
                        max={getOutputRange('Tensile Strength')[1]}
                    />
                    <p>Select a range for compression set</p>
                    <RangeSlider 
                        value={compressionSetRange} 
                        onChange={setCompressionSetRange} 
                        label={(value) => value.toFixed(1)} 
                        minRange={0.1}
                        step={0.1}
                        min={getOutputRange('Compression Set')[0]} 
                        max={getOutputRange('Compression Set')[1]}
                    />
                </div>
            </div>
            
            {experimentsData.map((experiment) => (
                <ExperimentCard
                    experimentName={experiment['Name']}
                    experimentDate={experiment['Date']}
                    experimentInputs={experiment['inputs']}
                    experimentOutputs={experiment['outputs']}
                />
            ))
            }
        </div>
    );
}

export default DataPage;