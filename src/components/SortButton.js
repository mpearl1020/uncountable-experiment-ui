import React from 'react';
import { Button, Tooltip } from '@mantine/core';

function SortButton(props) {

    const {ascending, setAscending, experimentsData, setExperimentsData, outputProperty } = props;

    const sortData = (e) => {
        var sorted = null;
        if (ascending) {
            sorted = experimentsData.sort((e1, e2) => (e1['outputs'][outputProperty] > e2['outputs'][outputProperty]) ? 1 : ((e2['outputs'][outputProperty] > e1['outputs'][outputProperty]) ? -1 : 0))
            setAscending(false);
        } else {
            sorted = experimentsData.sort((e1, e2) => (e1['outputs'][outputProperty] > e2['outputs'][outputProperty]) ? -1 : ((e2['outputs'][outputProperty] > e1['outputs'][outputProperty]) ? 1 : 0));
            setAscending(true); 
        }
        setExperimentsData(sorted);
    }

    return (
        <Tooltip label={ascending ? 'Ascending' : 'Descending'} onClick={sortData}>
            <Button className='sort-button'>
                {`Sort by ${outputProperty}`}
            </Button>
        </Tooltip>
    );

}

export default SortButton;