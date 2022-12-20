import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children?: JSX.Element;
};

function Auth0ProviderWithHistory({ children }: Props) {
  const uri = process.env.REACT_APP_AUTH0_REDIRECT_URI;

  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      redirectUri={uri}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={true}
      cacheLocation='localstorage'
      scope='offline_access openid profile email'
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0ProviderWithHistory;
