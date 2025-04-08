export function createConfig(flagName, flagType, variants, flagState) {
    let config = {
        "$schema": "https://flagd.dev/schema/v0/flags.json",
        "flags": {},
        "$evaluators": {},
        "metadata": {}
    };

    let formattedVariants = {};
    variants.forEach(variant => {
        formattedVariants[variant.key] = variant.value;
    });

    config.flags[flagName] = {
        "state": flagState,
        "defaultVariant": variants[0].key,
        "variants": formattedVariants,
        "targeting": {},
        "metadata": {}
    };

    return config;
}