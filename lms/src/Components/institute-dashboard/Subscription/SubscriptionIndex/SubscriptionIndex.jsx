import React, { useState } from 'react';
import { FiCalendar, FiDollarSign, FiClock, FiCheckCircle, FiX, FiStar } from 'react-icons/fi';
import Subscriptionform from '../Subscriptionform/Subscriptionform';
import './SubscriptionIndex.css';
import Header from '../../../header/header';

const SubscriptionIndex = () => {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);

  const subscriptionDetails = {
    duration: '1 Month',
    price: '₹1,850',
    expireDate: '30 days remaining',
    features: [
      'Access to basic courses',
      'Limited support',
      'Basic test reports',
      'Up to 25 classes',
      '5 teacher accounts',
      '200 student capacity'
    ],
    packageStats: {
      Classes: 25,
      Teachers: 5,
      Students: 200,
      Tests: 10,
      'Test Hours': 50,
      QuestionBanks: 5,
      Questions: 1000
    }
  };

  const plans = [
    {
      name: "Basic",
      price: "₹1,850",
      duration: "1 Month",
      features: [
        "25 Classes",
        "5 Teachers",
        "200 Students",
        "10 Tests",
        "Basic Support"
      ],
      recommended: false
    },
    {
      name: "Professional",
      price: "₹4,500",
      duration: "3 Months",
      features: [
        "Unlimited Classes",
        "15 Teachers",
        "500 Students",
        "50 Tests",
        "Priority Support",
        "Advanced Analytics"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "₹8,000",
      duration: "6 Months",
      features: [
        "Unlimited Classes",
        "Unlimited Teachers",
        "1000+ Students",
        "Unlimited Tests",
        "24/7 Support",
        "Advanced Analytics",
        "Custom Branding"
      ],
      recommended: false
    }
  ];

  const handleUpgradeClick = (plan) => {
    setCurrentPlan(plan);
    setShowEnquiryForm(true);
  };

  return (
    <>
      <Header />
      <div className="subscription-container">
        {/* <div className="subscription-header">
          <h1>Subscription Management</h1>
          <p>Choose the perfect plan for your institution's needs</p>
        </div> */}

        <div className="current-plan-section">
          <div className="current-plan-card">
            <div className="plan-header">
              <div className="plan-title">
                <span className="plan-badge">Current Plan</span>
                <h3>Basic Plan</h3>
              </div>
              <span className="active-status">
                <FiCheckCircle /> Active
              </span>
            </div>

            <div className="plan-details-grid">
              <div className="detail-item">
                <div className="detail-icon-container">
                  <FiCalendar className="detail-icon" />
                </div>
                <div>
                  <p className="detail-label">Billing Cycle</p>
                  <p className="detail-value">{subscriptionDetails.duration}</p>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon-container">
                  <FiDollarSign className="detail-icon" />
                </div>
                <div>
                  <p className="detail-label">Price</p>
                  <p className="detail-value">{subscriptionDetails.price}</p>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon-container">
                  <FiClock className="detail-icon" />
                </div>
                <div>
                  <p className="detail-label">Renews in</p>
                  <p className="detail-value">{subscriptionDetails.expireDate}</p>
                </div>
              </div>
            </div>

            <div className="plan-features-section">
              <h4>Plan Features</h4>
              <div className="features-grid">
                {subscriptionDetails.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <FiCheckCircle className="feature-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="usage-stats-card">
            <h3>Usage Statistics</h3>
            <div className="stats-grid">
              {Object.entries(subscriptionDetails.packageStats).map(([key, value]) => (
                <div key={key} className="stat-item">
                  <div className="stat-value">{value}</div>
                  <div className="stat-label">{key}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="upgrade-section">
          <div className="section-header">
            <h2>Upgrade Your Plan</h2>
            <p>Select a plan that matches your institution's growth</p>
          </div>

          <div className="plans-grid">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`plan-card ${plan.recommended ? 'recommended' : ''}`}
              >
                {plan.recommended && (
                  <div className="recommended-badge">
                    <FiStar /> Recommended
                  </div>
                )}

                <div className="plan-card-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    {plan.price}
                    <span className="plan-duration">/{plan.duration}</span>
                  </div>
                </div>

                <div className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <FiCheckCircle className="feature-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`upgrade-button ${plan.recommended ? 'primary' : 'secondary'}`}
                  onClick={() => handleUpgradeClick(plan)}
                >
                  {plan.name === 'Basic' ? 'Renew Plan' : 'Upgrade Now'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {showEnquiryForm && (
          <div className="enquiry-modal">
            <div className="modal-overlay" onClick={() => setShowEnquiryForm(false)}></div>
            <div className="modal-content">
              <button
                className="close-modal"
                onClick={() => setShowEnquiryForm(false)}
              >
                <FiX />
              </button>
              <Subscriptionform
                onClose={() => setShowEnquiryForm(false)}
                defaultValues={currentPlan}
                planName={currentPlan?.name}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubscriptionIndex;