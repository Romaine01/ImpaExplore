import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../features/auth/AuthProvider';

function render(path: string) {
  const client=new QueryClient();
  client.setQueryData(['me'],{id:'test-tourist',name:'Test tourist',roles:['tourist']});
  return renderToString(<QueryClientProvider client={client}><MemoryRouter initialEntries={[path]}><AuthProvider><AppRoutes /></AuthProvider></MemoryRouter></QueryClientProvider>);
}

describe('public routes', () => {
  it('renders the public home without authentication', () => {
    expect(render('/')).toContain('Find your way to the places worth remembering.');
  });
  it('keeps the independent-platform disclaimer', () => {
    expect(render('/about')).toContain('not affiliated with the LGU');
  });
  it('renders a useful unknown-route state', () => {
    expect(render('/missing')).toContain('Page not found');
  });
});
