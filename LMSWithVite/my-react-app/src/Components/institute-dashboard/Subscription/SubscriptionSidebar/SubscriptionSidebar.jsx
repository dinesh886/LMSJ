import React from 'react'
import { Database, Mail, CreditCard, Settings, HelpCircle } from 'lucide-react'
import './SubscriptionSidebar.css'

const SubscriptionSidebar = () => {
  return (
    <div className="sidebar-wrapper">
      {/* Sidebar Container */}
      <nav className="test-sidebar-container" aria-label="Subscription Navigation">
        <div className="test-sidebar-header">
          <span className="sidebar-letters">Subscription Info</span>
        </div>

        <div className="test-sidebar-section">
          <ul className="test-sidebar-menu">
            <li>
              <a
                href="#subscription-details"
                className="sidebar-contents"
                aria-label="Subscription Details"
              >
                <Database className="icon" size={18} />
                <span className="sidebar-letters">Subscription Details</span>
              </a>
            </li>
            <li>
              <a
                href="#billing"
                className="sidebar-contents"
                aria-label="Billing Information"
              >
                <CreditCard className="icon" size={18} />
                <span className="sidebar-letters">Billing</span>
              </a>
            </li>
            <li>
              <a
                href="#notifications"
                className="sidebar-contents"
                aria-label="Notifications"
              >
                <Mail className="icon" size={18} />
                <span className="sidebar-letters">Notifications</span>
              </a>
            </li>
            <li>
              <a
                href="#settings"
                className="sidebar-contents"
                aria-label="Settings"
              >
                <Settings className="icon" size={18} />
                <span className="sidebar-letters">Settings</span>
              </a>
            </li>
            <li>
              <a
                href="#support"
                className="sidebar-contents"
                aria-label="Support"
              >
                <HelpCircle className="icon" size={18} />
                <span className="sidebar-letters">Support</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="test-sidebar-section">
          
          <p className="subscription-sidebar-text">
            Manage your subscription and access premium features.
          </p>
          <button className="allbuttons">
            Contact Us
          </button>
        </div>
      </nav>
    </div>
  )
}

export default SubscriptionSidebar