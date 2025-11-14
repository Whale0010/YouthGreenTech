import { Providers } from './providers';
import './globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'EspoirEnAction - Association Humanitaire',
  description: 'Ensemble pour un monde plus solidaire. Découvrez nos actions humanitaires, nos projets et comment nous aider.',
  keywords: 'association, solidarité, humanitaire, bénévolat, don',
  authors: [{ name: 'EspoirEnAction' }],
  viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://espoirenaction.org',
    siteName: 'EspoirEnAction',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Header />
          <div className="pt-16 min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}