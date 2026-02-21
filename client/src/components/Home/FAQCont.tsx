import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import FAQ from "./FAQ";

const FAQCont = async () => {
  const aboutContent = [
    {
      question: "What is BNMPC IT Club?",
      answer: "BNMPC IT Club is a vibrant community of tech enthusiasts, programmers, and digital creators dedicated to pushing the boundaries of technology. We foster innovation, learning, and collaboration among students passionate about information technology."
    },
    {
      question: "What is Technobit'26?",
      answer: "Technobit'26 is a flagship annual tech event organized by BNMPC IT Club. It is a multi-day celebration featuring coding competitions, quiz bowls, gaming tournaments, creative showcases, and more — bringing together the brightest tech minds for an unforgettable experience of innovation and growth."
    },
    {
      question: "Who can participate?",
      answer: "Students of Birshreshtha Noor Mohammad Public College (BNMPC) are eligible to participate in all events. Students of Birshreshtha Munshi Abdur Rouf Public College (BMARPC) are eligible for all gaming segments (eFootball, PUBG Mobile, Free Fire, Chess) and Crack the Code. All participants must be currently enrolled students of their respective institution."
    },
    {
      question: "What activities does the club organize?",
      answer: "We organize technical workshops, coding competitions, quiz events, gaming tournaments, creative challenges, project showcases, and tech talks. Our goal is to create meaningful opportunities for students to learn, grow, and excel in the world of technology."
    },
  ];
  
  return (
    <section id="about-club" className="h-fit flex-1 pb-16 text-center">
      <div className="container-c">
        <h1 className="title title-top mx-auto mb-5">
          <BsInfoCircle className="text-primary mr-3 inline h-8 w-8 align-top text-primary-300 md:h-10 md:w-10" />
          <span className="text-center">About BNMPC IT Club</span>
        </h1>
      </div>
      <FAQ FAQS={aboutContent} />
    </section>
  );
};

export default FAQCont;
