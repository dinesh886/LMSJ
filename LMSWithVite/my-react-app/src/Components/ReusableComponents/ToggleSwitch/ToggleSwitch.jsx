"use client";
import "./ToggleSwitch.css";
import { Check, X } from "lucide-react";
import { useEffect, useRef } from "react";

const ToggleSwitch = ({ isActive, onToggle, disabled = false, showLabel = false }) => {
    const inputRef = useRef(null);

    // Sync the input's checked state with props
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.checked = isActive;
        }
    }, [isActive]);

    return (
        <div className="toggle-switch-container">
            <label className="toggle-switch">
                <input
                    ref={inputRef}
                    type="checkbox"
                    defaultChecked={isActive}
                    onChange={(e) => {
                        e.stopPropagation();
                        onToggle?.();
                    }}
                    disabled={disabled}
                    aria-checked={isActive}
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
            {showLabel && (
                <span className={`toggle-label ${isActive ? "active" : "inactive"}`}>
                    {isActive ? "Active" : "Inactive"}
                </span>
            )}
        </div>
    );
};

export default ToggleSwitch;