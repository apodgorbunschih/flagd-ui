export function resetVariants() {
    let otherInputs = document.getElementById('otherInputs');
    let variants = otherInputs.querySelectorAll('.flex.space-x-2.items-center');
    variants.forEach(variant => otherInputs.removeChild(variant));

    for (let i = 0; i < 2; i++) {
        let newVariant = document.createElement('div');
        newVariant.className = 'flex space-x-2 items-center';
        newVariant.innerHTML = `
        <div class="flex items-center">
            <button class="removeVariant text-red-500">
                &#10060; <!-- Red cross icon -->
            </button>
        </div>
        <div class="flex flex-col w-full">
            <label class="text-sm font-medium text-gray-700">Key</label>
            <input type="text" class="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full">
        </div>
        <div class="flex flex-col w-full">
            <label class="text-sm font-medium text-gray-700">Value</label>
            <input type="text" class="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full">
        </div>
        `;
        otherInputs.insertBefore(newVariant, document.getElementById('addVariant'));

        newVariant.querySelector('.removeVariant').addEventListener('click', function() {
            otherInputs.removeChild(newVariant);
        });
    }
}

export function addVariantEventListener() {
    document.getElementById('addVariant').addEventListener('click', function() {
        let otherInputs = document.getElementById('otherInputs');
        let newVariant = document.createElement('div');
        newVariant.className = 'flex space-x-2 items-center';
        newVariant.innerHTML = `
        <div class="flex items-center">
            <button class="removeVariant text-red-500">
                &#10060; <!-- Red cross icon -->
            </button>
        </div>
        <div class="flex flex-col w-full">
            <label class="text-sm font-medium text-gray-700">Key</label>
            <input type="text" class="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full">
        </div>
        <div class="flex flex-col w-full">
            <label class="text-sm font-medium text-gray-700">Value</label>
            <input type="text" class="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full">
        </div>
        `;
        otherInputs.insertBefore(newVariant, this);

        newVariant.querySelector('.removeVariant').addEventListener('click', function() {
            otherInputs.removeChild(newVariant);
        });
    });
}