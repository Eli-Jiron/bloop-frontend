import { AuthContextProvider } from '@context/AuthContext';
import Nav from '@components/Nav';
import RoutesApp from '@routes/RoutesApp';

const App = () => {
  return (
    <AuthContextProvider>
      <Nav />
      <RoutesApp />
    </AuthContextProvider>
  );
};

export default App;
