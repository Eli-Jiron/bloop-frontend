import { postData } from '@services/crud';
import { useAuthContext } from '@context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const { setUpdateUser } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const url = '/users/login/';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    if (
      !/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(formData.email)
    ) {
      setErrorMsg('Ingrese un correo valido');
      return;
    }

    if (!/^(?=.*[A-Z])(?=(.*\d){2}).{8,20}$/.test(formData.password)) {
      setErrorMsg(
        'La contraseña debe tener entre 8 y 20 caracteres, al menos una mayúscula y dos número'
      );
      return;
    }

    try {
      const response = await postData(url, formData);
      if (response.status >= 200 && response.status <= 299) {
        setUpdateUser((prev) => prev + 1);
        navigate('/home');
      } else {
        setErrorMsg(response.data.detail);
      }
    } catch (error) {
      setErrorMsg('Error de servidor');
    }
  };
  return (
    <>
      <div>Login</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label htmlFor='email'>Correo:</label>
          <input
            required
            type='email'
            value={formData.email}
            name='email'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Contraseña:</label>
          <input
            required
            type='text'
            maxLength={20}
            value={formData.password}
            name='password'
            onChange={handleChange}
          />
        </div>
        <p>{errorMsg}</p>
        <button type='submit'>Ingresar</button>
      </form>
    </>
  );
};

export default Login;
