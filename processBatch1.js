const fs = require('fs');

function processFile(filePath, ns, replacements, jsonPath) {
    let code = fs.readFileSync(filePath, 'utf8');
    
    // Add Import
    if (!code.includes("useTranslation")) {
        code = code.replace(
            "import { useNavigation } from '@react-navigation/native';",
            "import { useNavigation } from '@react-navigation/native';\nimport { useTranslation } from 'react-i18next';"
        );
        if (!code.includes("useTranslation")) {
            code = code.replace(
                "import React",
                "import { useTranslation } from 'react-i18next';\nimport React"
            );
        }
    }

    // Add Hook
    const componentMatch = code.match(/export const (\w+) =/);
    if (componentMatch) {
        const compName = componentMatch[1];
        if (!code.includes(`const { t } = useTranslation('${ns}');`)) {
            code = code.replace(
                new RegExp(`export const ${compName} = \\([^)]*\\) => \\{`),
                `$& \n  const { t } = useTranslation('${ns}');`
            );
        }
    }

    // Replacements
    let jsonContent = {};
    for (const [search, [key, fallback, replacementStr]] of Object.entries(replacements)) {
        if (replacementStr) {
            code = code.split(search).join(replacementStr);
        } else {
            code = code.split(search).join(`>{t('${key}', '${fallback}')}<`);
        }
        jsonContent[key] = fallback;
    }

    fs.writeFileSync(filePath, code);

    // Save json
    let existingJson = {};
    if (fs.existsSync(jsonPath)) {
        try { existingJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); } catch(e){}
    }
    const finalJson = { ...existingJson, ...jsonContent };
    fs.writeFileSync(jsonPath, JSON.stringify(finalJson, null, 2));
    console.log(`Processed ${filePath}`);
}

const batch = [
    {
        file: 'src/screens/wallet/AddBankAccountScreen.tsx',
        ns: 'wallet.addBankAccount',
        json: 'src/i18n/locales/en/wallet/addBankAccount.json',
        replacements: {
            '>Add Bank Account<': ['headerTitle', 'Add Bank Account'],
            ">Secure Bank Linking<": ['securityTitle', 'Secure Bank Linking'],
            ">We'll deposit a small amount (like ₹1) to instantly verify your account before saving.<": ['securitySub', "We'll deposit a small amount (like ₹1) to instantly verify your account before saving."],
            ">ACCOUNT DETAILS<": ['sectionTitle', 'ACCOUNT DETAILS'],
            ">Account Holder Name<": ['inputHolder', 'Account Holder Name'],
            ">Account Number<": ['inputAccount', 'Account Number'],
            ">Re-enter Account Number<": ['inputReAccount', 'Re-enter Account Number'],
            ">Account numbers do not match<": ['errorMismatch', 'Account numbers do not match'],
            ">IFSC Code<": ['inputIfsc', 'IFSC Code'],
            ">Your details are encrypted and securely sent directly to our banking partner.<": ['pciNote', 'Your details are encrypted and securely sent directly to our banking partner.'],
            ">Verify & Save Account<": ['btnVerify', 'Verify & Save Account']
        }
    },
    {
        file: 'src/screens/wallet/AddMoneyScreen.tsx',
        ns: 'wallet.addMoney',
        json: 'src/i18n/locales/en/wallet/addMoney.json',
        replacements: {
            '>Add Money<': ['headerTitle', 'Add Money'],
            '>CURRENT BALANCE<': ['balanceLabel', 'CURRENT BALANCE'],
            '>Minimum top-up is ₹100. Max limit ₹10,000 per transaction.<': ['helperText', 'Minimum top-up is ₹100. Max limit ₹10,000 per transaction.'],
            '>PAYING FROM<': ['sectionTitle', 'PAYING FROM'],
            '>Change<': ['btnChange', 'Change'],
            '>100% Safe & Secure<': ['trustTitle', '100% Safe & Secure'],
            '>PCI-DSS compliant encrypted payments<': ['trustSub', 'PCI-DSS compliant encrypted payments'],
            '>Proceed to Pay ₹{amount || \'0\'}<': ['proceedToPay', 'Proceed to Pay ₹{{amount}}', ">{t('proceedToPay', 'Proceed to Pay ₹{{amount}}', { amount: amount || '0' })}<"]
        }
    },
    {
        file: 'src/screens/wallet/AddPaymentMethodScreen.tsx',
        ns: 'wallet.addPaymentMethod',
        json: 'src/i18n/locales/en/wallet/addPaymentMethod.json',
        replacements: {
            '>Add New Card<': ['headerTitle', 'Add New Card'],
            '>Secure Payments<': ['securityTitle', 'Secure Payments'],
            ">We'll charge a refundable ₹2 to verify this card.<": ['securitySub', "We'll charge a refundable ₹2 to verify this card."],
            '>CARD DETAILS<': ['sectionTitle', 'CARD DETAILS'],
            '>Name on Card<': ['inputName', 'Name on Card'],
            '>Card Number<': ['inputCardNum', 'Card Number'],
            '>Expiry Date (MM/YY)<': ['inputExpiry', 'Expiry Date (MM/YY)'],
            '>CVV<': ['inputCvv', 'CVV'],
            '>We do not store your full card details. All transactions are PCI-DSS compliant.<': ['pciNote', 'We do not store your full card details. All transactions are PCI-DSS compliant.'],
            '>Verify & Save Card<': ['btnVerify', 'Verify & Save Card']
        }
    },
    {
        file: 'src/screens/wallet/PaymentMethodsScreen.tsx',
        ns: 'wallet.paymentMethods',
        json: 'src/i18n/locales/en/wallet/paymentMethods.json',
        replacements: {
            '>Payment Methods<': ['headerTitle', 'Payment Methods'],
            '>SAVED PAYMENT METHODS<': ['sectionTitle', 'SAVED PAYMENT METHODS'],
            '>Default<': ['defaultBadge', 'Default'],
            '>Add New Card<': ['addCard', 'Add New Card'],
            '>Add UPI ID<': ['addUpi', 'Add UPI ID'],
            '>End-to-end encrypted with AES-256<': ['trustText', 'End-to-end encrypted with AES-256'],
            '>Add UPI ID<': ['modalTitle', 'Add UPI ID'],
            '>Enter your UPI ID<': ['modalLabel', 'Enter your UPI ID'],
            '>Verify & Add<': ['modalVerify', 'Verify & Add']
        }
    },
    {
        file: 'src/screens/wallet/TransactionDetailScreen.tsx',
        ns: 'wallet.transactionDetail',
        json: 'src/i18n/locales/en/wallet/transactionDetail.json',
        replacements: {
            '>Transaction Details<': ['headerTitle', 'Transaction Details'],
            '>TRANSACTION ID<': ['refLabel', 'TRANSACTION ID'],
            '>Secured Transaction<': ['verifiedTitle', 'Secured Transaction'],
            '>Processed via CoBuddy Escrow<': ['verifiedSub', 'Processed via CoBuddy Escrow'],
            '>TRANSACTION INFO<': ['infoTitle', 'TRANSACTION INFO'],
            '>SESSION DETAILS<': ['sessionTitle', 'SESSION DETAILS'],
            '>Companion<': ['infoCompanion', 'Companion'],
            '>Duration<': ['infoDuration', 'Duration'],
            '>PAYMENT BREAKDOWN<': ['breakdownTitle', 'PAYMENT BREAKDOWN'],
            '>TOTAL<': ['totalLabel', 'TOTAL'],
            '>Download Receipt<': ['downloadBtn', 'Download Receipt']
        }
    },
    {
        file: 'src/screens/wallet/TransactionHistoryScreen.tsx',
        ns: 'wallet.transactionHistory',
        json: 'src/i18n/locales/en/wallet/transactionHistory.json',
        replacements: {
            '>Transaction History<': ['headerTitle', 'Transaction History'],
            '>No transactions found.<': ['emptyText', 'No transactions found.']
        }
    },
    {
        file: 'src/screens/wallet/WithdrawalMethodsScreen.tsx',
        ns: 'wallet.withdrawalMethods',
        json: 'src/i18n/locales/en/wallet/withdrawalMethods.json',
        replacements: {
            '>Select Withdrawal Method<': ['headerTitle', 'Select Withdrawal Method'],
            '>Withdrawals to UPI are typically instant. Bank transfers may take 1-3 business days.<': ['infoText', 'Withdrawals to UPI are typically instant. Bank transfers may take 1-3 business days.'],
            '>SAVED METHODS<': ['sectionTitle', 'SAVED METHODS'],
            '>No saved withdrawal methods.<': ['emptyText', 'No saved withdrawal methods.'],
            '>Verified<': ['verifiedBadge', 'Verified'],
            '>Add Bank Account<': ['addBank', 'Add Bank Account'],
            '>Add UPI ID<': ['addUpi', 'Add UPI ID'],
            '>Add UPI ID for Payouts<': ['modalTitle', 'Add UPI ID for Payouts'],
            '>Enter your UPI ID<': ['modalLabel', 'Enter your UPI ID'],
            '>Verify & Save<': ['modalVerify', 'Verify & Save']
        }
    },
    {
        file: 'src/screens/wallet/WithdrawMoneyScreen.tsx',
        ns: 'wallet.withdrawMoney',
        json: 'src/i18n/locales/en/wallet/withdrawMoney.json',
        replacements: {
            '>Withdraw Money<': ['headerTitle', 'Withdraw Money'],
            '>WITHDRAWABLE BALANCE<': ['balanceLabel', 'WITHDRAWABLE BALANCE'],
            '>Withdraw Max (₹{MAX_WITHDRAWABLE})<': ['maxBtn', 'Withdraw Max (₹{{max}})', ">{t('maxBtn', 'Withdraw Max (₹{{max}})', { max: MAX_WITHDRAWABLE })}<"],
            '>Minimum withdrawal is ₹100. No processing fees apply.<': ['helperText', 'Minimum withdrawal is ₹100. No processing fees apply.'],
            '>TRANSFER TO<': ['sectionTitle', 'TRANSFER TO'],
            '>Change<': ['btnChange', 'Change'],
            '>Processing Time<': ['infoTitle', 'Processing Time'],
            ">'UPI transfers are usually instant, but can take up to 2 hours.'<": ['infoSubUpi', "UPI transfers are usually instant, but can take up to 2 hours.", "t('infoSubUpi', 'UPI transfers are usually instant, but can take up to 2 hours.')"],
            ">'Standard IMPS/NEFT transfer takes up to 2-3 business days.'<": ['infoSubBank', "Standard IMPS/NEFT transfer takes up to 2-3 business days.", "t('infoSubBank', 'Standard IMPS/NEFT transfer takes up to 2-3 business days.')"],
            '>Withdraw ₹{amount || \'0\'}<': ['proceedToPay', 'Withdraw ₹{{amount}}', ">{t('proceedToPay', 'Withdraw ₹{{amount}}', { amount: amount || '0' })}<"]
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json));
