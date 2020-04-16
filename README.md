# Introduction
Right, so here is another form library. I heard you! But …
After I spent some time with Reactive Form in angular, I was searching for a way to make form easier to use, without all the boilerplate we use to have in react.
    
    
# Installation
You can use npm or yarn to fetch the library:    
<code>npm install reformless</code>    
<code>yarn add reformless</code>
    
    
# Get started
The aim is to create forms effortlessly, and most of form we used have simple requirements. 
    
    
### Basic example
```jsx 
code sample
```
    
    
## API
    
### Form
This component is the root of your form, you should always have it. The Form keeps track of the values, the validity and manage the changeEvent of child inputs. 
```jsx 
<Form valuesChange={valueChange} validators={[equal('password', 'verifyPassword')]}></Form>
```
#### Props
    
**Validators: CrossValidator[]**     
This prop should have the list of “cross Validators”, which are validators you can use for multiple values (like checking that two fields values are equals). See below for more details.
     
***valueChanges: (values: { [name: string]: any }) => void***   
You can pass to this prop a function which will be called every time a value in the form changes. The parameter of the function is a key-value object, the key being the name of the field.
     
***validityChanges: (validity: Validity) => void***    
The function passed to this prop will be called every time the validity of the form changes.
     
#### Children
     
The children of the Form component can either be: 
- Some FormField : useful if you need validators. 
- Some html input : in that case, do not forget to fill the name attribute.
It is possible to mix the two types of children.
    
> The FormField component relies on event bubbling, you should not stop the propagation of the a change event inside any of the children.
     
     
### FormField
      
This component can be used inside a Form to encapsulate an input. It aims to remove the burden of defining a change event, even for simple input. You ***should always*** pass a name prop to the component.
      
#### Simple input field
You can define simple input this way. All inputs props are supported:
```jsx
<FormField name="firstname" default/>
```
A password field can be defined like this:
```jsx
<FormField name="password" type=”password”/>
```
A radio field:
```jsx
<FormField name="radio" value="one" type="radio" />
```
You get the idea, for all input having a type attribute, FormField can used liked showed.
     
#### Custom Fields
For all others html field, like select or textarea, you can wrap them with FormField like this. This is also the case if you have a custom field.
>  The prop name is mandatory and help the component store effectively the value of the field.

```jsx
<FormField name="buddy">
  <select>
    <option value={0}>Chris</option>
    <option value={1}>Didier</option>
  </select>
</FormField>
```
> It is also possible to pass your own onChange handler but remember not to stop the propagation of the event.

#### Props
    
***name: string***    
The name associated to the fields, this prop is mandatory.
    
***validators: Validators[]***    
The list of validators applied to the field. See below for more details on validators.
      
      
### FormErrorMessage
This component wraps the content you want to show when one or more validations fails. 
```jsx
<FormErrorMessage fieldName="password">ERREUR on password</FormErrorMessage>
  <FormField name="verifyPassword" />
<FormErrorMessage validatorName="equal">ERREUR on verifiy password</FormErrorMessage>
```
       
#### Props
     
***fieldName: string***   
When you set this prop, you’re telling Reformless to show the child error message if the field with this name is invalid. If you set only this prop, the error message will be displayed for all errors on the field.
      
***validatorName: string***   
Use this prop if you want the error message to be displayed for a validator. If you set only this prop, the error message will only be displayed if a cross validator returns invalid.   
Used in conjunction with the fieldName prop, you tell Reformless to only show this error for a field and a particular validation.

### Validation
Reformless relies on validators to perform input validations. Validators are objects describing how the validation should be done. 
There are two kind of validators: field validators (ironically, the type is Validator) and cross validators (the type is CrossValidator). They should be define like this: 

```javascript
/** Validate that a value is smaller than a certain threshold */
export function max(value: number): Validator | CrossValidator {
  return {
    name: 'min',
    validation: minValidation,
    arguments: [value],
  };
}
```
***name***
the name property hold the actual name of the validator. This name will be used to identify the validator result when using FormErrorMessage.  

***arguments***
They are additional arguments you want your validators to have when performing the validation. For exemple, implementing a minLength validation you want to add the min value as an argument.

***validation***
This is the function performing the validation. . Each validator type has its own validation function definition:    
- field validator: the validation function should be defined like this : 
```javascript
function maxLengthValidation(value: any, length: number): boolean
```   
The function should accept as first parameter the value of the field, following by optional arguments (described earlier). This type is used for validation performed on only one field, like min length, email validators etc.
- cross validator: described like this:
```javascript
function equalValidation(fields: { [name: string]: FormFieldData }, fieldsName: string[]): boolean
```    
The function should accept a dictionary of all the form fields, followed by optional arguments. This type of validator are used when you want to perform validation across multiple fields, like password confirmation.    
Here is a typical example of a validator

```javascript
/** Validate that a value is smaller than a certain threshold */
export function max(value: number): Validator {
  return {
    name: 'min',
    validation: minValidation,
    arguments: [value],
  };
}

function minValidation(value: number, minValue: number) {
  return Number(value) ? value <= minValue : false;
}
```

#### Built-in validators
There are some built-in validators provided in the library.    
***email***: validate that a value is in a correct email format.    
***max***: validate that  a value is smaller than a certain threshold provided as parameter.    
***min***: validate that  a value is greater than a certain threshold provided as parameter.    
***maxLength***: Specify the maximum length for a value.    
***minLength***: Specify the minimum length for a value.      
***required***: Mark a field as required.     
***regex***: Validate a value against a regular expression. The pattern should be passed as a string (no ‘/’ at the start nor end of the value).      
***equal***: A CrossValidator, validate that several fields have the same value. The fields name are passed as parameters.    

#### Html validators
When using html inputs directly, it is possible to use html validations (like required, maxLength etc.)
```jsx
<input name="name" required maxLength={15} />
```
