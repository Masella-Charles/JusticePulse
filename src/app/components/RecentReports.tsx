import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './RecentReports.module.scss'

interface Report {
  category: string;
  location: string;
  description: string;
  imagePreview: string | null;
  timestamp: string;
}

export default function RecentReports({ currentLanguage }: { currentLanguage: string }) {
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem('civicEngagementReports') || '[]')
    setReports(storedReports)
  }, [])

  return (
    <section className={styles.recentReports}>
      <h2 className={styles.sectionTitle}>
        {currentLanguage === 'en' ? 'Recent Reports' : 'Ripoti za Hivi Karibuni'}
      </h2>
      {reports.length === 0 ? (
        <p className={styles.noReports}>
          {currentLanguage === 'en' ? 'No reports submitted yet.' : 'Hakuna ripoti zilizowasilishwa bado.'}
        </p>
      ) : (
        <div className={styles.reportGrid}>
          {reports.map((report, index) => (
            <div key={index} className={styles.reportCard}>
              {report.imagePreview && (
                <div className={styles.reportImage}>
                  <Image src={report.imagePreview} alt="Report image" width={200} height={150} />
                </div>
              )}
              <div className={styles.reportContent}>
                <h3 className={styles.reportCategory}>{report.category}</h3>
                <p className={styles.reportLocation}>{report.location}</p>
                <p className={styles.reportDescription}>{report.description}</p>
                <p className={styles.reportTimestamp}>
                  {new Date(report.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}