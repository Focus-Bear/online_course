import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store()}>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </Provider>
  </BrowserRouter>
);
