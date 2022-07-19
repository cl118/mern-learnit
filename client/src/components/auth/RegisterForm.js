import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Passwords do not match' });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: 'danger', message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className='my-4' onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            required
            value={password}
            onChange={onChangeRegisterForm}
            className='my-3'
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
            className='mb-3'
          />
        </Form.Group>
        <Button varient='success' type='submit'>
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to='/login'>
          <Button varient='info' size='sm' className='ml-2'>
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
