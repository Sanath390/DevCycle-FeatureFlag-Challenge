import './App.css';
import { AppRoutes } from './main/Routes';
import { useIsDevCycleInitialized, withDevCycleProvider } from '@devcycle/react-client-sdk';
import { OpenFeatureProvider, OpenFeature } from '@openfeature/react-sdk';
import DevCycleProvider from '@devcycle/openfeature-web-provider'
import { LoadingSpinner } from './main/LoadingState';
import { useEffect } from 'react';

const devSdkKey = process.env.REACT_APP_DEVCYCLE_CLIENT_SDK_KEY;

function App() {
  const devCycleReady = useIsDevCycleInitialized();

  useEffect(() => {
    const initializeOpenFeature = async () => {
      try {
        await OpenFeature.setContext({ user_id: 'demo' });
        await OpenFeature.setProviderAndWait(new DevCycleProvider(devSdkKey));
      } catch (error) {
        console.error('Failed to initialize OpenFeature:', error);
      }
    };

    initializeOpenFeature();
  }, []); 

  if (!devCycleReady) {
    return <LoadingSpinner />;
  }

  return (
    <OpenFeatureProvider>
      <AppRoutes />
    </OpenFeatureProvider>
  );
}

export default withDevCycleProvider({ 
  sdkKey: devSdkKey,
  user: {
    user_id: 'demo',
  },
 })(App);
