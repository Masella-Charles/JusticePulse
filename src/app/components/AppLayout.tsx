'use client';

import React, { useState } from 'react';
import { Home, FileText, BarChart2, Heart, Users, Bell } from 'lucide-react';
import TransparencyTracker from './TransparencyTracker';
import InteractiveGovernance from './InteractiveGovernance';
import { CivicEngagement } from './civic-engagement';
import HumanRights from './HumanRights';
import styles from './AppLayout.module.scss';

export default function AppLayout() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('home');

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'sw' : 'en');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'transparency':
        return <TransparencyTracker />;
      case 'map':
        return <InteractiveGovernance />;
      case 'rights':
        return <HumanRights />;
      case 'civic':
        return <CivicEngagement />;
      default:
        return (
          <main className={styles.appContainer}>
            <div className={styles.searchBar}>
              {/* <input
                type="text"
                placeholder={currentLanguage === 'en' ? 'Search JusticePulse' : 'Tafuta JusticePulse'}
                className={styles.searchInput}
              />
              <Search className={styles.searchIcon} /> */}
            </div>

            <div className={styles.actionButtons}>
              {[
                { text: 'Report Issue', icon: FileText, color: styles.reportIssue, action: () => setActiveSection('civic') },
                { text: 'Sign Petition', icon: Users, color: styles.signPetition, action: () => setActiveSection('civic') },
                { text: 'View Projects', icon: BarChart2, color: styles.viewProjects, action: () => setActiveSection('transparency') },
                { text: 'Find Legal Aid', icon: Heart, color: styles.findLegalAid, action: () => setActiveSection('rights') },
              ].map(({ text, icon: Icon, color, action }, index) => (
                <button
                  key={index}
                  className={`${styles.actionButton} ${color}`}
                  onClick={action}
                >
                  <Icon className="h-6 w-6" />
                  <span>{currentLanguage === 'en' ? text : `${text} (SW)`}</span>
                </button>
              ))}
            </div>

            {/* Replacing the commented section with the image */}
            <div className={styles.imageContainer}>
              <img
                src="https://eaclj.com/images/Article_Images/Importance-of-Public-Participation.jpg"
                alt="Recent Activity"
                className={styles.activityImage}
              />
            </div>

          </main>
        );
    }
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.appTitle}>
          <img
            src='https://img.freepik.com/free-vector/realistic-jamhuri-day_23-2148721687.jpg?t=st=1727269614~exp=1727273214~hmac=27d9ba45882867384879f5841f5d00a1515834d31c22cc01c7591c3d520e7b88&w=68'
            alt="Logo"
            className={`${styles.imgRounded} ${styles.imgPositioned}`}
          />
          <span className={styles.appTitleText}>JusticePulse</span>
        </div>
      </header>

      {renderActiveSection()}

      <nav className={styles.navBar}>
        {[
          { icon: Home, label: 'Home', section: 'home' },
          { icon: BarChart2, label: 'Transparency', section: 'transparency' },
          { icon: Heart, label: 'Rights', section: 'rights' },
          { icon: Bell, label: 'Incidents Map', section: 'map' },
        ].map(({ icon: Icon, label, section }) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`${styles.navItem} ${activeSection === section ? styles.active : ''}`}
          >
            <Icon className={styles.navIcon} />
            <span>{currentLanguage === 'en' ? label : `${label} (SW)`}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

// const client = new Client();

// client
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('67011f29003d00dfef5c');
