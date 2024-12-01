import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR,
  APP_READY,
  initialize,
  mergeConfig,
  subscribe,
} from '@edx/frontend-platform';
import {
  AppProvider,
  ErrorPage,
} from '@edx/frontend-platform/react';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from '@edx/frontend-component-header';
import FooterSlot from '@edx/frontend-component-footer';

import { QueryClient, QueryClientProvider } from 'react-query';
import messages from './i18n';
import configureStore from './data/configureStore';

import './index.scss';
import Head from './head/Head';

import AppRoutes from './routes/AppRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set staleTime to 5 minutes
      staleTime: 5 * 60 * 1000,
      // Set cacheTime to 60 minutes
      cacheTime: 60 * 60 * 1000,
      // Set the retry count for queries here
      retry: 1, // Set the retry count for queries here
    },
    mutations: {
      retry: 1, // Set the retry count for mutations here
    },
  },
});

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={configureStore()}>
      <QueryClientProvider client={queryClient}>
        <Head />
        <Header mfeTitle="profile.page.title" />
        <main id="main">
          <AppRoutes />
        </main>
        <FooterSlot />
      </QueryClientProvider>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        COLLECT_YEAR_OF_BIRTH: process.env.COLLECT_YEAR_OF_BIRTH,
        ENABLE_SKILLS_BUILDER_PROFILE: process.env.ENABLE_SKILLS_BUILDER_PROFILE,
        AC_INSTANCE_CONFIG_API_URL: process.env.AC_INSTANCE_CONFIG_API_URL,
      }, 'App loadConfig override handler');
    },
  },
});
