// @ts-nocheck
import React from 'react';
import dummyData from './dummy_data.json';
import './DashboardHeader.css';

const DashboardHeader = ({ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, selectedPost }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Count posts for the selected month and year
  const postCreatedCount = dummyData.filter(post => {
    const postDate = new Date(post.scheduleDate || post.createdAt);
    return post.status === 'public' && postDate.getMonth() === selectedMonth && postDate.getFullYear() === selectedYear;
  }).length;

  const postScheduledCount = dummyData.filter(post => {
    const postDate = new Date(post.scheduleDate || post.createdAt);
    return post.status === 'schedule' && postDate.getMonth() === selectedMonth && postDate.getFullYear() === selectedYear;
  }).length;

  return (
    <>
      <h2 className="dashboard-title">Dashboard</h2>
    <div className="dashboard-header">
      <div className="date-section">
        <div className="month-toggle">
          <span className="arrow" onClick={handlePrevMonth}>{"<"}</span>
          <span className="arrow" onClick={handleNextMonth}>{">"}</span>
          <span className="date">{`${months[selectedMonth]} ${selectedYear}`}</span>
        </div>
        <div className="timeframe-toggle">
          <button className="active-timeframe">Month</button>
          <button className="inactive-timeframe">Week</button>
        </div>
      </div>
      <div className="stats-container">
        <div className="left-partition">
          <div className="stat-card post-created">
            <h3>Post created</h3>
            <p className="stat-number">{postCreatedCount}</p>
          </div>
          <div className="stat-card post-scheduled">
            <h3>Post scheduled</h3>
            <p className="stat-number">{postScheduledCount}</p>
          </div>
        </div>
        <div className="stat-card analytics">
          <h3>Ayrshare analytics</h3>
          {selectedPost ? (
            <div className="analytics-data">
              <p>Likes: {selectedPost.likes || 234}</p>
              <p>Comments: {selectedPost.comments || 45}</p>
              <p>Views: {selectedPost.views || 1250}</p>
            </div>
          ) : (
            <div className="analytics-placeholder">
              <img
                src="C:\Users\shubh\OneDrive\Desktop\React\mark-1\client\src\assets\icons\graph.avif"
                alt="Analytics Graph Placeholder"
                className="graph-placeholder"
                />
              <p>Select a post to view analytics</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default DashboardHeader;