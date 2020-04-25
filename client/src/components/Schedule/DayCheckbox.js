import React, { Fragment } from 'react';
import { Field } from 'formik';

export default function DayCheckbox(props) {
    return (
        <Field name={props.name} title={props.title}>
            {({ field, form }) => (
                <div title={props.title} className='form-check form-check-inline days-selector'>
                    {field.value !== undefined && (
                        <Fragment>
                            <input
                                type='checkbox'
                                className='form-check-input'
                                {...props}
                                id={props.title}
                                checked={field.value.includes(props.value)}
                                onChange={() => {
                                    if (field.value.includes(props.value)) {
                                        const nextValue = field.value.filter(value => value !== props.value);
                                        form.setFieldValue(props.name, nextValue);
                                    } else {
                                        const nextValue = field.value.concat(props.value);
                                        form.setFieldValue(props.name, nextValue);
                                    }
                                }}
                            />
                            <label htmlFor={props.title} className='form-check-label'>
                                {props.label}
                            </label>
                        </Fragment>
                    )}
                </div>
            )}
        </Field>
    );
}
