import * as yup from 'yup';

const schema = yup.object({
    sex: yup.string().email().required(),
    age: yup.number().integer().min(0).required(),
    
});

