import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { Converter } from './features/Converter';
import { RatesProvider } from './providers/RatesContext';

const App = () => (
  <RatesProvider>
    <Layout>
      <Header />
      <Converter />
    </Layout>
  </RatesProvider>
);

export default App;
