import experiments_data from '../experiments_data.json';
import moment from 'moment';

export const dataObj = JSON.parse(JSON.stringify(experiments_data));

export const inputKeys = Object.keys(dataObj[Object.keys(dataObj)[0]]['inputs']);

export const outputKeys = Object.keys(dataObj[Object.keys(dataObj)[0]]['outputs']);

/*
Returns data in the form of [{x: x_val_1, y: y_val_1},...,{x: x_val_n, y: y_val_n}]
for a given input and output property (excluding any points with an x-value of 0)
*/
export function getInputOutputPairs(inputProperty, outputProperty) {
    var inputOutputPairs = [];
    
    Object.keys(dataObj).forEach((experiment) => {
        var x_val = dataObj[experiment]['inputs'][inputProperty];
        var y_val = dataObj[experiment]['outputs'][outputProperty];
        if (x_val !== 0) {
            inputOutputPairs.push({x: x_val, y: y_val});
        }
    });
    
    return inputOutputPairs;
}

/*
This function takes the original format of the data and converts it to the following form:
[
    {Name: Experiment_1_Name, Date: Experiment_1_Date, inputs: {Experiment_1_Inputs}, outputs: {Experiment_1_Outputs}},
    ...
    {Name: Experiment_25_Name, Date: Experiment_25_Date, inputs: {Experiment_25_Inputs}, outputs: {Experiment_25_Outputs}}
]
*/
export function dataObjToArray() {
    var outputArr= [];
    
    Object.keys(dataObj).forEach((experiment) => {
        var experimentObj = {};
        
        var experimentDateStr = moment(experiment.substring(0, 8)).format('MMM Do YYYY');
        var experimentNameStr = experiment.substring(9, 15);
        
        Object.assign(experimentObj, {Name: experimentNameStr, Date: experimentDateStr});

        var inputsObj = {};

        Object.keys(dataObj[experiment]['inputs']).forEach((input) => {
            Object.assign(inputsObj, {[input] : dataObj[experiment]['inputs'][input]}); 
        });

        var outputsObj = {};

        Object.keys(dataObj[experiment]['outputs']).forEach((output) => {
            Object.assign(outputsObj, {[output] : dataObj[experiment]['outputs'][output]}); 
        });

        Object.assign(experimentObj, {inputs: inputsObj});
        Object.assign(experimentObj, {outputs: outputsObj});

        outputArr.push(experimentObj);
    });
    return outputArr;
}

/*
For a particular input or output, this function will return
all of the values associated with that property among all experiments 
 */
function getArrayByProperty(property, isInput) {
    var outputArr = [];
    
    Object.keys(dataObj).forEach((experiment) => {
        var val = isInput ? dataObj[experiment]['inputs'][property] : dataObj[experiment]['outputs'][property];
        outputArr.push(val);
    });
    
    return outputArr;
}

/*
This function returns the minimum and maximum among all experiments
for a particular property
*/
export function getOutputRange(outputProperty) {
    var propertyVals= getArrayByProperty(outputProperty, false);
    return [Math.min(...propertyVals), Math.max(...propertyVals)];
}

/*
This function is used for filtering the Experimental Data page
and will only return experiments for which the output values
fall within the allowable range parameters
*/
export function getExperimentsInRange(viscosityRange, 
                                      cureTimeRange,
                                      elongationRange,
                                      tensileStrengthRange,
                                      compressionSetRange) {
    
    const dataObjArray = dataObjToArray();

    const viscosityMin = viscosityRange[0];
    const viscosityMax = viscosityRange[1];

    const cureTimeMin = cureTimeRange[0];
    const cureTimeMax = cureTimeRange[1];

    const elongationMin = elongationRange[0];
    const elongationMax = elongationRange[1];

    const tensileStrengthMin = tensileStrengthRange[0];
    const tensileStrengthMax = tensileStrengthRange[1];

    const compressionSetMin = compressionSetRange[0];
    const compressionSetMax = compressionSetRange[1];

    return dataObjArray.filter(function (experiment) {
        var viscosity = experiment['outputs']['Viscosity'];
        var cureTime = experiment['outputs']['Cure Time'];
        var elongation = experiment['outputs']['Elongation'];
        var tensileStrength = experiment['outputs']['Tensile Strength'];
        var compressionSet = experiment['outputs']['Compression Set'];

        return (
            viscosityMin <= viscosity && viscosity <= viscosityMax &&
            cureTimeMin <= cureTime && cureTime <= cureTimeMax &&
            elongationMin <= elongation && elongation <= elongationMax &&
            tensileStrengthMin <= tensileStrength && tensileStrength <= tensileStrengthMax &&
            compressionSetMin <= compressionSet && compressionSet <= compressionSetMax
        );
    });
}
