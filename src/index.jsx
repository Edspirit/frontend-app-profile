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

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

import { QueryClient, QueryClientProvider } from 'react-query';
import REACT_QUERY_CONSTANTS from './constants/react-query-constants';

import appMessages from './i18n';
import configureStore from './data/configureStore';

import './index.scss';
import Head from './head/Head';

import AppRoutes from './routes/AppRoutes';

subscribe(APP_READY, () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      ...REACT_QUERY_CONSTANTS,
    },
  });

  ReactDOM.render(
    <AppProvider store={configureStore()}>
      <QueryClientProvider client={queryClient}>
        <Head />
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </QueryClientProvider>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [
    appMessages,
    headerMessages,
    footerMessages,
  ],
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        COLLECT_YEAR_OF_BIRTH: process.env.COLLECT_YEAR_OF_BIRTH,
        AC_INSTANCE_CONFIG_API_URL: process.env.AC_INSTANCE_CONFIG_API_URL,
        ENABLE_SKILLS_BUILDER_PROFILE: process.env.ENABLE_SKILLS_BUILDER_PROFILE,
      }, 'App loadConfig override handler');
    },
  },
});
