import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock4,
  Zap,
  BarChart2
} from 'lucide-react';
import './teststatus.css';

export default function TestStatusBar() {
  const totalHours = 150;
  const [testHours, setTestHours] = useState({
    completed: 50,
    onHold: 30,
  });

  const usedHours = testHours.completed + testHours.onHold;
  const remainingHours = totalHours - usedHours;

  const completedPercentage = (testHours.completed / totalHours) * 100;
  const onHoldPercentage = (testHours.onHold / totalHours) * 100;
  const remainingPercentage = (remainingHours / totalHours) * 100;
  return (
    <div className="status-container">
      <div className="status-card">
        <div className="status-header">
          <div className="status-title">
            <BarChart2 size={20} className="status-title-icon" />
            <h3 className="status-title-head">Usage </h3>
          </div>
          <div className="status-subtitle">
            Current billing term usage will be reset at <span className='resetat'>23 Apr 2025 10:00 PM</span>
          </div>
        </div>

        <div className="dashboard-progress-bar">
          <div
            className="progress-segment completed"
            style={{ width: `${completedPercentage}%` }}
            title={`Completed: ${testHours.completed} Hrs`}
          ></div>
          
          <div
            className="progress-segment on-hold"
            style={{ width: `${onHoldPercentage}%` }}
            title={`On Hold: ${testHours.onHold} Hrs`}
          ></div>
          <div
            className="progress-segment remaining"
            style={{ width: `${remainingPercentage}%` }}
            title={`Remaining: ${remainingHours} Hrs`}
          ></div>
        </div>


        <div className="status-metrics">
          <StatusMetric
            icon={<CheckCircle2 size={18} />}
            label="Completed:"
            value={`${testHours.completed} Hrs`}
            color="completed"
          />
          <StatusMetric
            icon={<Clock4 size={18} />}
            label="On Hold:"
            value={`${testHours.onHold} Hrs`}
            color="on-hold"
          />
          <StatusMetric
            icon={<Zap size={18} />}
            label="Total Usage:"
            value={`${usedHours}/${totalHours} `}
            color="total"
          />
        </div>
      </div>
    </div>
  );
}

function StatusMetric({ icon, label, value, color }) {
  return (
    <div className={`metric metric-${color}`}>
      <div className="metric-icon">{icon}</div>
      <div className="metric-details">
        <span className="metric-label">{label}</span>
        <span className="metric-value">{value}</span>
      </div>
    </div>
  );
}