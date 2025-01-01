const createDateTimeStringPropType = (isRequired) => {
    return (props, propName, componentName) => {
        const prop = props[propName];
        if (prop == null) {
            // Prop is missing
            if (isRequired) {
                return new Error(
                    `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${props[propName]}\`.`
                );
            }
            // Prop is optional. Do nothing.
        } else {
            if (typeof prop !== 'string') {
                return new Error(
                    `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected a string.`
                );
            }

            // Validate if the string can be parsed as a date
            const date = new Date(prop);
            if (isNaN(date.getTime())) {
                return new Error(
                    `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected a stringified datetime.`
                );
            }
        }
        // Validation passed
    };
};

const dateTimeStringPropType = createDateTimeStringPropType(false);
dateTimeStringPropType.isRequired = createDateTimeStringPropType(true);

export { dateTimeStringPropType };

