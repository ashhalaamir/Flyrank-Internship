import SettingsForm from './components/SettingsForm.jsx';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            FR
          </div>
          <div>
            <p className="brand-eyebrow">FlyRank</p>
            <h1>Restaurant Settings</h1>
          </div>
        </div>
        <p className="app-lead">
          Manage your profile and restaurant details from one place.
        </p>
      </header>

      <main className="app-main">
        <SettingsForm />
      </main>
    </div>
  );
}
