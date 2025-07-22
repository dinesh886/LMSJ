
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./TestAttempt.css";
import { FaChevronLeft, FaChevronRight, FaClock } from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import LatexRenderer from "../../../../../ReusableComponents/LatexRenderer/LatexRenderer";
import { Helmet } from "react-helmet";

const TestAttempt = () => {
    const { testId } = useParams();

    const data = [
        {
            id: 1,
            question: `Identify the graph of the function $$y = \\sin(x)$$ from the options below:
<img src="https://insightsedu.in/new/3.png" alt="Sine function formula" style="max-width: 300px; height: auto;" />`,
            answer: `The correct answer is option a) Sine Wave. The sine function produces a characteristic wave pattern that oscillates between -1 and 1.`,
            type: "MCQ",
            marks: 3,
            owner: "Admin",
            section: "Trigonometry",
            created: "15/03/2025",
            modified: "3 weeks ago",
            options: [
                '<img src="https://insightsedu.in/new/4.png" alt="Option A - Sine Wave" style="max-width: 200px; height: auto;" /> Sine Wave',
                '<img src="https://insightsedu.in/new/4.png" alt="Option B - Straight Line" style="max-width: 200px; height: auto;" /> Straight Line',
                '<img src="https://insightsedu.in/new/4.png" alt="Option C - Parabola" style="max-width: 200px; height: auto;" /> Parabola',
                '<img src="https://insightsedu.in/new/4.png" alt="Option D - Exponential" style="max-width: 200px; height: auto;" /> Exponential Curve',
            ],
            correctAnswer: 0,
            isLaTeXEnabled: true,
            hasImages: true
        },
        {
            id: 2,
            question: `A particle moves along a path defined by:
$$x(t) = R \\cos(\\omega t), \\quad y(t) = R \\sin(\\omega t), \\quad z(t) = kt^2$$
Which of the following represents the arc length $$S$$?`,
            answer: `The correct solution is option D:
$$S = \\frac{1}{4k} \\left[ 2kT \\sqrt{R^2 \\omega^2 + 4k^2 T^2} + R^2 \\omega^2 \\ln\\left(\\frac{2kT + \\sqrt{R^2 \\omega^2 + 4k^2 T^2}}{R\\omega}\\right) \\right]$$`,
            type: "MCQ",
            marks: 10,
            owner: "Admin",
            section: "Advanced Mathematics",
            created: "15/03/2025",
            modified: "1 day ago",
            options: [
                `$$S = \\frac{T}{2} \\sqrt{R^2 \\omega^2 + 4k^2 T^2} + \\frac{R^2 \\omega^2}{4k} \\sinh^{-1}\\left(\\frac{2kT}{R\\omega}\\right)$$`,
                `$$S = \\frac{T}{2} \\sqrt{R^2 \\omega^2 + 4k^2 T^2} + \\frac{R^2 \\omega^2}{4k} \\ln\\left|2kT + \\sqrt{R^2\\omega^2 + 4k^2 T^2}\\right|$$`,
                `$$S = \\frac{T}{2} \\sqrt{R^2 \\omega^2 + 4k^2 T^2} + \\frac{R^2 \\omega^2}{4k} \\tan^{-1}\\left(\\frac{2kT}{R\\omega}\\right)$$`,
                `$$S = \\frac{1}{4k} \\left[ 2kT \\sqrt{R^2 \\omega^2 + 4k^2 T^2} + R^2 \\omega^2 \\ln\\left(\\frac{2kT + \\sqrt{R^2 \\omega^2 + 4k^2 T^2}}{R\\omega}\\right) \\right]$$`,
            ],
            correctAnswer: 3,
            isLaTeXEnabled: true
        },
        {
            id: 3,
            question: `Explain the concept of wave-particle duality in quantum mechanics. Include:
- Description of the phenomenon
- Key experiments demonstrating it
- Implications for understanding matter
- Examples where this duality is observed`,
            answer: `Wave-particle duality is a fundamental concept in quantum mechanics that states every particle exhibits both wave and particle properties. Key experiments include:
1. Young's double-slit experiment with electrons
2. Photoelectric effect demonstrating particle nature of light
3. Davisson-Germer experiment showing wave nature of electrons
Implications: Classical concepts of "particle" or "wave" are inadequate to fully describe quantum-scale objects. Examples include:
- Electron diffraction patterns
- Photon behavior in quantum optics experiments
- Neutron interference patterns`,
            type: "Paragraph",
            marks: 15,
            owner: "Admin",
            section: "Quantum Physics",
            created: "16/03/2025",
            modified: "2 days ago",
            isLaTeXEnabled: true
        },
       
        {
            id: 5,
            question: `Calculate the root mean square speed of oxygen molecules (O₂) at 300 K.
Molar mass = 32 g/mol, R = 8.314 J/(mol·K).`,
            answer: `The root mean square speed is calculated using:
$$v_{rms} = \\sqrt{\\frac{3RT}{M}}$$
Result: 483.56 m/s`,
            type: "Numerical",
            marks: 5,
            owner: "Admin",
            section: "Thermodynamics",
            created: "16/03/2025",
            modified: "3 days ago",
            correctAnswer: "483.56 m/s",
            tolerance: "±5%",
            isLaTeXEnabled: true,
            units: "m/s"
        },
        {
            id: 6,
            question: `The Pythagorean theorem states $$c^2 = a^2 + b^2$$ for right triangles. true false`,
            answer: `True. The Pythagorean theorem correctly relates the sides of a right-angled triangle.`,
            type: "True/False",
            marks: 2,
            owner: "Admin",
            section: "Geometry",
            created: "16/03/2025",
            modified: "1 week ago",
            correctAnswer: true
        },
        {
            id: 7,
            question: `एक आयाम में ऊष्मा समीकरण पर विचार करें:
$$\\frac{\\partial u(x,t)}{\\partial t} = \\alpha \\frac{\\partial^2 u(x,t)}{\\partial x^2}$$
सामान्य समाधान है:`,
            answer: `विकल्प a और b दोनों सही हैं। समाधान $$u(x,t) = \\sum_{n=1}^{\\infty} A_n \\sin\\left(\\frac{n \\pi x}{L}\\right) e^{-\\alpha \\left(\\frac{n \\pi}{L}\\right)^2 t}$$ है`,
            type: "MCQ",
            marks: 7,
            owner: "Admin",
            section: "गणित (हिंदी)",
            created: "15/03/2025",
            modified: "1 week ago",
            options: [
                "$$u(x,t) = \\sum_{n=1}^{\\infty} A_n \\sin\\left(\\frac{n \\pi x}{L}\\right) e^{-\\alpha \\left(\\frac{n \\pi}{L}\\right)^2 t}$$",
                "स्वदेशी मान $$\\lambda_n = \\left(\\frac{n \\pi}{L}\\right)^2$$",
                "विकल्प a और b दोनों सही हैं",
                "समाधान को स्वदेशी मानों के रूप में व्यक्त नहीं किया जा सकता"
            ],
            correctAnswer: 2,
            isLaTeXEnabled: true
        },
        {
            id: 8,
            question: `సత్యనారాయణ వ్యవసాయం లో ఏ మూడు భాగాలు ఉంటాయి?`,
            answer: `రబి, ఖరీఫ్, బోనాల`,
            type: "MCQ",
            marks: 2,
            owner: "Admin",
            section: "వ్యవసాయం (తెలుగు)",
            created: "15/03/2025",
            modified: "2 weeks ago",
            options: [
                "రబి, ఖరీఫ్, బోనాల",
                "శీతకాల, వేసవికాల, ఆదివార",
                "పంటల్ని వేరే విభజించలేదు",
                "ఉష్ణకటిన, ట్రోపికల్, మాన్సూన్"
            ],
            correctAnswer: 0,
            isLaTeXEnabled: false
        },
        {
            id: 4,
            question: `The following table shows experimental data for a reaction:
              <table class="data-table">
                <thead><tr><th>Time (s)</th><th>Concentration (M)</th></tr></thead>
                <tbody>
                  <tr><td>0</td><td>1.00</td></tr>
                  <tr><td>10</td><td>0.82</td></tr>
                </tbody>
              </table>
              Determine the reaction order and rate constant.`,
            type: "Table",
            isLaTeXEnabled: false,
            section: "Quantum Physics",
            hasTables: true,
            options: [
                "First order, k = 0.022 s⁻¹",
                "Zero order, k = 0.18 M/s",
                "Second order, k = 0.12 M⁻¹s⁻¹",
                "Cannot be determined"
            ],
            correctAnswer: 0
        },
          
        {
            id: 9,
            question: `In Python, what will be the output of the following code?`,
            answer: `The output will be 120 (5 factorial)`,
            type: "Programming",
            section: "Programming",
            options: [
                "120",
                "24",
                "60",
                "Runtime Error"
            ],
            correctAnswer: 0,
            isLaTeXEnabled: false,
            hasCode: true,
            code: `def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)
result = factorial(5)
print(result)`
        }
    ];

    const testData = {
        id: testId,
        title: "JEE Main 2025 (Online) 24th January Evening Slot",
        sections: data.reduce((acc, item) => {
            const sectionName = item.section?.trim();
            if (sectionName && !acc.find((s) => s.name === sectionName)) {
                acc.push({ name: sectionName, questions: [] });
            }
            const section = acc.find((s) => s.name === sectionName);
            if (section) {
                section.questions.push({
                    id: item.id,
                    text: item.question,
                    options: item.options || (item.type === "True/False" ? ["True", "False"] : []),
                    type: item.type.toLowerCase(),
                    image: item.hasImages ? item.question.match(/<img[^>]+src=["'](.*?)["']/)?.[1] || null : null,
                    code: item.hasCode ? item.code : null,
                    isLaTeXEnabled: item.isLaTeXEnabled,
                    hasTables: item.hasTables
                });
            }
            return acc;
        }, []).filter(section => section.name && section.questions.length > 0)
    };
    const allQuestions = testData.sections.flatMap((section, sectionIndex) =>
        section.questions.map((question, questionIndex) => ({
            ...question,
            sectionName: section.name,
            sectionIndex,
            localIndex: questionIndex,
            globalIndex: testData.sections.slice(0, sectionIndex).reduce((sum, sec) => sum + sec.questions.length, 0) + questionIndex,
        }))
    );
    const [activeSection, setActiveSection] = useState(testData.sections[0]?.name || "");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [questionStatus, setQuestionStatus] = useState({});
    const [timeLeft, setTimeLeft] = useState(3600);
    const [currentQuestionId, setCurrentQuestionId] = useState(null);
    const sectionsRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [visitedQuestions, setVisitedQuestions] = useState(new Set());

    const [counts, setCounts] = useState({
        "not-visited": allQuestions.length,
        "not-answered": 0,
        "marked-review": 0,
        answered: 0,
        "answered-marked": 0,
    });

    const [sectionCounts, setSectionCounts] = useState({});

    const getCurrentQuestion = () => {
        for (const section of testData.sections) {
            if (section.name === activeSection) {
                return section.questions[currentQuestion];
            }
        }
        return null;
    };

    const getCurrentQuestionWithSection = () => {
        return allQuestions.find((q) => q.sectionName === activeSection && q.localIndex === currentQuestion);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const scrollSections = (direction) => {
        if (sectionsRef.current) {
            const scrollAmount = 200;
            const newScrollLeft =
                direction === "left"
                    ? sectionsRef.current.scrollLeft - scrollAmount
                    : sectionsRef.current.scrollLeft + scrollAmount;

            sectionsRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            });
        }
    };

    const updateStatusAndCounts = (questionId, newStatus) => {
        const currentStatus = questionStatus[questionId];
        if (currentStatus === newStatus) return;

        setQuestionStatus((prev) => ({
            ...prev,
            [questionId]: newStatus,
        }));

        setCounts((prev) => {
            const newCounts = { ...prev };
            if (currentStatus) {
                newCounts[currentStatus] = Math.max(0, newCounts[currentStatus] - 1);
            }
            newCounts[newStatus] = (newCounts[newStatus] || 0) + 1;
            return newCounts;
        });

        const question = allQuestions.find((q) => q.id === questionId);
        if (question) {
            const sectionName = question.sectionName;
            setSectionCounts((prev) => {
                const newSectionCounts = { ...prev };
                if (!newSectionCounts[sectionName]) {
                    newSectionCounts[sectionName] = {
                        "not-visited": 0,
                        "not-answered": 0,
                        "marked-review": 0,
                        answered: 0,
                        "answered-marked": 0,
                    };
                }
                if (currentStatus) {
                    newSectionCounts[sectionName][currentStatus] = Math.max(0, newSectionCounts[sectionName][currentStatus] - 1);
                }
                newSectionCounts[sectionName][newStatus] = (newSectionCounts[sectionName][newStatus] || 0) + 1;
                return newSectionCounts;
            });
        }
    };

    const handleMarkForReview = () => {
        const currentQ = getCurrentQuestion();
        if (!currentQ) return;
        updateStatusAndCounts(currentQ.id, "marked-review");
    };

    const handleClearResponse = () => {
        const currentQ = getCurrentQuestion();
        if (!currentQ) return;

        setAnswers((prev) => {
            const newAnswers = { ...prev };
            delete newAnswers[currentQ.id];
            return newAnswers;
        });

        setSelectedAnswers((prev) => {
            const newSelectedAnswers = { ...prev };
            delete newSelectedAnswers[currentQ.id];
            return newSelectedAnswers;
        });

        updateStatusAndCounts(currentQ.id, "not-answered");
    };

    const handleNextQuestion = () => {
        const current = getCurrentQuestionWithSection();
        if (!current) return;
        if (current.globalIndex < allQuestions.length - 1) {
            const nextQuestion = allQuestions[current.globalIndex + 1];
            setActiveSection(nextQuestion.sectionName);
            setCurrentQuestion(nextQuestion.localIndex);
        }
    };

    const handlePrevQuestion = () => {
        const current = getCurrentQuestionWithSection();
        if (!current) return;
        if (current.globalIndex > 0) {
            const prevQuestion = allQuestions[current.globalIndex - 1];
            setActiveSection(prevQuestion.sectionName);
            setCurrentQuestion(prevQuestion.localIndex);
        }
    };

    useEffect(() => {
        const status = {};
        const sectionCountsInit = {};
        testData.sections.forEach((section) => {
            sectionCountsInit[section.name] = {
                "not-visited": section.questions.length,
                "not-answered": 0,
                "marked-review": 0,
                answered: 0,
                "answered-marked": 0,
            };
        });
        allQuestions.forEach((question) => {
            status[question.id] = "not-visited";
        });
        setQuestionStatus(status);
        setSectionCounts(sectionCountsInit);
        if (allQuestions.length > 0) {
            setCurrentQuestionId(allQuestions[0].id);
        }
    }, []);

    useEffect(() => {
        const currentQ = getCurrentQuestion();
        if (currentQ && currentQ.id) {
            setCurrentQuestionId(currentQ.id);
            if (questionStatus[currentQ.id] === "not-visited" && !visitedQuestions.has(currentQ.id)) {
                setVisitedQuestions((prev) => {
                    const newSet = new Set(prev);
                    newSet.add(currentQ.id);
                    return newSet;
                });
                updateStatusAndCounts(currentQ.id, "not-answered");
            }
        }
    }, [currentQuestion, activeSection]);

    useEffect(() => {
        const timer =
            timeLeft > 0 &&
            setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const handleSaveAndNext = () => {
        const currentQ = getCurrentQuestion();
        if (!currentQ) return;
        const currentSelectedAnswer = selectedAnswers[currentQ.id];
        if (!currentSelectedAnswer && currentQ.type !== "Paragraph" && currentQ.type !== "Table") {
            alert("Please choose an answer before proceeding.");
            return;
        }
        setAnswers((prev) => ({ ...prev, [currentQ.id]: currentSelectedAnswer }));
        updateStatusAndCounts(currentQ.id, "answered");
        handleNextQuestion();
    };

    const handleSaveAndMarkForReview = () => {
        const currentQ = getCurrentQuestion();
        if (!currentQ) return;
        const currentSelectedAnswer = selectedAnswers[currentQ.id];
        if (!currentSelectedAnswer && currentQ.type !== "Paragraph" && currentQ.type !== "Table") {
            alert("Please choose an answer before marking for review.");
            return;
        }
        setAnswers((prev) => ({ ...prev, [currentQ.id]: currentSelectedAnswer }));
        updateStatusAndCounts(currentQ.id, "answered-marked");
        handleNextQuestion();
    };

    const navigateToQuestion = (globalIndex) => {
        const question = allQuestions[globalIndex];
        if (!question) return;
        setActiveSection(question.sectionName);
        setCurrentQuestion(question.localIndex);
        setCurrentQuestionId(question.id);
        if (questionStatus[question.id] === "not-visited" && !visitedQuestions.has(question.id)) {
            setVisitedQuestions((prev) => {
                const newSet = new Set(prev);
                newSet.add(question.id);
                return newSet;
            });
            updateStatusAndCounts(question.id, "not-answered");
        }
    };

    useEffect(() => {
        const sectionsElement = sectionsRef.current;
        const handleScroll = () => {
            if (sectionsElement) {
                const { scrollLeft, scrollWidth, clientWidth } = sectionsElement;
                setShowLeftArrow(scrollLeft > 0);
                setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
            }
        };
        if (sectionsElement) {
            sectionsElement.addEventListener("scroll", handleScroll);
            handleScroll();
        }
        return () => {
            if (sectionsElement) {
                sectionsElement.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        const totalCounts =
            counts["not-visited"] +
            counts["not-answered"] +
            counts["marked-review"] +
            counts["answered"] +
            counts["answered-marked"];
        if (totalCounts > allQuestions.length) {
            console.warn("Count mismatch detected, fixing counts");
            const newCounts = {
                "not-visited": 0,
                "not-answered": 0,
                "marked-review": 0,
                answered: 0,
                "answered-marked": 0,
            };
            allQuestions.forEach((q) => {
                const status = questionStatus[q.id] || "not-visited";
                newCounts[status] = (newCounts[status] || 0) + 1;
            });
            setCounts(newCounts);
        }
    }, [counts, questionStatus]);

    const renderQuestionContent = (question) => {
        if (!question) return null;

        const renderOptions = () => {
            if (question.type === "mcq" || question.type === "true/false" || question.type === "table") {
                return question.options.map((option, i) => (
                    <label key={i} className="option">
                        <input
                            type="radio"
                            name={`q${question.id}`}
                            value={option}
                            checked={selectedAnswers[question.id] === option}
                            onChange={() => handleAnswerChange(question.id, option)}
                        />
                        <span className="option-text">
                            {String.fromCharCode(65 + i)}.{" "}
                            <LatexRenderer content={option} isInline={question.isLaTeXEnabled && option.startsWith("$$")} />
                        </span>
                    </label>
                ));
            } else if (question.type === "numerical") {
                return (
                    <input
                        type="number"
                        value={selectedAnswers[question.id] || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        placeholder="Enter numerical answer"
                        className="numerical-input"
                    />
                );
            } else if (question.type === "paragraph") {
                return (
                    <textarea
                        value={selectedAnswers[question.id] || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        placeholder="Enter your answer here"
                        className="paragraph-input"
                    />
                );
            }
            return null;
        };

        // Extract table HTML if exists
        const tableMatch = question.text.match(/<table[^>]*>.*?<\/table>/s);
        const hasTable = question.hasTables && tableMatch;

        return (
            <div className="question-container">
                <div className="question-text">
                    {getCurrentQuestionWithSection()?.localIndex + 1}.{" "}
                    {hasTable ? (
                        <div dangerouslySetInnerHTML={{ __html: question.text }} />
                    ) : (
                        <LatexRenderer content={question.text} isInline={question.isLaTeXEnabled && question.text.startsWith("$$")} />
                    )}
                </div>
                {question.image && (
                    <div className="question-image">
                        <img
                            src={question.image}
                            alt="Question diagram"
                            onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "inline";
                            }}
                            onLoad={(e) => {
                                e.target.nextSibling.style.display = "none";
                            }}
                        />
                        <span className="image-error" style={{ display: "none" }}>
                            Image could not be loaded
                        </span>
                    </div>
                )}
                {question.code && (
                    <div className="programming-question">
                        <pre className="code-block">
                            <code>{question.code}</code>
                        </pre>
                        {question.options && question.options.length > 0 && (
                            <div className="options" id="options-section">
                                {question.options.map((option, i) => (
                                    <label key={i} className="option">
                                        <input
                                            type="radio"
                                            name={`q${question.id}`}
                                            value={option}
                                            checked={selectedAnswers[question.id] === option}
                                            onChange={() => handleAnswerChange(question.id, option)}
                                        />
                                        <span className="option-text">
                                            {String.fromCharCode(65 + i)}. {option}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {/* Always render options for table questions */}
                {(hasTable || (!question.code && !hasTable)) && (
                    <div className="options" id="options-section">
                        {renderOptions()}
                    </div>
                )}
            </div>
        );
    };


    return (
        <>
            <Helmet>
                <title>Student Tests</title>
                <meta name="description" content="Scheduld Test - Completed Tests Details" />
            </Helmet>
        <div className="test-attempt-container">
            <div className="exam-header">
                <div className="student-header-container">
                    <div className="header-left">
                        <div className="app-brand">
                            <IoMdSchool className="app-icon" />
                            <h1>
                                Exam<span>Pro</span>
                            </h1>
                        </div>
                        <div className="exam-info">
                            <p className="user-name">
                                <span>Test Name :</span> {testData.title}
                            </p>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="user-info">
                            <PiStudentBold className="user-icon" />
                            <div>
                                <p className="user-label">CANDIDATE</p>
                                <p className="user-name">Dineshbabu JWS</p>
                            </div>
                        </div>
                        <div className="timer-display">
                            <FaClock className="timer-icon" />
                            <div>
                                <p className="timer-label">REMAINING TIME</p>
                                <p className="time-value">{formatTime(timeLeft)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-content-wrapper">
                <div className="main-content">
                    <div className="horizontal-sections-container horizontal-sections-card">
                        {showLeftArrow && (
                            <button
                                className="scroll-button left"
                                onClick={() => scrollSections("left")}
                                disabled={sectionsRef.current?.scrollLeft === 0}
                            >
                                <FaChevronLeft />
                            </button>
                        )}
                        <div className="horizontal-sections" ref={sectionsRef}>
                            {testData.sections.map((section) => (
                                <div
                                    key={section.name}
                                    className={`section-tab ${activeSection === section.name ? "active" : ""}`}
                                    onClick={() => {
                                        setActiveSection(section.name);
                                        setCurrentQuestion(0);
                                    }}
                                >
                                    <span className="section-name">{section.name}</span>
                                </div>
                            ))}
                        </div>
                        {showRightArrow && (
                            <button
                                className="scroll-button right"
                                onClick={() => scrollSections("right")}
                                disabled={
                                    sectionsRef.current &&
                                    sectionsRef.current.scrollLeft >= sectionsRef.current.scrollWidth - sectionsRef.current.clientWidth - 1
                                }
                            >
                                <FaChevronRight />
                            </button>
                        )}
                    </div>
                    <div className="test-body question-palette-card2">
                        <div className="question-area">
                            {activeSection && renderQuestionContent(getCurrentQuestion())}
                            <div className="student-actions-footer">
                                <button
                                    className={`btn save-next ${selectedAnswers[getCurrentQuestion()?.id] ? "answered-btn" : ""}`}
                                    onClick={handleSaveAndNext}
                                >
                                    <span className="btn-text">Save & Next</span>
                                </button>
                                <button className="btn save-mark" onClick={handleSaveAndMarkForReview}>
                                    <span className="btn-text">Save & Mark For Review</span>
                                </button>
                                <button className="btn clear" onClick={handleClearResponse}>
                                    <span className="btn-text">Clear</span>
                                </button>
                                <button
                                    className="btn mark-next"
                                    onClick={() => {
                                        handleMarkForReview();
                                        handleNextQuestion();
                                    }}
                                >
                                    <span className="btn-text">Mark For Review & Next</span>
                                </button>
                            </div>
                            <div className="navigation-buttons">
                                <div className="nav-left">
                                    <button
                                        className="nav-btn nav-prev"
                                        onClick={handlePrevQuestion}
                                        disabled={getCurrentQuestionWithSection()?.globalIndex === 0}
                                    >
                                        Prev
                                    </button>
                                    <button
                                        className="nav-btn nav-next"
                                        onClick={handleNextQuestion}
                                        disabled={getCurrentQuestionWithSection()?.globalIndex === allQuestions.length - 1}
                                    >
                                        Next
                                    </button>
                                </div>
                                <div className="nav-right">
                                    <button className="nav-btn nav-submit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="status-sidebar">
                    <div className="status-summary status-summary-card">
                        <h4>Overall Status</h4>
                        <div className="row status-counts justify-content-center">
                            <div className="col-6 col-md-6 status-item">
                                <span className="count-box not-visited">{counts["not-visited"]}</span>
                                <span>Not Visited</span>
                            </div>
                            <div className="col-6 col-md-6 status-item">
                                <span className="count-box not-answered">{counts["not-answered"]}</span>
                                <span>Not Answered</span>
                            </div>
                        </div>
                        <div className="row status-counts justify-content-center">
                            <div className="col-6 col-md-6 status-item">
                                <span className="count-box answered">{counts["answered"]}</span>
                                <span>Answered</span>
                            </div>
                            <div className="col-6 col-md-6 status-item">
                                <span className="count-box marked-review">{counts["marked-review"]}</span>
                                <span>Marked for Review</span>
                            </div>
                        </div>
                        <div className="row status-counts justify-content-center">
                            <div className="col-12 col-md-12 status-item">
                                <span className="count-box answered-marked">
                                    {counts["answered-marked"]}
                                </span>
                                <span>Answered & Marked for Review (will be considered for evaluation)</span>
                            </div>
                        </div>
                    </div>
                    <div className="question-palette-card">
                        <div className="ps-3">
                            <h4>Questions</h4>
                        </div>
                        {testData.sections.map((section, sectionIndex) => (
                            <div key={section.name} className="section-questions">
                                <h5 className="section-name-palette">
                                    {section.name} <span className="section-number">{section.questions.length}</span>
                                </h5>
                                <div className="section-status-indicators">
                                    <span className="status-indicator not-visited" title="Not Visited">
                                        {sectionCounts[section.name]?.["not-visited"] || 0}
                                    </span>
                                    <span className="status-indicator not-answered" title="Not Answered">
                                        {sectionCounts[section.name]?.["not-answered"] || 0}
                                    </span>
                                    <span className="status-indicator answered" title="Answered">
                                        {sectionCounts[section.name]?.["answered"] || 0}
                                    </span>
                                    <span className="status-indicator marked-review" title="Marked for Review">
                                        {sectionCounts[section.name]?.["marked-review"] || 0}
                                    </span>
                                    <span className="status-indicator answered-marked" title="Answered & Marked">
                                        {sectionCounts[section.name]?.["answered-marked"] || 0}
                                    </span>
                                </div>
                                <div className="question-buttons">
                                    {section.questions.map((question, questionIndex) => {
                                        const globalIndex =
                                            testData.sections.slice(0, sectionIndex).reduce((sum, sec) => sum + sec.questions.length, 0) +
                                            questionIndex;
                                        const isCurrent = question.id === currentQuestionId;
                                        const status = questionStatus[question.id] || "not-visited";
                                        return (
                                            <button
                                                key={question.id}
                                                className={`question-btn 
                                                ${isCurrent ? "current-question" : ""} 
                                                ${status}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigateToQuestion(globalIndex);
                                                }}
                                            >
                                                {questionIndex + 1}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};



export default TestAttempt;