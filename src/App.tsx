// App.tsx
import { Routes, Route } from 'react-router-dom';
import FaceMeshView from './components/FaceMeshView';
import SiteHeader from './components/SiteHeader';
import SiteEntryDialog from './components/SiteEntryDialog';
import Privacy from './components/Privacy';
import TermsAndConditions from './components/TermsAndConditions';
import SiteFooter from './components/SiteFooter';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bg-black">
            <SiteEntryDialog />
            <SiteHeader />
            <FaceMeshView />
            <SiteFooter />
          </div>
        }
      />

      <Route path="/privacy/" element={<Privacy />} />
      <Route path="/terms/" element={<TermsAndConditions />} />

      <Route path="*" element={<h1>404 — Not Found</h1>} />
    </Routes>
  );
}