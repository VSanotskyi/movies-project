import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import {
  ThemeProvider,
  LoadingProvider,
  ErrorProvider,
  ResetPageProvider,
  GenreProvider,
} from './hoc';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider>
    <ErrorProvider>
      <LoadingProvider>
        <GenreProvider>
          <ResetPageProvider>
            <BrowserRouter basename={'movies-project-without-redux'}>
              <App />
            </BrowserRouter>
          </ResetPageProvider>
        </GenreProvider>
      </LoadingProvider>
    </ErrorProvider>
  </ThemeProvider>,
);
