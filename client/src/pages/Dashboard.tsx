// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import dummyData from './dummy_data.json';
import './Dashboard.css';
import twitterIcon from '../assets/icons/twitter.png';
import instagramIcon from '../assets/icons/instagram.png';
import tiktokIcon from '../assets/icons/tiktok.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import facebookIcon from '../assets/icons/facebook.png';
import youtubeIcon from '../assets/icons/youtube.png';
import defaultImage from '../assets/default-image.png'; // Add a default image

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('past');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    filterPosts(activeTab);
  }, [activeTab]);

  const filterPosts = (tab) => {
    const filters = {
      past: post => post.status === 'public',
      upcoming: post => post.status === 'schedule',
      drafts: post => post.status === 'draft'
    };
    setFilteredPosts(dummyData.filter(filters[activeTab] || (() => false)));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', ' -');
  };

  const getPlatformIcon = (platform) => {
    const platformIcons = {
      twitter: twitterIcon,
      instagram: instagramIcon,
      tiktok: tiktokIcon,
      linkedin: linkedinIcon,
      facebook: facebookIcon,
      youtube: youtubeIcon
    };
    
    if (platform && platformIcons[platform]) {
      return (
        <img 
          src={platformIcons[platform]} 
          alt={platform} 
          className="platform-icon" 
        />
      );
    }
    return null;
  };

  const renderMedia = (mediaUrl) => {
    if (!mediaUrl || mediaUrl.length === 0) {
      return (
        <div className="post-media">
          <img src={defaultImage} alt="Default content" className="media-image" />
        </div>
      );
    }

    // Take the first media item (you can extend this to handle multiple)
    const media = mediaUrl[0];
    const isVideo = media?.endsWith('.mp4') || media?.endsWith('.mov');

    return (
      <div className="post-media">
        {isVideo ? (
          <video controls className="media-image">
            <source src={media} type="video/mp4" />
          </video>
        ) : (
          <img src={media || defaultImage} alt="Post content" className="media-image" />
        )}
      </div>
    );
  };

  return (
    <div id="posts-container">
      <div id="posts-tabs">
        {['past', 'upcoming', 'drafts'].map(tab => (
          <button
            key={tab}
            id={activeTab === tab ? 'active-tab-button' : 'tab-button'}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Posts
          </button>
        ))}
      </div>

      <div id="posts-list">
        {filteredPosts.map((post, index) => (
          <div
            key={post._id}
            id="post-item"
            className={index % 2 ? 'odd' : 'even'}
          >
            {renderMedia(post.mediaUrl)}
            <div className="post-content">
              <h4 id="post-title">{post.title}</h4>
              <p id="post-date">
                {formatDate(post.scheduleDate || post.createdAt)}
              </p>
            </div>
            {getPlatformIcon(post.platform)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;