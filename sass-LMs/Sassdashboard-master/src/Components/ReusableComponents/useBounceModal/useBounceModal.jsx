import { useState, useEffect, useRef } from "react";

const useBounceModal = (isOpen) => {
    const [isBouncing, setIsBouncing] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setIsBouncing(true);
                setTimeout(() => setIsBouncing(false), 300); // Reset after animation
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return { modalRef, isBouncing };
};

export default useBounceModal;
