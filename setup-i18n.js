const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'i18n', 'locales', 'en');
fs.mkdirSync(localesDir, { recursive: true });

const namespaces = {
  common: { loading: "Loading...", error: "Something went wrong", retry: "Retry" },
  auth: { welcome: "Welcome back", login: "Login" },
  onboarding: { title: "Let's get started" },
  home: { greeting: "Welcome to CoBuddy", emptyCategories: "No activities currently available in your city." },
  discover: { searchPlaceholder: "Search for companions...", emptyList: "No companions found matching these exact filters. Try broadening your search." },
  companionProfile: { bookNow: "Book Now" },
  booking: { emptyActive: "You have no active or past bookings yet." },
  chat: { emptyList: "No messages yet. CoBuddy Concierge is always here to help!" },
  safety: { emptyTrustedContacts: "Add your first emergency contact to ensure maximum safety during meetups." },
  profile: { emptyWallet: "No transactions found in your history.", emptyReviews: "You haven't received any reviews from companions yet." },
  systemStates: { suspended: "Account Suspended" }
};

for (const [ns, content] of Object.entries(namespaces)) {
  fs.writeFileSync(path.join(localesDir, `${ns}.json`), JSON.stringify(content, null, 2));
}

const oldFile = path.join(__dirname, 'src', 'i18n', 'locales', 'en.json');
if(fs.existsSync(oldFile)) fs.unlinkSync(oldFile);

console.log('i18n namespaces created successfully');
