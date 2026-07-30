const fs = require('fs');
const path = require('path');

// 1. wallet.mock.ts
let walletMockFile = 'src/services/mock/wallet.mock.ts';
let walletMockContent = fs.readFileSync(walletMockFile, 'utf8');

const txMissing = `  tx_003: {
    id: 'tx_003', icon: 'arrow-u-left-top', label: 'Refund: Session Cancelled', category: 'Refunds',
    date: 'Oct 18, 2023', time: '10:00 IST', amount: '+ ₹1,200', positive: true, status: 'Refunded',
    refId: '#CB-REF-8813', paymentSource: 'CoBuddy Wallet',
    breakdown: [{ label: 'Refund Amount', value: '₹1,200' }],
  },
  tx_004: {
    id: 'tx_004', icon: 'wallet-plus', label: 'Money Added', category: 'Money Added',
    date: 'Oct 10, 2023', time: '13:15 IST', amount: '+ ₹2,000', positive: true, status: 'Successful',
    refId: '#CB-ADD-8830', paymentSource: 'Card ending in 4242',
    breakdown: [{ label: 'Top-up Amount', value: '₹2,000' }],
  },
  tx_005: {
    id: 'tx_005', icon: 'account-clock', label: 'Session with Rahul', category: 'Spent',
    date: 'Oct 05, 2023', time: '17:00 IST', amount: '- ₹1,600', positive: false, status: 'Pending',
    refId: '#CB-SES-7756', paymentSource: 'CoBuddy Wallet',
    companion: 'Rahul Verma',
    duration: '90 mins',
    breakdown: [
      { label: 'Session Fee (Hourly)', value: '₹1,350' },
      { label: 'Platform Fee', value: '₹150' },
      { label: 'Taxes (GST 18%)', value: '₹100' },
    ],
  },`;

walletMockContent = walletMockContent.replace(
  /tx_002: \{[\s\S]*?\},?\n\};/,
  match => match.replace(/\n\};$/, `,\n${txMissing}\n};`)
);

fs.writeFileSync(walletMockFile, walletMockContent);
console.log('Updated wallet.mock.ts');


// 2. TransactionDetailScreen.tsx
let txDetailFile = 'src/screens/wallet/TransactionDetailScreen.tsx';
let txDetailContent = fs.readFileSync(txDetailFile, 'utf8');

const fallbackUI = `  if (!tx) {
    return (
      <SafeAreaView style={styles.root} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => smartGoBack()} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel={t('a11yGoBack', 'Go back')}>
            <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('headerTitle', 'Transaction Details')}</Text>
          <View style={styles.backBtn} />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <Icon name="receipt" size={48} color={theme.colors.textSecondary} />
          <Text style={{ fontSize: 15, color: theme.colors.textSecondary }}>{t('emptyTextNotFound', 'Transaction not found.')}</Text>
        </View>
      </SafeAreaView>
    );
  }`;

txDetailContent = txDetailContent.replace(
  /const tx = MOCK_TRANSACTION_DETAILS\[route\.params\?\.transactionId \|\| 'tx_002'\]; \/\/ Default fallback for dev/,
  `const tx = MOCK_TRANSACTION_DETAILS[route.params?.transactionId || 'tx_002'];\n\n${fallbackUI}`
);

fs.writeFileSync(txDetailFile, txDetailContent);
console.log('Updated TransactionDetailScreen.tsx');


// 3. BookingDetailScreen.tsx
let bookingDetailFile = 'src/screens/bookings/BookingDetailScreen.tsx';
let bookingDetailContent = fs.readFileSync(bookingDetailFile, 'utf8');

bookingDetailContent = bookingDetailContent.replace(
  /import \{ MOCK_DETAILS \} from '\.\.\/\.\.\/services\/mock';/,
  "import { MOCK_DETAILS, MOCK_BOOKINGS } from '../../services/mock';"
);

bookingDetailContent = bookingDetailContent.replace(
  /const bookingId = route\.params\?\.bookingId \|\| MOCK_DETAILS\.id;\n\s*const bookingStatus = route\.params\?\.status \|\| MOCK_DETAILS\.status;\n\s*const data = \{ \.\.\.MOCK_DETAILS, id: bookingId, status: bookingStatus \};/,
  `const bookingId = route.params?.bookingId;
  const matchedBooking = MOCK_BOOKINGS.find(b => b.id === bookingId);
  const data = matchedBooking
    ? { ...MOCK_DETAILS, ...matchedBooking, status: route.params?.status || matchedBooking.displayStatus }
    : { ...MOCK_DETAILS, id: bookingId || MOCK_DETAILS.id, status: route.params?.status || MOCK_DETAILS.status };`
);

fs.writeFileSync(bookingDetailFile, bookingDetailContent);
console.log('Updated BookingDetailScreen.tsx');

