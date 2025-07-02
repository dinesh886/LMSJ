"use client";
import "./ToggleSwitch.css";
import { Check, X } from "lucide-react";

const ToggleSwitch = ({ isActive, onToggle, disabled = false }) => {
    return (
        <div className="toggle-switch-container2">
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={onToggle}
                    disabled={disabled}
                />
                <span className="toggle-slider">
                    <span className="toggle-thumb">
                        {isActive ? (
                            <Check size={14} color="#037DE2" />
                        ) : (
                                <X size={14} color="#f87171" />
                        )}
                    </span>
                </span>
            </label>
            {/* <span className={`toggle-label ${isActive ? "active" : "inactive"}`}>
                {isActive ? "Active" : "Inactive"}
            </span> */}
        </div>
    );
};

export default ToggleSwitch;
