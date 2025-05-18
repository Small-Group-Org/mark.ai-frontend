// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import dummyData from './dummy_data.json';
import './Dashboard.css';
import twitterIcon from '../assets/icons/twitter.png';
import instagramIcon from '../assets/icons/instagram.png';
import tiktokIcon from '../assets/icons/tiktok.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import facebookIcon from '../assets/icons/facebook.png';
import youtubeIcon from '../assets/icons/youtube.png';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('past');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(4); // 0-based index for May
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    filterPosts(activeTab, selectedMonth, selectedYear);
  }, [activeTab, selectedMonth, selectedYear]);

  const filterPosts = (tab, month, year) => {
    const filters = {
      past: post => post.status === 'public',
      upcoming: post => post.status === 'schedule',
      drafts: post => post.status === 'draft'
    };

    const statusFilteredPosts = dummyData.filter(filters[tab] || (() => false));

    // Filter posts by selected month and year
    const monthFilteredPosts = statusFilteredPosts.filter(post => {
      const postDate = new Date(post.scheduleDate || post.createdAt);
      return postDate.getMonth() === month && postDate.getFullYear() === year;
    });

    setFilteredPosts(monthFilteredPosts);
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

  return (
    <div className="post-container">
      <DashboardHeader
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedPost={selectedPost}
      />
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
          {filteredPosts.map((post, index) => {
            const media = post.mediaUrl?.[0];
            const isImage = media && /\.(jpg|jpeg|png|gif)$/i.test(media);
            const isVideo = media && /\.(mp4|mov|webm)$/i.test(media);

            return (
              <div
                key={post._id}
                id="post-item"
                className={index % 2 ? 'odd' : 'even'}
                onClick={() => setSelectedPost(post)} // Set the selected post on click
                style={{ cursor: 'pointer' }}
              >
                <div className="post-media-preview">
                  {isImage && (
                    <img src={media} alt="Media Preview" className="media-thumbnail" />
                  )}
                  {isVideo && (
                    <video className="media-thumbnail" muted>
                      <source src={media} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>

                <div className="post-content">
                  <h4 id="post-title">{post.title}</h4>
                  <p id="post-date">
                    {formatDate(post.scheduleDate || post.createdAt)}
                  </p>
                </div>

                {getPlatformIcon(post.platform)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;