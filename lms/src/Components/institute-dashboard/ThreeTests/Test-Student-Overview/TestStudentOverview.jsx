import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import'./TestStudentOverview.css'
import ScoreDetails from "./ScoreDetails/ScoreDetails";
import IndividualPerformance from "./IndividualPerformance/IndividualPerformance";
import RelativePerformance from "./RelativePerformance/RelativePerformance";
import SectionwiseAnalysis from "./SectionwiseAnalysis/SectionwiseAnalysis";

import QuestionwiseRanking from "./QuestionwiseRanking/QuestionwiseRanking";
import Header from "../../../header/header";
import { Helmet } from "react-helmet";

const TestStudentOverview = () => {
    const { studentId, testId } = useParams();

    // Sample data - in a real app, you would fetch this based on the IDs
    const studentData = {
        id: studentId,
        name: `Student ${studentId}`,
        testId: testId,
        score: 85,
        percentage: 92.5,
        attempts: 45,
        correct: 40,
        wrong: 5
    };

    return (
        <>
            <Helmet>
                <title>Student Performance</title>
                <meta name="description" content="Scheduld Test , Ongoing,Upcomming , Completed" />
            </Helmet>
            <Header />
        <div className="student-test-overview">
            <ScoreDetails />
            <IndividualPerformance />
            <RelativePerformance />
            <SectionwiseAnalysis />
      <QuestionwiseRanking />
            
        </div>
        </>
    );
};

export default TestStudentOverview;