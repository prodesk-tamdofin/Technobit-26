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
      answer: "Technobit'26 is the flagship tech event organized by BNMPC IT Club. It's a multi-day extravaganza featuring coding competitions, hackathons, workshops, and showcases that bring together the brightest tech minds for an unforgettable experience of innovation and growth."
    },
    {
      question: "Who can participate?",
      answer: "Students from all educational institutions are welcome to participate in Technobit'26. Whether you're a beginner or an experienced developer, there's something for everyone - from introductory workshops to advanced competitions."
    },
    {
      question: "What activities does the club organize?",
      answer: "We organize technical workshops, coding competitions, hackathons, project showcases, tech talks, mentorship programs, and industry collaboration events. Our goal is to create opportunities for students to learn, grow, and excel in technology."
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
