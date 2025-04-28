import React from 'react';
import styles from "../styles/MainSection.module.css";
import ChatInterface from './ChatInterface';

const MainSection: React.FC = () => {
  return (
    <div className={styles.MainSection_2_339}>
      <div className={styles.Heading_1_2_343}>
        <span className={styles.InterviewMark_2_344}>Interview Mark</span>
      </div>
      <span className={styles.Your_24_7SocialMediaExpert_2_348}>
        Your 24/7 Social Media Expert
      </span>
      <div className={styles.Mark_1_3_27}></div>
      <ChatInterface />
    </div>
  );
};

export default MainSection;