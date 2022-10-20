import React from 'react';
import Collapsible from 'react-collapsible';
import { IconChevronDown } from '@tabler/icons';
import { Table } from '@mantine/core';
import '../styles/experimentcard.scss';

function ExperimentCard(props) {

    const { experimentName, experimentDate, experimentInputs, experimentOutputs } = props;

    Object.keys(experimentInputs).forEach((input) => {
        if (experimentInputs[input] == 0) {
            delete experimentInputs[input];
        }
    });

    const inputRows = Object.entries(experimentInputs).map((input) => (
        <tr>
            <td>{input[0]}</td>
            <td>{input[1]}</td>
        </tr>
    ));

    const outputRows = Object.entries(experimentOutputs).map((output) => (
        <tr>
            <td>{output[0]}</td>
            <td>{output[1]}</td>
        </tr>
    ));

    return (
        <div className='experiment-card'>
            <Collapsible trigger={[`Experiment ${experimentName.substring(4, 6)} - ${experimentDate}`, <IconChevronDown />]}>
                <div className='experiment-container'>
                    <Table striped highlightOnHover withBorder withColumnBorders>
                        <thead>
                            <tr>
                                <th>Input</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>{inputRows}</tbody>
                    </Table>
                    <Table striped highlightOnHover withBorder withColumnBorders>
                        <thead>
                            <tr>
                                <th>Output</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>{outputRows}</tbody>
                    </Table>
                </div>
            </Collapsible>
        </div>
    );
}

export default ExperimentCard;