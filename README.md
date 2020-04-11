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
    
**Validators: [CrossValidator]**     
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


