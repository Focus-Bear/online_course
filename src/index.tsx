import './index.css';
import './services/i18next';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import Auth0ProviderWithHistory from 'services/auth0-provider-with-history';
import Navigation from './navigation';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Provider store={store()}>
      <Auth0ProviderWithHistory>
        <Navigation />
      </Auth0ProviderWithHistory>
    </Provider>
  </BrowserRouter>,
);
