import { validateJson } from './validation.js';
import { createConfig } from './configuration.js';
import { resetVariants, addVariantEventListener } from './variants.js';

addVariantEventListener();

document.getElementById('validateButton').addEventListener('click', validateJson);

document.getElementById('flagType').addEventListener('change', function() {
    let booleanInputs = document.getElementById('booleanInputs');
    let otherInputs = document.getElementById('otherInputs');
    if (this.value === 'boolean') {
        booleanInputs.classList.remove('hidden');
        otherInputs.classList.add('hidden');
    } else {
        booleanInputs.classList.add('hidden');
        otherInputs.classList.remove('hidden');
    }
    resetVariants();
});

document.getElementById('flagStateToggle').addEventListener('change', function() {
    let flagState = this.checked ? 'ENABLED' : 'DISABLED';

    // Update the JSON output
    let jsonOutput = document.getElementById('jsonResult').textContent;
    let jsonData = JSON.parse(jsonOutput);
    let flagName = document.getElementById('flagName').value;

    if (jsonData.flags[flagName]) {
        jsonData.flags[flagName].state = flagState;
        document.getElementById('jsonResult').textContent = JSON.stringify(jsonData, null, 2);
    }
});


document.getElementById('generateButton').addEventListener('click', function() {
    let flagName = document.getElementById('flagName').value;
    let flagType = document.getElementById('flagType').value;
    let flagState = document.getElementById('flagStateToggle').checked ? 'ENABLED' : 'DISABLED';
    let validationMessageDiv = document.getElementById('validationMessage');

    if (!flagName) {
        validationMessageDiv.textContent = 'Flag name cannot be empty!';
        validationMessageDiv.style.color = 'red';
        return;
    }

    let variants = [];

    if (flagType === 'boolean') {
        let keyTrue = document.querySelector('.key-true').value;
        let keyFalse = document.querySelector('.key-false').value;
        variants.push({ key: keyTrue, value: true });
        variants.push({ key: keyFalse, value: false });
    } else {
        let otherInputs = document.getElementById('otherInputs');
        let variantElements = otherInputs.querySelectorAll('.flex.space-x-2.items-center');
        variantElements.forEach(variant => {
            let key = variant.querySelector('input[type="text"]').value;
            let value = variant.querySelectorAll('input[type="text"]')[1].value;
            variants.push({ key: key, value: value });
        });
    }

    let config = createConfig(flagName, flagType, variants, flagState);
    document.getElementById('jsonResult').textContent = JSON.stringify(config, null, 2);
    validationMessageDiv.textContent = '';
});

document.querySelectorAll('.setDefaultVariant').forEach(button => {
    button.addEventListener('click', function() {
        let parentDiv = this.closest('.flex.space-x-2.items-center');
        let keyInput = parentDiv.querySelector('input[type="text"]').value;
        let jsonOutput = document.getElementById('jsonResult').textContent;
        let jsonData = JSON.parse(jsonOutput);

        let flagName = document.getElementById('flagName').value;
        let flagType = document.getElementById('flagType').value;

        if (flagType === 'boolean') {
            jsonData.flags[flagName].defaultVariant = keyInput;
        } else {
            jsonData.flags[flagName].defaultVariant = keyInput;
        }

        document.getElementById('jsonResult').textContent = JSON.stringify(jsonData, null, 2);
    });
});
