import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from './MyForm.module.scss';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// валидация формы

const validationSchema = yup.object({
    name: yup.string('Введите ваше имя').required('Имя обязательно'),
    phone: yup.string('Введите ваш номер телефона'),
    text: yup.string('Введите ваше имя').required('Телефон обязателен'),
});

const MyForm = () => {
    const formik = useFormik({
        initialValues: {
            name: 'Иван Иванов',
            phone: '+7(999)-999-99-99',
            text: 'Какой-то текст',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let valuesToJSON = JSON.stringify(values, null, 3);
            let number = values.phone;
            let regexp = /\d/g;
            number.match(regexp);
            values.phone = '+' + number.match(regexp).join('');
            handleClickOpen(values);
        },
    });

    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [text, setText] = React.useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (values) => {
        setOpen(true);
        setName(values.name);
        setPhone(values.phone);
        setText(values.text);
    };

    const data = {
        success: 'Успех! Данные доставлены',
        error: 'Ошибка',
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Имя"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    sx={{ marginTop: 2 }}
                />
                <MuiPhoneNumber
                    fullWidth
                    id="phone"
                    defaultCountry="ch"
                    variant="outlined"
                    name="phone"
                    label="Телефон"
                    type="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    sx={{ marginTop: 2 }}
                />
                <TextField
                    multiline
                    maxRows={4}
                    placeholder="Бу-бу-бу"
                    fullWidth
                    id="text"
                    name="text"
                    label="Сообщение"
                    type="text"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    error={formik.touched.text && Boolean(formik.errors.text)}
                    helperText={formik.touched.text && formik.errors.phtextone}
                    sx={{ marginTop: 2 }}
                />
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ marginTop: 2, height: '56px' }}
                >
                    Отправить
                </Button>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle id="alert-dialog-title">
                        {data.success}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Имя: {name}
                            <br />
                            Телефон: {phone}
                            <br />
                            Сообщение: {text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Окей</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
};

export default MyForm;
