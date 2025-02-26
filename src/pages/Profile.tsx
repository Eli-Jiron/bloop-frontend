import { useAuthContext } from '@context/AuthContext';

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <div>
      {user ? (
        <ul>
          <li>
            <p>Nombre de muestra: {user.displayname}</p>
          </li>
          <li>
            <p>Nombre de usuario: {user.username}</p>
          </li>
          <li>
            <p>Correo: {user.email}</p>
          </li>
        </ul>
      ) : (
        <div>Hola mundo</div>
      )}
    </div>
  );
};

export default Profile;
