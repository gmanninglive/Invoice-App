import DateView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Field, ErrorMessage} from 'formik';

export function DatePicker(props) {
    const {label , name, value } = props;
    return (
        <div className='grid m-0 '>
             <label htmlFor={name}>{label}</label> 
            <Field name={name}>{({form, field }) => {
                const { setFieldValue } = form;
                const { value } = field;

            return (
                <DateView
                id={name}
                {...field}
                selected={value}
                onChange={val => setFieldValue(name, val)}
                className="rounded-md"
                />
            )
            }}
            
                
            </Field> 
        </div>
    )
}