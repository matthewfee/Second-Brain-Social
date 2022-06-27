import '../styles/globals.css';
import UserProvider from '../contexts/StateContext';
import { Container } from '../components';

const MyApp = ({ Component, pageProps }) => (
  <UserProvider>
    <Container isLoggedIn>
      <Component {...pageProps} />;
    </Container>
  </UserProvider>
);

export default MyApp;
