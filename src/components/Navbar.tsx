import React from 'react';
import { Link } from "wouter";
import styles from "../styles/Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <div className={styles.Nav_2_398}>
      <span className={styles.Mark_2_399}>Mark </span>
      <span className={styles.SocialGrowthExpert_2_402}>- Social Growth Expert</span>
      <div className={styles.Component_3_2_405}>
        <span className={styles.Text_2_24}>Features</span>
      </div>
      <div className={styles.Component_3_2_407}>
        <span className={styles.Text_2_24}>About</span>
      </div>
      <div className={styles.Component_3_2_409}>
        <span className={styles.Text_2_24}>FAQ</span>
      </div>
      <Link href="/create">
        <div className={styles.Component_3_2_409} style={{ cursor: 'pointer' }}>
          <span className={styles.Text_2_24}>Create Post</span>
        </div>
      </Link>
      <div className={styles.Component_4_2_411}>
        <span className={styles.Text_2_45}>Sign in</span>
      </div>
      <div className={styles.Component_4_2_413}>
        <span className={styles.Text_2_53}>Sign up</span>
      </div>
    </div>
  );
};

export default Navbar;