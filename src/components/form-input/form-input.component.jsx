
import React from 'react';
// import './form-input.styles.scss';


import { 
    FormInputContainer,
    FormInputField,
    FormInputLabel
} from './form-input.styles';


// this will be functional component since we don't need any state
const FormInput = ( { handleChange, label, ...otherProps } ) => (
    // ...otherProps will end being all the props we pass to the input element in the
    // SignIn component such as name, type, value and required and with the label prop
    // we are going to selectively render a label or in other words if we want to pass
    // in a label prop then we will generate one otherwise we will render nothing or " null "
    // whenever the user has typed anything into the input element we will add the class name
    // " shrink " to the label and the label will always have the class name
    // " form-input-label " and we use single quotes around ' shrink ' to donate that this is
    // a string value and form-input-label will donate a string value as well and in HTML both
    // strings will be enclosed in double quotes

    // remember, for " otherProps.value.length ": " If the length equals to 0 then it is valued
    // as false.  This is possible because JavaScript is not strongly typed, in strongly typed
    // languages length would not be castable as boolean. In JavaScript, a number is only
    // considered "falsey" when it is 0. Any other value is "truthy". "; however, I did
    // " otherProps.value.length > 0 " since this made more intuitive sense to me

    // remember, when the label renders in HTML, the class name form-input-label will be
    // automatically enclosed in double quotes
    <FormInputContainer>

        <FormInputField
            onChange={ handleChange }
            { ...otherProps }
        />

        {
            label ? (

                <FormInputLabel
                    className=
                    { 
                        `${ otherProps.value.length > 0 ? 'shrink' : '' } form-input-label`                
                    }
                 >
                    { label }
                </FormInputLabel>

            ) : (

                null

            )
        }

    </FormInputContainer>

);

export default FormInput;
