import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'en': {
        welcomeMsg: 'Fasttrack user onboarding on AA',
        subHeading: 'Verified Agent Portal',
        email: 'email',
        password: 'password',
        login: 'login',
        dashboardHeader: 'Consent Applicant List',
        phoneNo: 'Phone Number',
        status: 'Applied',
        btnText: 'Create',
        registerText: "Doesn't have an account. Click here to register",
        createApplicantBtn: 'Add Applicant'
    },
    'hi': {
        welcomeMsg: 'AA पर उपयोगकर्ता ऑनबोर्डिन!',
        subHeading: 'सत्यापित एजेंट पोर्टल',
        email: 'ईमेल',
        password: 'कुंजिका',
        login: 'लॉग इन करें',
        dashboardHeader: 'सहमति आवेदक सूची',
        phoneNo: 'फ़ोन नंबर',
        status: 'लागू',
        btnText: 'बनाएं',
        registerText: 'खाता नहीं है पंजीकरण करने के लिए यहां क्लिक करें',
        createApplicantBtn: 'आवेदक जोड़ें'
    }
};

export const i18n = new VueI18n({
    locale: 'hi', // set locale    
    fallbackLocale: 'en', // set fallback locale    
    messages, // set locale messages
});

