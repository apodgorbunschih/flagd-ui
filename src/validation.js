export async function validateJson() {
    let jsonOutput = document.getElementById('jsonResult').textContent;
    let jsonData = JSON.parse(jsonOutput);
    let validationMessageDiv = document.getElementById('validationMessage');

    try {
        const [schemaResponse, targetingResponse] = await Promise.all([
            fetch('https://flagd.dev/schema/v0/flags.json'),
            fetch('https://flagd.dev/schema/v0/targeting.json')
        ]);

        if (!schemaResponse.ok || !targetingResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const schema = await schemaResponse.json();
        const targetingSchema = await targetingResponse.json();

        let ajv = new Ajv();
        ajv.addSchema(targetingSchema, 'https://flagd.dev/schema/v0/targeting.json');
        let validate = ajv.compile(schema);
        let valid = validate(jsonData);

        if (valid) {
            validationMessageDiv.textContent = 'JSON is valid!';
            validationMessageDiv.style.color = 'green';
        } else {
            validationMessageDiv.textContent = 'JSON is invalid: ' + ajv.errorsText(validate.errors);
            validationMessageDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Error fetching schema:', error);
        validationMessageDiv.textContent = 'Error fetching schema: ' + error.message;
        validationMessageDiv.style.color = 'red';
    }
}