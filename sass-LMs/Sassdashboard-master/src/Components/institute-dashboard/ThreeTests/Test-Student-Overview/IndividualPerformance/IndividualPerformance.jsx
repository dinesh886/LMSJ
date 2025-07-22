import React, { useState, useEffect } from 'react';
import { Zap, Target, Activity, TrendingUp, BookOpen, BarChart2 } from 'lucide-react';
import './IndividualPerformance.css';

const IndividualPerformance = () => {
    const [efficiency, setEfficiency] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [average, setAverage] = useState(0);
    const [growth, setGrowth] = useState(0);
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        // Automatically start animation on component mount
        if (!animated) {
            animateCounters();
            setAnimated(true);
        }

        const handleScroll = () => {
            const element = document.querySelector('.performance-container');
            if (element) {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
                if (isVisible && !animated) {
                    animateCounters();
                    setAnimated(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [animated]);

    const animateCounters = () => {
        animateValue(setEfficiency, 0, 78, 1500);
        animateValue(setAccuracy, 0, 85, 1500);
        animateValue(setAverage, 0, 72, 1500);
        animateValue(setGrowth, 0, 64, 1500);
    };

    const animateValue = (setter, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setter(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    return (
    <>
            <div className="performance-container">

   
            <div className="performance-header">
                    <BarChart2 size={20} />
                <h2>Individual Performance</h2>
                {/* <p>Real-time metrics and analytics overview</p> */}
            </div>
      
            

            <div className="performance-metrics">
                <div className="performance-card">
                    <div className="performance-gauge">
                        <div className="progress-circle">
                            <div
                                className="progress-circle-fill efficiency-gradient"
                                style={{ '--percentage': efficiency }}
                            ></div>
                            <div className="progress-circle-inner">
                                <span className="progress-percentage">{efficiency}%</span>
                            </div>
                        </div>
                        {/* <div className="performance-icon efficiency-icon">
                            <Zap />
                        </div> */}
                    </div>
                    <h3>Efficiency</h3>
                    {/* <p>Daily performance</p> */}
                </div>

                <div className="performance-card">
                    <div className="performance-gauge">
                        <div className="progress-circle">
                            <div
                                className="progress-circle-fill accuracy-gradient"
                                style={{ '--percentage': accuracy }}
                            ></div>
                            <div className="progress-circle-inner">
                                <span className="progress-percentage">{accuracy}%</span>
                            </div>
                        </div>
                        {/* <div className="performance-icon accuracy-icon">
                            <Target />
                        </div> */}
                    </div>
                    <h3>Accuracy</h3>
                    {/* <p>Error-free rate</p> */}
                </div>

                <div className="performance-card">
                    <div className="performance-gauge">
                        <div className="progress-circle">
                            <div
                                className="progress-circle-fill average-gradient"
                                style={{ '--percentage': average }}
                            ></div>
                            <div className="progress-circle-inner">
                                <span className="progress-percentage">{average}%</span>
                            </div>
                        </div>
                        {/* <div className="performance-icon average-icon">
                            <Activity />
                        </div> */}
                    </div>
                    <h3>Average</h3>
                    {/* <p>Overall score</p> */}
                </div>

                {/* <div className="performance-card">
                    <div className="performance-gauge">
                        <div className="progress-circle">
                            <div
                                className="progress-circle-fill growth-gradient"
                                style={{ '--percentage': growth }}
                            ></div>
                            <div className="progress-circle-inner">
                                <span className="progress-percentage">{growth}%</span>
                            </div>
                        </div>
                        <div className="performance-icon growth-icon">
                            <TrendingUp />
                        </div>
                    </div>
                    <h3>Growth</h3>
                    <p>Month over month</p>
                </div> */}
            </div>

            {/* <div className="performance-summary">
                <div className="summary-header">
                    <h3>Monthly Overview</h3>
                    <span className="summary-date">May 2025</span>
                </div>
                <div className="summary-stats">
                    <div className="summary-stat">
                        <span className="stat-value">78.3%</span>
                        <span className="stat-label">Average Score</span>
                    </div>
                    <div className="summary-stat">
                        <span className="stat-value">+12%</span>
                        <span className="stat-label">Improvement</span>
                    </div>
                    <div className="summary-stat">
                        <span className="stat-value">Top 15%</span>
                        <span className="stat-label">Ranking</span>
                    </div>
                </div>
            </div> */}
        
            </div>
        </>
    );
};

export default IndividualPerformance;
