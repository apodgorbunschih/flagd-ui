export function createRuleSet() {
    let ruleSet = document.getElementById('ruleSet');
    ruleSet.classList.remove('hidden');
    let ruleSetContainer = document.getElementById('ruleSetContainer');
    ruleSetContainer.classList.remove('hidden');

    let ruleSetBox = document.createElement('div');
    ruleSetBox.className = 'rule-set-box flex flex-col space-y-4 p-4 py-4 bg-white rounded-lg shadow-md';

    ruleSetBox.innerHTML = `
        <div class="flex flex-col w-full">
            <label class="text-sm font-medium text-gray-700">Property</label>
            <input type="text" class="property-input px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full">
        </div>
        <div class="flex flex-col w-full">
            <label class="text-sm font-medium text-gray-700">Operator</label>
            <select class="operator-input px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full">
                <option value="==">==</option>
                <option value=">">></option>
                <option value=">=">>=</option>
                <option value="<"><</option>
                <option value="<="><=</option>
            </select>
        </div>
        <div class="flex flex-col w-full">
            <label class="text-sm font-medium text-gray-700">Value</label>
            <input type="text" class="value-input px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full">
        </div>
    `;

    ruleSetContainer.appendChild(ruleSetBox);
}

document.getElementById('appendButton').addEventListener('click', function () {
    // Get the JSON output
    let jsonOutput = document.getElementById('jsonResult').textContent;
    let jsonData = JSON.parse(jsonOutput)

    console.log(jsonOutput)
    console.log(jsonData)
    //
    // Get all rule-set-box elements
    let ruleSetBoxes = document.querySelectorAll('.rule-set-box');
    jsonData.flags["CHANGE-ME"].targeting.if = [];

    ruleSetBoxes.forEach(ruleSetBox => {
        // Extract values from the inputs
        let property = ruleSetBox.querySelector('.property-input').value;
        let operator = ruleSetBox.querySelector('.operator-input').value;
        let value = ruleSetBox.querySelector('.value-input').value;


        let varObject = {};
        varObject.var = property;
        // // Create the object structure
        let ruleObject = {
            [operator]: [varObject, value]
        };

        jsonData.flags["CHANGE-ME"].targeting.if.push(ruleObject)

        console.log(ruleObject)
    });


    // Update the JSON output
    document.getElementById('jsonResult').textContent = JSON.stringify(jsonData, null, 2);
});