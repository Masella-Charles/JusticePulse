'use client';

import React, { useState } from 'react'
import { ArrowLeft, BarChart2, PieChart, Info } from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import styles from './TransparencyTracker.module.scss'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

export default function TransparencyTracker() {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [activeTab, setActiveTab] = useState('spending')

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'sw' : 'en')
  }

  const spendingData = {
    labels: ['Education', 'Healthcare', 'Infrastructure', 'Agriculture', 'Security', 'Public Debt', 'Social Protection', 'Environment'],
    datasets: [
      {
        data: [15.5, 10.5, 20.0, 9.0, 5.0, 25.0, 10.0, 5.0], // Adjusted values based on projected allocations
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#4B0082', '#00BFFF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#4B0082', '#00BFFF']
      }
    ]
  }

  const projectProgressData = {
    labels: ['Road Construction', 'School Building', 'Water Supply', 'Electrification', 'Healthcare Facility', 'Fertilizer Subsidy'],
    datasets: [
      {
        label: 'Completion Percentage',
        data: [80, 70, 65, 50, 90, 75], // Adjusted values based on project progress
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      }
    ]
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <button className={styles.backButton} aria-label="Go back" onClick={() => window.location.href = '/'}>
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold font-ubuntu">
            {currentLanguage === 'en' ? 'Transparency Tracker' : 'Kifuatiliaji cha Uwazi'}
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
          className={`${styles.tab} ${activeTab === 'spending' ? styles.active : ''}`}
          onClick={() => setActiveTab('spending')}
        >
          <div className="flex items-center justify-center relative">
        <PieChart className="w-5 h-5 mr-2 absolute left-0" />
        {currentLanguage === 'en' ? 'Public Spending' : 'Matumizi ya Umma'}
          </div>
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'projects' ? styles.active : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <div className="flex items-center justify-center relative">
        <BarChart2 className="w-5 h-5 mr-2 absolute left-0" />
        {currentLanguage === 'en' ? 'Project Progress' : 'Maendeleo ya Miradi'}
          </div>
        </button>
      </div>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <h2 className={styles.sectionTitle}>
              {activeTab === 'spending' 
                ? (currentLanguage === 'en' ? 'Public Spending Monitor' : 'Kifuatiliaji cha Matumizi ya Umma')
                : (currentLanguage === 'en' ? 'Project Progress Tracker' : 'Kifuatiliaji cha Maendeleo ya Miradi')
              }
            </h2>
            <div className={styles.chartContainer}>
              {activeTab === 'spending' ? (
                <Pie 
                  data={spendingData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((Number(value) / Number(total)) * 100).toFixed(2);
                            return `${label}: ${percentage}% (${value}B KSh)`;
                          }
                        }
                      }
                    }
                  }}
                />
              ) : (
                <Bar
                  data={projectProgressData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: currentLanguage === 'en' ? 'Completion Percentage' : 'Asilimia ya Ukamilishaji'
                        }
                      }
                    }
                  }}
                />
              )}
            </div>
            <div className={styles.infoSection}>
              <div className={styles.infoHeader}>
                <h3 className={styles.totalInfo}>
                  {activeTab === 'spending'
                    ? (currentLanguage === 'en' ? 'Total Budget' : 'Bajeti Jumla')
                    : (currentLanguage === 'en' ? 'Total Projects' : 'Jumla ya Miradi')
                  }:
                  {activeTab === 'spending' ? ' KSh 3,599,300,000,000' : ' 6'}
                </h3>
                <div className={styles.lastUpdated}>
                  <Info className="w-4 h-4 mr-1" />
                  {currentLanguage === 'en'
                    ? 'Last updated: October 3, 2024'
                    : 'Imesasishwa mwisho: Oktoba 3, 2024'}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.insights}>
  <h4 className={styles.insightsTitle}>
    {currentLanguage === 'en' ? 'Key Insights' : 'Maoni Muhimu'}:
  </h4>
  <ul className={styles.insightsList}>
    <li>{currentLanguage === 'en' ? 'Government spending in Kenya increased to KES 1,404,662 million in 2023, up from KES 1,357,481 million in 2022.' : 'Matumizi ya serikali nchini Kenya yameongezeka hadi KES 1,404,662 milioni mwaka wa 2023, kutoka KES 1,357,481 milioni mwaka wa 2022.'}</li>
    <li>{currentLanguage === 'en' ? 'The average government spending from 1964 to 2023 was KES 286,235.79 million, with a record low of KES 998 million in 1964.' : 'Kiwango cha wastani cha matumizi ya serikali kuanzia mwaka wa 1964 hadi 2023 kilikuwa KES 286,235.79 milioni, huku kiwango cha chini kabisa kikiwa KES 998 milioni mwaka wa 1964.'}</li>
    <li>{currentLanguage === 'en' ? 'In FY 2023/24, total expenditure is projected to increase by 8.7% to KES 3.7 trillion from KES 3.4 trillion in FY 2022/23.' : 'Katika mwaka wa fedha wa 2023/24, matumizi ya jumla yanatarajiwa kuongezeka kwa asilimia 8.7 hadi KES trilioni 3.7 kutoka KES trilioni 3.4 katika mwaka wa fedha wa 2022/23.'}</li>
    <li>{currentLanguage === 'en' ? 'Kenya’s government spending is among the highest in East Africa, reflecting its ambitious development agenda and commitment to public service delivery.' : 'Matumizi ya serikali nchini Kenya ni kati ya juu zaidi katika Afrika Mashariki, ikionyesha mpango wake wa maendeleo wenye malengo makubwa na kujitolea kwa huduma za umma.'}</li>
    <li>{currentLanguage === 'en' ? 'In comparison to Tanzania and Uganda, Kenya’s total expenditure remains higher, showcasing its larger economic scale and investment capacity.' : 'Ikilinganishwa na Tanzania na Uganda, matumizi ya jumla ya Kenya yanabaki kuwa juu zaidi, ikionyesha ukubwa wake wa kiuchumi na uwezo wa uwekezaji.'}</li>
    <li>{currentLanguage === 'en' ? 'Key sectors targeted for growth include agriculture, healthcare, and infrastructure as part of the Bottom-Up Economic Transformation Agenda (BETA).' : 'Sekta muhimu zinazolengwa kwa ukuaji ni kilimo, afya, na miundombinu kama sehemu ya Mpango wa Mabadiliko ya Uchumi wa Chini (BETA).'} </li>
    <li>{currentLanguage === 'en' ? 'The fiscal deficit for FY 2023/24 is projected at KES 663.5 billion (4.1% of GDP), financed through both external and domestic borrowing.' : 'Upungufu wa bajeti kwa mwaka wa fedha wa 2023/24 unatarajiwa kuwa KES bilioni 663.5 (asilimia 4.1 ya Pato la Taifa), ukifadhiliwa kupitia mkopo wa ndani na nje.'}</li>
    <li>{currentLanguage === 'en' ? 'Total allocation to County Governments is projected at KES 429.7 billion (2.6% of GDP), emphasizing the government’s commitment to decentralized governance.' : 'Kiasi cha jumla kilichotengwa kwa Serikali za Kaunti kinatarajiwa kuwa KES bilioni 429.7 (asilimia 2.6 ya Pato la Taifa), ikisisitiza kujitolea kwa serikali katika utawala wa ugatuzi.'}</li>
    <li>{currentLanguage === 'en' ? 'The government aims to increase revenue collection to KSh 3 trillion in FY 2023/24 through enhanced tax reforms and compliance measures.' : 'Serikali inalenga kuongeza ukusanyaji wa mapato hadi KSh trilioni 3 katika mwaka wa fedha wa 2023/24 kupitia marekebisho ya kodi na hatua za kufuata sheria.'}</li>
    
</ul> 
</div>
        </div>
      </main>
    </div>
  )
}