'use client';

import React, { useState } from 'react'
import { ArrowLeft, MapPin, AlertTriangle } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import styles from './InteractiveGovernance.module.scss'

// Fix for default marker icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
})

export default function InteractiveGovernance() {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [activeLayer, setActiveLayer] = useState('services')

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'sw' : 'en')
  }

  const servicePoints = [
    // Government Institutions
    { name: 'Parliament of Kenya', lat: -1.2920, lon: 36.8230, type: 'Government' },
    { name: 'The Treasury Building', lat: -1.2884, lon: 36.8238, type: 'Government' },
    { name: 'Central Bank of Kenya', lat: -1.2871, lon: 36.8245, type: 'Government' },
    { name: 'Office of the President', lat: -1.2924, lon: 36.8226, type: 'Government' },
    { name: 'Kenya Revenue Authority', lat: -1.2897, lon: 36.8251, type: 'Government' },
    { name: 'Mombasa County Government Offices', lat: -4.0444, lon: 39.6682, type: 'Government' },
    { name: 'Kisumu County Government Offices', lat: -0.1022, lon: 34.7617, type: 'Government' },
  
    // Healthcare Institutions
    { name: 'Moi Teaching and Referral Hospital', lat: 0.5156, lon: 35.2717, type: 'Healthcare' },
    { name: 'Aga Khan University Hospital', lat: -1.2629, lon: 36.8024, type: 'Healthcare' },
    { name: 'Nairobi Women\'s Hospital', lat: -1.2904, lon: 36.8303, type: 'Healthcare' },
    { name: 'Karen Hospital', lat: -1.3214, lon: 36.7175, type: 'Healthcare' },
    { name: 'Mombasa Coast General Teaching and Referral Hospital', lat: -4.0581, lon: 39.6727, type: 'Healthcare' },
    { name: 'Kisii Teaching and Referral Hospital', lat: -0.6795, lon: 34.7687, type: 'Healthcare' },
  
    // Educational Institutions
    { name: 'University of Nairobi', lat: -1.2809, lon: 36.8172, type: 'Education' },
    { name: 'Kenyatta University', lat: -1.1773, lon: 36.9282, type: 'Education' },
    { name: 'Strathmore University', lat: -1.3092, lon: 36.8123, type: 'Education' },
    { name: 'Moi University', lat: 0.2827, lon: 35.2836, type: 'Education' },
    { name: 'Egerton University', lat: -0.3834, lon: 35.9375, type: 'Education' },
    { name: 'Pwani University', lat: -3.9360, lon: 39.7455, type: 'Education' },
  
    // Infrastructure and Transportation
    { name: 'Jomo Kenyatta International Airport', lat: -1.3192, lon: 36.9277, type: 'Infrastructure' },
    { name: 'Mombasa Port', lat: -4.0658, lon: 39.6604, type: 'Infrastructure' },
    { name: 'Nairobi Railway Station', lat: -1.2911, lon: 36.8320, type: 'Infrastructure' },
    { name: 'Kisumu International Airport', lat: -0.0861, lon: 34.7289, type: 'Infrastructure' },
    { name: 'Eldoret International Airport', lat: 0.4041, lon: 35.2383, type: 'Infrastructure' },
  
    // Human Rights Organizations
    { name: 'Amnesty International Kenya', lat: -1.2923, lon: 36.8126, type: 'Human Rights' },
    { name: 'The Legal Resources Foundation', lat: -1.2940, lon: 36.8235, type: 'Human Rights' },
    { name: 'Federation of Women Lawyers (FIDA Kenya)', lat: -1.2832, lon: 36.8167, type: 'Human Rights' },
  
    // Financial Institutions
    { name: 'Kenya Commercial Bank Headquarters', lat: -1.2866, lon: 36.8248, type: 'Financial' },
    { name: 'Equity Bank Kenya', lat: -1.2876, lon: 36.8262, type: 'Financial' },
    { name: 'Co-operative Bank of Kenya', lat: -1.2885, lon: 36.8231, type: 'Financial' },
    { name: 'Absa Bank Kenya', lat: -1.2882, lon: 36.8221, type: 'Financial' },
  
    // Retaining original service points
    { name: 'Nairobi City Hall', lat: -1.2921, lon: 36.8219, type: 'Government' },
    { name: 'Kenyatta National Hospital', lat: -1.3031, lon: 36.8072, type: 'Healthcare' },
    { name: 'Supreme Court of Kenya', lat: -1.2867, lon: 36.8185, type: 'Legal' },
    { name: 'Kenya National Commission on Human Rights', lat: -1.2935, lon: 36.7857, type: 'Human Rights' }
  ];
  
  const incidentReports = [
    // Nairobi
    { name: 'Nairobi City Hall (NYS)', lat: -1.2921, lon: 36.8219, severity: 'high' },
    { name: 'KICC (Goldenberg)', lat: -1.2921, lon: 36.8219, severity: 'high' },
    { name: 'Nairobi West (Potholes)', lat: -1.3081, lon: 36.8225, severity: 'low' },
    { name: 'Kenyatta National Hospital (Baby Theft)', lat: -1.3031, lon: 36.8072, severity: 'high' },
    { name: 'Westgate Mall (Terror Attack)', lat: -1.2654, lon: 36.8040, severity: 'high' },
    { name: 'Lang\'ata Primary School (Land Grabbing)', lat: -1.3438, lon: 36.7479, severity: 'medium' },
    { name: 'DusitD2 Hotel (Terror Attack)', lat: -1.2631, lon: 36.8021, severity: 'high' },
    { name: 'Recent Crime Surge (Nairobi Crime Reports)', lat: -1.2921, lon: 36.8219, severity: 'high' }, // Newly added
  
    // Mombasa
    { name: 'Mombasa CBD (Ferry Issues)', lat: -4.0547, lon: 39.6636, severity: 'medium' },
    { name: 'Nyali Bridge (Corruption Allegations)', lat: -4.0287, lon: 39.7263, severity: 'high' },
    { name: 'Port of Mombasa (Customs Issues)', lat: -4.0719, lon: 39.6730, severity: 'high' },
    { name: 'Likoni Ferry (Accidents & Safety)', lat: -4.0621, lon: 39.6607, severity: 'medium' }, // Newly added
    
    // Kisumu
    { name: 'Kisumu CBD (Post-Election Violence 2007)', lat: -0.0917, lon: 34.7680, severity: 'high' },
    { name: 'Kisumu Dunga Beach (Flooding)', lat: -0.0726, lon: 34.7215, severity: 'medium' },
    { name: 'Nyanza Region (Crime and Election Violence)', lat: -0.0917, lon: 34.7680, severity: 'medium' }, // Newly added
  
    // Eldoret
    { name: 'Eldoret Town (Potholes)', lat: 0.5143, lon: 35.2698, severity: 'low' },
    { name: 'Moi University (Election Irregularities)', lat: 0.3085, lon: 35.2911, severity: 'medium' },
  
    // Nakuru
    { name: 'Nakuru CBD (Collapsed Building)', lat: -0.2833, lon: 36.0693, severity: 'high' },
    { name: 'Lake Nakuru National Park (Environmental Complaints)', lat: -0.3636, lon: 36.1049, severity: 'medium' },
    { name: 'Solai Dam (Dam Burst)', lat: -0.2833, lon: 36.0693, severity: 'high' },
  
    // Garissa
    { name: 'Garissa Town (Alleged Mismanagement)', lat: -0.4532, lon: 39.6464, severity: 'medium' },
    { name: 'Garissa University (Terror Attack Response)', lat: -0.4592, lon: 39.6469, severity: 'high' },
  
    // Turkana
    { name: 'Lodwar Town (Corruption)', lat: 3.1193, lon: 35.5973, severity: 'medium' },
    { name: 'Turkana Wind Farm (Community Complaints)', lat: 2.3633, lon: 36.1187, severity: 'medium' },
    { name: 'Lokichar Town (Oil Protests)', lat: 2.7735, lon: 35.5967, severity: 'medium' },
  
    // Machakos
    { name: 'Machakos Town (Water Shortages)', lat: -1.5177, lon: 37.2634, severity: 'medium' },
    { name: 'Masinga Dam (Infrastructure Issues)', lat: -0.9276, lon: 37.5375, severity: 'medium' },
  
    // Meru
    { name: 'Meru Town (Land Grabbing)', lat: 0.0463, lon: 37.6558, severity: 'medium' },
    { name: 'Mount Kenya National Park (Environmental Issues)', lat: 0.1503, lon: 37.3088, severity: 'low' },
  
    // Narok
    { name: 'Narok Town (Flooding)', lat: -1.0922, lon: 35.8669, severity: 'high' },
    { name: 'Maasai Mara National Reserve (Wildlife Poaching)', lat: -1.4067, lon: 35.1046, severity: 'medium' },
  
    // Kakamega
    { name: 'Kakamega Forest (Deforestation)', lat: 0.2835, lon: 34.7717, severity: 'medium' },
    { name: 'Kakamega Town (Public Funds Misuse)', lat: 0.2833, lon: 34.7519, severity: 'medium' },
  
    // Kiambu
    { name: 'Kiambu Town (Corruption)', lat: -1.1714, lon: 36.8354, severity: 'high' },
    { name: 'Kiambu Region (Crime Reports)', lat: -1.1714, lon: 36.8354, severity: 'high' }, // Newly added
  
    // Thika
    { name: 'Thika Town (Building Collapse)', lat: -1.0322, lon: 37.0693, severity: 'high' },
    { name: 'Thika Superhighway (Road Safety Issues)', lat: -1.1658, lon: 36.9708, severity: 'low' },
  
    // Marsabit
    { name: 'Marsabit Town (Ethnic Clashes)', lat: 2.3333, lon: 37.9833, severity: 'high' },
  
    // Mandera
    { name: 'Mandera Town (Terror Attacks)', lat: 3.9400, lon: 41.8600, severity: 'high' },
  
    // Nandi
    { name: 'Nandi Hills (Post-Election Violence)', lat: 0.1083, lon: 35.1811, severity: 'high' },
  
    // Murang'a
    { name: 'Murang\'a Town (Water Crisis)', lat: -0.7837, lon: 37.0387, severity: 'medium' },
  ];
  


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <button className={styles.backButton} aria-label="Go back" onClick={() => window.location.href = '/'}>
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold font-ubuntu">
            {currentLanguage === 'en' ? 'Governance Map' : 'Ramani ya Utawala'}
          </h1>
        </div>
        <button
          onClick={toggleLanguage}
          className={styles.languageToggle}
        >
          {currentLanguage === 'en' ? 'SW' : 'EN'}
        </button>
      </header>

      <div className={styles.tabContainer}>
        <button
          className={`${styles.tab} ${activeLayer === 'services' ? styles.active : ''}`}
          onClick={() => setActiveLayer('services')}
        >
          <MapPin className="w-5 h-5" />
          {currentLanguage === 'en' ? 'Service Points' : 'Vituo vya Huduma'}
        </button>
        <button
          className={`${styles.tab} ${activeLayer === 'incidents' ? styles.active : ''}`}
          onClick={() => setActiveLayer('incidents')}
        >
          <AlertTriangle className="w-5 h-5" />
          {currentLanguage === 'en' ? 'Incident Reports' : 'Ripoti za Matukio'}
        </button>
      </div>

      <main className={styles.mapContainer}>
        <MapContainer center={[-1.2921, 36.8219]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {activeLayer === 'services' && servicePoints.map((point, index) => (
            <Marker key={index} position={[point.lat, point.lon]}>
              <Popup>
                <strong>{point.name}</strong><br />
                {currentLanguage === 'en' ? 'Type' : 'Aina'}: {point.type}
              </Popup>
            </Marker>
          ))}
          {activeLayer === 'incidents' && incidentReports.map((report, index) => (
            <Circle
              key={index}
              center={[report.lat, report.lon]}
              radius={500}
              pathOptions={{
                color: report.severity === 'high' ? 'red' : report.severity === 'medium' ? 'orange' : 'yellow',
                fillColor: report.severity === 'high' ? 'red' : report.severity === 'medium' ? 'orange' : 'yellow',
                fillOpacity: 0.5
              }}
            >
              <Popup>
                <strong>{report.name}</strong><br />
                {currentLanguage === 'en' ? 'Severity' : 'Ukali'}: {report.severity}
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </main>
    </div>
  )
}