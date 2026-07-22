import { useState } from 'react';
import SettingsForm from './components/SettingsForm.jsx';

const demoProfile = {
  displayName: 'Ashhal Aamir',
  email: 'ashhal@example.com',
  username: 'ashhal_aamir',
  bio: 'Building polished front-ends for FlyRank.',
  theme: 'system',
  emailNotifications: true,
  marketingEmails: false,
};

function App() {
  const [lastSaved, setLastSaved] = useState(null);

  async function handleSave(data) {
    // Simulates an API call
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLastSaved(data);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            FR
          </span>
          <div>
            <p className="brand-eyebrow">FlyRank Internship</p>
            <h1>Account Settings</h1>
          </div>
        </div>
        <p className="app-lead">
          Manage your profile, preferences, and security in one place.
        </p>
      </header>

      <main className="app-main">
        <SettingsForm initialValues={demoProfile} onSave={handleSave} />

        {lastSaved && (
          <aside className="saved-preview" aria-live="polite">
            <h2>Last saved payload</h2>
            <pre>{JSON.stringify(lastSaved, null, 2)}</pre>
          </aside>
        )}
      </main>
    </div>
  );
}

export default App;
