'use client';

import React, { useState, useEffect } from 'react'
import { 
  ArrowLeft, 
  Book, 
  Search, 
  ExternalLink, 
  FileText, 
  Users, 
  Scale, 
  AlertTriangle, 
  Globe, 
  Shield, 
  Heart, 
  Lock, 
  Eye, 
  Flag, 
  Home, 
  UserCheck 
} from 'lucide-react';

import styles from './HumanRights.module.scss'

export default function HumanRights() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // For debounce search
  const [errorMessage, setErrorMessage] = useState(''); // For error handling

  // Debounce effect for the search input to reduce performance issues
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Delay of 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'sw' : 'en');
  };

  const resources = [
    {
      title: 'Understanding Human Rights',
      description: 'An introduction to basic human rights concepts and international frameworks.',
      link: '#', // Placeholder link - handle broken link
      type: 'education',
      icon: Book,
    },
    {
      title: 'Kenya Human Rights Commission',
      description: 'Official website of the Kenya Human Rights Commission with reports and resources.',
      link: 'https://www.khrc.or.ke/',
      type: 'organization',
      icon: Users,
    },
    {
      title: 'Legal Aid for Human Rights Violations',
      description: 'Information on how to seek legal assistance for human rights violations in Kenya.',
      link: '#', // Placeholder link - handle broken link
      type: 'legal',
      icon: Scale,
    },
    {
      title: 'Reporting Human Rights Abuses',
      description: 'Step-by-step guide on how to report human rights abuses to relevant authorities.',
      link: '#', // Placeholder link - handle broken link
      type: 'guide',
      icon: AlertTriangle,
    },
    {
      title: 'Universal Declaration of Human Rights',
      description: 'Full text of the UDHR, a milestone document in the history of human rights.',
      link: 'https://www.un.org/en/about-us/universal-declaration-of-human-rights',
      type: 'document',
      icon: FileText,
    },
    {
      title: 'African Commission on Human and Peoples',
      description: 'Information on human rights in the African context and regional mechanisms.',
      link: 'https://www.achpr.org/',
      type: 'organization',
      icon: Users,
    },
    {
      title: 'Human Rights Watch - Kenya',
      description: 'Reports and news on human rights issues in Kenya from an international perspective.',
      link: 'https://www.hrw.org/africa/kenya',
      type: 'news',
      icon: AlertTriangle,
    },
    {
      title: 'Kenya National Commission on Human Rights',
      description: 'Official body for the promotion and protection of human rights in Kenya.',
      link: 'https://www.knchr.org/',
      type: 'organization',
      icon: Users,
    },
    // Additional Resources
    {
      title: 'Children’s Rights in Kenya',
      description: 'Resources and laws protecting the rights of children in Kenya, including education and safety.',
      link: 'https://resourcecentre.savethechildren.net/',
      type: 'advocacy',
      icon: Home,
    },
    {
      title: 'Gender Equality and Human Rights',
      description: 'Guidance on addressing gender-based discrimination and promoting women’s rights in Kenya.',
      link: 'https://www.genderinkenya.org/',
      type: 'advocacy',
      icon: Heart,
    },
    {
      title: 'Refugee Rights and Protection in Kenya',
      description: 'Information about the rights of refugees and asylum seekers in Kenya.',
      link: 'https://www.unhcr.org/kenya.html',
      type: 'organization',
      icon: Users,
    },
    {
      title: 'Minority Rights Group - Kenya',
      description: 'Reports and data on the protection of minority and indigenous communities in Kenya.',
      link: 'https://minorityrights.org/country/kenya/',
      type: 'organization',
      icon: Users,
    },
    {
      title: 'Freedom of Expression and Media Rights',
      description: 'Reports on press freedom, media rights, and protection of journalists in Kenya.',
      link: 'https://www.article19.org/region/eastern-africa/',
      type: 'legal',
      icon: Flag,
    },
    {
      title: 'Amnesty International - Kenya',
      description: 'Reports on human rights violations, campaigns, and resources for activists in Kenya.',
      link: 'https://www.amnesty.org/en/location/africa/east-africa-the-horn-and-great-lakes/kenya/',
      type: 'advocacy',
      icon: AlertTriangle,
    },
    {
      title: 'Access to Water as a Human Right',
      description: 'Exploring the right to access clean water and sanitation in Kenya.',
      link: 'https://www.water.org/',
      type: 'rights',
      icon: Scale,
    },
    {
      title: 'Land Rights and Indigenous Communities',
      description: 'Information on land disputes, rights of indigenous peoples, and land ownership in Kenya.',
      link: 'https://landportal.org/',
      type: 'advocacy',
      icon: Users,
    },
    {
      title: 'Rights of Persons with Disabilities in Kenya',
      description: 'Legal protections and resources for persons living with disabilities in Kenya.',
      link: 'https://ncpwd.go.ke/',
      type: 'legal',
      icon: Scale,
    },
    {
      title: 'Environmental Rights and Climate Justice',
      description: 'Advocacy for environmental rights and climate justice in Kenya.',
      link: 'https://www.greenpeace.org/africa/',
      type: 'advocacy',
      icon: Globe,
    },
    {
      title: 'Youth Rights in Kenya',
      description: 'Information on rights and opportunities for youth empowerment and advocacy in Kenya.',
      link: 'https://www.youthagenda.org/',
      type: 'advocacy',
      icon: Users,
    },
    {
      title: 'Kenya Labour Rights & Trade Unions',
      description: 'Resources on workers’ rights, labor laws, and trade union activity in Kenya.',
      link: 'https://www.cotu-kenya.org/',
      type: 'organization',
      icon: Users,
    },
    {
      title: 'Social and Economic Rights in Kenya',
      description: 'Exploring social and economic rights including access to healthcare, education, and food security.',
      link: 'https://www.haki-jamii.org/',
      type: 'advocacy',
      icon: Scale,
    },
    {
      title: 'Women’s Legal Aid Centre - Kenya',
      description: 'Legal support for women facing domestic violence, discrimination, or property rights violations.',
      link: 'https://www.wlck.org/',
      type: 'legal',
      icon: Scale,
    },
    {
      title: 'Human Trafficking Prevention and Support',
      description: 'Efforts to combat human trafficking and support for victims in Kenya.',
      link: 'https://freedomcollaborative.org/',
      type: 'advocacy',
      icon: Lock,
    },
    {
      title: 'Kenya Land Alliance',
      description: 'National organization focused on equitable land rights and legal reforms in Kenya.',
      link: 'https://www.kenyalandalliance.or.ke/',
      type: 'advocacy',
      icon: Users,
    },
    {
      title: 'Rights of Elderly Persons in Kenya',
      description: 'Legal and social protections for elderly persons, including pensions and elder care.',
      link: 'https://www.helpage.org/',
      type: 'rights',
      icon: Users,
    },
    {
      title: 'Digital Rights and Data Privacy in Kenya',
      description: 'Information on data protection laws, digital rights, and cybersecurity for Kenyan citizens.',
      link: 'https://www.odpc.go.ke/',
      type: 'legal',
      icon: Shield,
    },
    {
      title: 'Kenya LGBTQ+ Rights',
      description: 'Advocacy for the rights and protection of the LGBTQ+ community in Kenya.',
      link: 'https://www.galck.org/',
      type: 'advocacy',
      icon: UserCheck,
    },
    {
      title: 'Global Human Rights Defence - Kenya Chapter',
      description: 'Support for victims of human rights abuses and grassroots activism.',
      link: 'https://www.ghrd.org/',
      type: 'advocacy',
      icon: AlertTriangle,
    },
    {
      title: 'World Health Organization - Kenya',
      description: 'Human rights to healthcare, including vaccination campaigns and pandemic response.',
      link: 'https://www.who.int/countries/ken/',
      type: 'organization',
      icon: Users,
    },
    {
      title: 'Open Government Partnership - Kenya',
      description: 'Promoting transparency, accountability, and public participation in governance.',
      link: 'https://www.opengovpartnership.org/members/kenya/',
      type: 'organization',
      icon: Globe,
    },
    {
      title: 'Justice for Survivors of Sexual and Gender-Based Violence',
      description: 'Legal aid and psychological support for survivors of SGBV in Kenya.',
      link: 'https://creawkenya.org/',
      type: 'legal',
      icon: Eye,
    },
    {
      title: 'Kenya Network for Legal Aid',
      description: 'A hub for accessing pro bono legal assistance for vulnerable populations.',
      link: 'https://www.knla.or.ke/',
      type: 'legal',
      icon: Scale,
    },
  ];
  

  // Filter resources by debounced search term
  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    resource.type.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Function to handle broken URLs
  const handleClick = (url: string) => {
    if (url === '#') {
      setErrorMessage(currentLanguage === 'en' ? 'Resource not available' : 'Rasilimali haipatikani');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <button className={styles.backButton} onClick={() => window.location.href = '/'} aria-label="Go back">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className={styles.pageTitle}>
            {currentLanguage === 'en' ? 'Human Rights Resources' : 'Rasilimali za Haki za Binadamu'}
          </h1>
        </div>
        <button
          onClick={toggleLanguage}
          className={styles.languageToggle}
          aria-label="Toggle language"
        >
          {currentLanguage === 'en' ? 'SW' : 'EN'}
        </button>
      </header>

      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder={currentLanguage === 'en' ? 'Search resources...' : 'Tafuta rasilimali...'}
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label={currentLanguage === 'en' ? 'Search resources' : 'Tafuta rasilimali'}
          />
          <Search className={styles.searchIcon} />
        </div>
      </div>

      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      <main className={styles.main}>
        <div className={styles.resourceGrid}>
          {filteredResources.map((resource, index) => (
            <div key={index} className={styles.resourceCard}>
              <div className={styles.resourceContent}>
                <div className={styles.resourceIcon}>
                  <resource.icon className="h-6 w-6 text-white" />
                </div>
                <div className={styles.resourceInfo}>
                  <h2 className={styles.resourceTitle}>{resource.title}</h2>
                  <p className={styles.resourceDescription}>{resource.description}</p>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.resourceLink}
                    onClick={(e) => {
                      if (!handleClick(resource.link)) e.preventDefault();
                    }}
                    aria-label={currentLanguage === 'en' ? 'Learn more about this resource' : 'Jifunze zaidi kuhusu rasilimali hii'}
                  >
                    {currentLanguage === 'en' ? 'Learn More' : 'Jifunze Zaidi'}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
