import { useState } from "react";
import { Link } from "react-router-dom";
import "./ListOfQuestionsType.css";

import {
    ListOrdered,
    Calculator,
    CheckSquare,
    AlignLeft,
} from "lucide-react";

import MCQModal from "../../ReusableComponents/Questions-Types-Modals/MCQModal/MCQModal";
import NumericalModal from "../../ReusableComponents/Questions-Types-Modals/NumericalModal/NumericalModal";
import TrueFalseModal from "../../ReusableComponents/Questions-Types-Modals/TrueFalseModal/TrueFalseModal";
import DescriptiveModal from "../../ReusableComponents/Questions-Types-Modals/DescriptiveModal/DescriptiveModal";

const ListOfQuestionsType = ({ onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNumericalModalOpen, setIsNumericalModalOpen] = useState(false);
    const [isTrueFalseModalOpen, setIsTrueFalseModalOpen] = useState(false);
    const [isDescriptiveModalOpen, setIsDescriptiveModalOpen] = useState(false);

    return (
        <div className="questiontypes-dropdown-menu">
            <ul>
                <li>
                    <Link
                        to="#"
                        className="questiontypes-dropdown-item"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsModalOpen(true);
                        }}
                    >
                        <ListOrdered className="icon" />
                        <span className="ps-2">MCQ-1</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="#"
                        className="questiontypes-dropdown-item"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsModalOpen(true);
                        }}
                    >
                        <ListOrdered className="icon" />
                        <span className="ps-2">MCQ-2</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="#"
                        className="questiontypes-dropdown-item"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsNumericalModalOpen(true);
                        }}
                    >
                        <Calculator className="icon" />
                        <span className="ps-2">Numerical</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="#"
                        className="questiontypes-dropdown-item"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsTrueFalseModalOpen(true);
                        }}
                    >
                        <CheckSquare className="icon" />
                        <span className="ps-2">True/False</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="#"
                        className="questiontypes-dropdown-item"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsDescriptiveModalOpen(true);
                        }}
                    >
                        <AlignLeft className="icon" />
                        <span className="ps-2">Descriptive</span>
                    </Link>
                </li>
            </ul>

            <MCQModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <NumericalModal
                open={isNumericalModalOpen}
                onClose={() => setIsNumericalModalOpen(false)}
            />
            <TrueFalseModal
                open={isTrueFalseModalOpen}
                onClose={() => setIsTrueFalseModalOpen(false)}
            />
            <DescriptiveModal
                open={isDescriptiveModalOpen}
                onClose={() => setIsDescriptiveModalOpen(false)}
            />
        </div>
    );
};

export default ListOfQuestionsType;
