import React, { useState } from 'react';

import { postData } from '@services/crud';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const url = '/users/register/';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!/^[A-Za-z0-9._]+$/.test(formData.username)) {
      setErrorMsg(
        'Nombre de usuario no valido (Solo letras, números, "." y "_")'
      );
      return;
    }

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
        navigate('/login');
      } else {
        setErrorMsg(response.data.detail);
      }
    } catch (error) {
      setErrorMsg('Error de servidor');
    }
  };

  return (
    <>
      <div>Registro</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label htmlFor='username'>Nombre de usuario:</label>
          <input
            required
            type='text'
            value={formData.username}
            name='username'
            onChange={handleChange}
          />
        </div>
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
        <button type='submit'>Registrarse</button>
      </form>
    </>
  );
};

export default Register;
