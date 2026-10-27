import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        sites: "Heritage Sites",
        map: "Explore Map",
        events: "Cultural Events",
        timeline: "Timeline",
        stories: "Oral Histories",
        gallery: "Gallery",
        contribute: "Contribute",
        about: "About",
        admin: "Admin",
        searchPlaceholder: "Search forts, temples, festivals... (Ctrl+K)",
        bookmarks: "Saved Sites"
      },
      hero: {
        title: "Preserving the Living Soul of Our Heritage",
        subtitle: "A digital sanctuary documenting centuries of monumental architecture, sacred traditions, oral folklore, and living memories.",
        searchBtn: "Explore Heritage",
        browseSites: "Browse 12+ Sites",
        viewMap: "Interactive Map"
      },
      stats: {
        sites: "Sites Documented",
        events: "Living Festivals",
        stories: "Oral Histories",
        contributors: "Guardians & Scholars"
      },
      common: {
        readMore: "Read Narrative",
        viewDetails: "View Site Details",
        directions: "Get Directions",
        addToCalendar: "Add to Calendar",
        category: "Category",
        era: "Historical Era",
        district: "District",
        status: "Conservation Status",
        bookmark: "Save to Bookmarks",
        bookmarked: "Saved",
        share: "Share",
        back: "Back",
        loading: "Unveiling archives...",
        all: "All"
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: "मुखपृष्ठ",
        sites: "धरोहर स्थल",
        map: "मानचित्र",
        events: "सांस्कृतिक उत्सव",
        timeline: "कालक्रम",
        stories: "मौखिक इतिहास",
        gallery: "चित्र दीर्घा",
        contribute: "योगदान दें",
        about: "परिचय",
        admin: "प्रशासक",
        searchPlaceholder: "किले, मंदिर, उत्सव खोजें... (Ctrl+K)",
        bookmarks: "सहेजे गए स्थल"
      },
      hero: {
        title: "हमारी जीवंत विरासत का डिजिटल संरक्षण",
        subtitle: "शताब्दियों पुरानी वास्तुकला, पवित्र परंपराओं, लोककथाओं और स्मृतियों को संजोने वाला एक अद्वितीय सांस्कृतिक मंच।",
        searchBtn: "विरासत देखें",
        browseSites: "स्थल सूची",
        viewMap: "मानचित्र देखें"
      },
      stats: {
        sites: "अभिलेखित स्थल",
        events: "सांस्कृतिक उत्सव",
        stories: "मौखिक इतिहास",
        contributors: "संरक्षक और शोधकर्ता"
      },
      common: {
        readMore: "विस्तार से पढ़ें",
        viewDetails: "स्थल का विवरण",
        directions: "दिशा-निर्देश",
        addToCalendar: "कैलेंडर में जोड़ें",
        category: "श्रेणी",
        era: "ऐतिहासिक काल",
        district: "जिला",
        status: "संरक्षण स्थिति",
        bookmark: "सहेजें",
        bookmarked: "सहेजा गया",
        share: "साझा करें",
        back: "वापस",
        loading: "अभिलेख लोड हो रहे हैं...",
        all: "सभी"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('itihasa_lang') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
