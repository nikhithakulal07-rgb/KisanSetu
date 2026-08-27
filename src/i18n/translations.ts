export type Language = 'en' | 'hi' | 'kn';

export interface Translations {
  appName: string;
  tagline: string;
  roleFarmer: string;
  roleOperator: string;
  roleAdmin: string;
  waitAtHome: string;
  startTravelling: string;
  yourTurnApproaching: string;
  arrivedAtCentre: string;
  weighingInProgress: string;
  qualityAssessment: string;
  procurementAccepted: string;
  billGenerated: string;
  paymentProcessing: string;
  paymentCredited: string;
  tokenNumber: string;
  farmersAhead: string;
  estimatedWait: string;
  arrivalWindow: string;
  recommendedAction: string;
  recommendedForYou: string;
  centreDelayWarning: string;
  doNotTravelYet: string;
  liveQueue: string;
  procurementStatus: string;
  paymentsTitle: string;
  notificationsTitle: string;
  bookSlot: string;
  findCentres: string;
  switchRole: string;
  language: string;
  simulationActive: string;
  confidenceHigh: string;
  confidenceMedium: string;
  viewDetails: string;
  confirmBooking: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'KisanSetu',
    tagline: 'Predictive Procurement & Smart Queue Management',
    roleFarmer: 'Farmer',
    roleOperator: 'Procurement Operator',
    roleAdmin: 'District Administrator',
    waitAtHome: 'WAIT AT HOME',
    startTravelling: 'START TRAVELLING',
    yourTurnApproaching: 'YOUR TURN IS APPROACHING',
    arrivedAtCentre: 'ARRIVED AT CENTRE',
    weighingInProgress: 'WEIGHING IN PROGRESS',
    qualityAssessment: 'QUALITY ASSESSMENT',
    procurementAccepted: 'PROCUREMENT ACCEPTED',
    billGenerated: 'BILL GENERATED',
    paymentProcessing: 'PAYMENT PROCESSING',
    paymentCredited: 'PAYMENT CREDITED',
    tokenNumber: 'Token Number',
    farmersAhead: 'Farmers Ahead',
    estimatedWait: 'Estimated Wait',
    arrivalWindow: 'Dynamic Arrival Window',
    recommendedAction: 'Recommended Action',
    recommendedForYou: 'Recommended for you',
    centreDelayWarning: 'is experiencing a delay',
    doNotTravelYet: 'Please do not travel yet. Your arrival window has been adjusted.',
    liveQueue: 'Live Virtual Queue',
    procurementStatus: 'Procurement Progress',
    paymentsTitle: 'Payment & DBT Tracking',
    notificationsTitle: 'Alerts & Notifications',
    bookSlot: 'Select Arrival Window',
    findCentres: 'Discover Procurement Centres',
    switchRole: 'Switch Role (SIH Demo)',
    language: 'Language',
    simulationActive: 'Live Simulation Mode Active',
    confidenceHigh: 'High Confidence',
    confidenceMedium: 'Moderate Confidence',
    viewDetails: 'View Details',
    confirmBooking: 'Confirm Arrival Window',
  },
  hi: {
    appName: 'किसानसेतु (KisanSetu)',
    tagline: 'सटीक उपार्जन एवं स्मार्ट कतार प्रबंधन प्रणाली',
    roleFarmer: 'किसान',
    roleOperator: 'उपार्जन केंद्र ऑपरेटर',
    roleAdmin: 'जिला प्रशासक',
    waitAtHome: 'घर पर प्रतीक्षा करें (WAIT AT HOME)',
    startTravelling: 'यात्रा शुरू करें (START TRAVELLING)',
    yourTurnApproaching: 'आपकी बारी निकट है',
    arrivedAtCentre: 'केंद्र पर आगमन दर्ज',
    weighingInProgress: 'तौल प्रगति पर है',
    qualityAssessment: 'गुणवत्ता परीक्षण',
    procurementAccepted: 'उपार्जन स्वीकृत',
    billGenerated: 'डिजिटल रसीद/बिल जारी',
    paymentProcessing: 'भुगतान प्रक्रियाधीन',
    paymentCredited: 'खाते में राशि जमा (सफल)',
    tokenNumber: 'टोकन संख्या',
    farmersAhead: 'आगे कतार में किसान',
    estimatedWait: 'अनुमानित प्रतीक्षा समय',
    arrivalWindow: 'आगमन समय खिड़की',
    recommendedAction: 'सुझाई गई कार्यवाही',
    recommendedForYou: 'आपके लिए अनुशंसित केंद्र',
    centreDelayWarning: 'में देरी हो रही है',
    doNotTravelYet: 'कृपया अभी घर से न निकलें। आपका आगमन समय बदल दिया गया है।',
    liveQueue: 'लाइव वर्चुअल कतार',
    procurementStatus: 'उपार्जन स्थिति',
    paymentsTitle: 'भुगतान एवं डीबीटी ट्रैकिंग',
    notificationsTitle: 'सूचनाएं एवं अलर्ट',
    bookSlot: 'आगमन स्लॉट चुनें',
    findCentres: 'उपार्जन केंद्र खोजें',
    switchRole: 'भूमिका बदलें (डेमो)',
    language: 'भाषा',
    simulationActive: 'सिमुलेशन मोड सक्रिय',
    confidenceHigh: 'उच्च सटीकता',
    confidenceMedium: 'मध्यम सटीकता',
    viewDetails: 'विवरण देखें',
    confirmBooking: 'स्लॉट पुष्टि करें',
  },
  kn: {
    appName: 'ಕಿಸಾನ್‌ಸೇತು (KisanSetu)',
    tagline: 'ಮುನ್ಸೂಚನಾ ಖರೀದಿ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಕ್ಯೂ ನಿರ್ವಹಣೆ',
    roleFarmer: 'ರೈತ',
    roleOperator: 'ಖರೀದಿ ಕೇಂದ್ರ ಆಪರೇಟರ್',
    roleAdmin: 'ಜಿಲ್ಲಾ ಆಡಳಿತಾಧಿಕಾರಿ',
    waitAtHome: 'ಮನೆಯಲ್ಲಿ ಕಾಯಿರಿ (WAIT AT HOME)',
    startTravelling: 'ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ (START TRAVELLING)',
    yourTurnApproaching: 'ನಿಮ್ಮ ಸರದಿ ಹತ್ತಿರವಾಗುತ್ತಿದೆ',
    arrivedAtCentre: 'ಕೇಂದ್ರಕ್ಕೆ ಆಗಮಿಸಲಾಗಿದೆ',
    weighingInProgress: 'ತೂಕ ಪರಿಶೀಲನೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    qualityAssessment: 'ಗುಣಮಟ್ಟ ತಪಾಸಣೆ',
    procurementAccepted: 'ಖರೀದಿ ಅನುಮೋದಿಸಲಾಗಿದೆ',
    billGenerated: 'ರಸೀದಿ ಸೃಷ್ಟಿಯಾಗಿದೆ',
    paymentProcessing: 'ಪಾವತಿ ಪ್ರಕ್ರಿಯೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    paymentCredited: 'ಖಾತೆಗೆ ಹಣ ಜಮೆಯಾಗಿದೆ',
    tokenNumber: 'ಟೋಕನ್ ಸಂಖ್ಯೆ',
    farmersAhead: 'ಮುಂದಿರುವ ರೈತರು',
    estimatedWait: 'ಅಂದಾಜು ಕಾಯುವ ಸಮಯ',
    arrivalWindow: 'ಆಗಮನ ಸಮಯ ವಿಂಡೋ',
    recommendedAction: 'ಸೂಚಿಸಲಾದ ಕ್ರಮ',
    recommendedForYou: 'ನಿಮಗಾಗಿ ಶಿಫಾರಸು ಮಾಡಲಾದ ಕೇಂದ್ರ',
    centreDelayWarning: 'ಕೇಂದ್ರದಲ್ಲಿ ವಿಳಂಬ ಉಂಟಾಗಿದೆ',
    doNotTravelYet: 'ದಯವಿಟ್ಟು ಇನ್ನೂ ಪ್ರಯಾಣಿಸಬೇಡಿ. ನಿಮ್ಮ ಆಗಮನ ಸಮಯವನ್ನು ನವೀಕರಿಸಲಾಗಿದೆ.',
    liveQueue: 'ಲೈವ್ ವರ್ಚುವಲ್ ಕ್ಯೂ',
    procurementStatus: 'ಖರೀದಿ ಪ್ರಗತಿ',
    paymentsTitle: 'ಪಾವತಿ ಮತ್ತು ಡಿಬಿಟಿ ಟ್ರ್ಯಾಕಿಂಗ್',
    notificationsTitle: 'ಸೂಚನೆಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳು',
    bookSlot: 'ಆಗಮನ ಸಮಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    findCentres: 'ಖರೀದಿ ಕೇಂದ್ರಗಳನ್ನು ಹುಡುಕಿ',
    switchRole: 'ಪಾತ್ರವನ್ನು ಬದಲಾಯಿಸಿ (ಡೆಮೊ)',
    language: 'ಭಾಷೆ',
    simulationActive: 'ಸಿಮ್ಯುಲೇಶನ್ ಮೋಡ್ ಸಕ್ರಿಯ',
    confidenceHigh: 'ಹೆಚ್ಚಿನ ನಿಖರತೆ',
    confidenceMedium: 'ಮಧ್ಯಮ ನಿಖರತೆ',
    viewDetails: 'ವಿವರಗಳನ್ನು ನೋಡಿ',
    confirmBooking: 'ಬುಕಿಂಗ್ ದೃಢೀಕರಿಸಿ',
  },
};
