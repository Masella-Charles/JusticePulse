// SuccessPage.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import styles from './SuccessPage.module.scss';

interface SuccessPageProps {
  type: 'report' | 'petition';
}

export function SuccessPage({ type }: SuccessPageProps) {
  const router = useRouter();

  return (
    <div className={styles.successContainer}>
      <CheckCircle className={styles.successIcon} />
      <h1 className={styles.successTitle}>
        {type === 'report' ? 'Report Submitted Successfully' : 'Petition Created Successfully'}
      </h1>
      <p className={styles.successMessage}>
        {type === 'report'
          ? 'Thank you for your report. We will review it and take appropriate action.'
          : 'Your petition has been created. Start sharing it to gather signatures!'}
      </p>
      <button className={styles.returnButton} onClick={() => window.location.href = '/'}>
        Return to Home
      </button>
    </div>
  );
}
