import React, { useState } from "react";
import "./StudentBulkActions.css";
import { toast } from "react-toastify";
import { MonitorX } from "lucide-react";
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

const StudentBulkActions = ({
    selectedRows = [], // Array of row objects (not just IDs)
    studentActions = [],
    onBulkSuspend,
    onBulkTerminate,
    onBulkSendMessage,
    suspendedStates,
    setSuspendedStates,
    terminatedStates,
    setTerminatedStates,
    allStudents = [] // Add this prop to access student status
}) => {
    // Check if all selected rows are currently suspended
    const allSuspended = selectedRows.length > 0 &&
        selectedRows.every(row => suspendedStates[row.id]);

    // Check if any selected rows are terminated (disabled state)
    const anyTerminated = selectedRows.some(row => terminatedStates[row.id]);

    // Check if any selected rows have status "Submitted"
    const anySubmitted = selectedRows.some(row => {
        const student = allStudents.find(s => s.id === row.id);
        return student?.status === "Submitted";
    });

    // Combined disabled condition
    const isDisabled = anyTerminated || anySubmitted;

    const handleBulkSuspendToggle = () => {
        if (onBulkSuspend && selectedRows.length && !isDisabled) {
            const newSuspendedStates = { ...suspendedStates };
            const isSuspending = !allSuspended;

            selectedRows.forEach(row => {
                newSuspendedStates[row.id] = isSuspending;
            });

            setSuspendedStates(newSuspendedStates);
            onBulkSuspend(selectedRows, isSuspending);
        }
    };

    const handleBulkTerminate = () => {
        if (onBulkTerminate && selectedRows.length && !isDisabled) {
            const newTerminatedStates = { ...terminatedStates };
            const newSuspendedStates = { ...suspendedStates };

            selectedRows.forEach(row => {
                newTerminatedStates[row.id] = true;
                newSuspendedStates[row.id] = false;
            });

            setTerminatedStates(newTerminatedStates);
            setSuspendedStates(newSuspendedStates);
            onBulkTerminate(selectedRows);
        }
    };

    const handleBulkMessage = () => {
        if (onBulkSendMessage && selectedRows.length && !isDisabled) {
            onBulkSendMessage(selectedRows);
        }
    };

    const renderStudentActionButton = (action) => {
        switch (action) {
            case "suspend":
                return (
                    <button
                        key="suspend"
                        className={`tube-action-button ${isDisabled ? "disabled" : ""}`}
                        data-tooltip={allSuspended ? "Resume students" : "Suspend students"}
                        onClick={handleBulkSuspendToggle}
                        disabled={isDisabled}
                    >
                        <div className="suspend-toggle-container">
                            <MonitorX size={14} />
                            <span>{allSuspended ? "Resume" : "Suspend"}</span>
                            <div className={`studentbulk-status-toggle ${allSuspended ? "disabled" : "enabled"}`}>
                                <div className="studentbulk-status-toggle-track">
                                    <div className={`studentbulk-status-toggle-thumb ${allSuspended ? "disabled" : "enabled"}`}>
                                        {!allSuspended ? (
                                            <IoMdCheckmark className="status-icon" />
                                        ) : (
                                            <IoMdClose className="status-icon" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                );
            case "terminate":
                return (
                    <button
                        key="terminate"
                        className={`tube-action-button ${isDisabled ? "disabled" : ""}`}
                        data-tooltip="Terminate"
                        onClick={handleBulkTerminate}
                        disabled={isDisabled}
                    >
                        Terminate
                    </button>
                );
            case "sendMessage":
                return (
                    <button
                        key="sendMessage"
                        className={`tube-action-button ${isDisabled ? "disabled" : ""}`}
                        data-tooltip="Send Notification"
                        onClick={handleBulkMessage}
                        disabled={isDisabled}
                    >
                        Notify
                    </button>
                );
            default:
                return null;
        }
    };

    if (!selectedRows.length || !studentActions.length) return null;

    return (
        <div className="tube-bulk-actions-container">
            <div className="tube-bulk-actions">
                {studentActions.map((action, index) => (
                    <React.Fragment key={action}>
                        <div className="tube-bulk-button">
                            {renderStudentActionButton(action)}
                        </div>
                        {index < studentActions.length - 1 && <div className="tube-divider" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default StudentBulkActions;