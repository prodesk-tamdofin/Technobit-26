"use client";

import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

const ITCPage = () => {
  return (
    <div>
      <main>
        <div className="relative flex h-[60vh] w-full max-w-[100vw] items-center justify-center overflow-hidden">
          <img
            alt="BNMPC IT Club"
            src="/itcbgbg.jpg"
            className="absolute left-0 top-0 -z-10 h-screen w-full opacity-30 blur-sm object-cover"
          />
          <h1 
            className="GradText text-center text-6xl font-black md:text-7xl 2xl:text-9xl tracking-wider"
            style={{ fontFamily: '"Times New Roman", Times, serif', letterSpacing: '0.08em' }}
          >
            BNMPC IT CLUB
          </h1>
        </div>
        <div className="tech-bg-neo pt-10">
          <div className="container-c pb-10">
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="title my-2 text-left text-primary-200/80">
                  About BNMPC IT Club
                </h2>
                <div className="w-[90vw] rounded-lg bg-gradient-to-br from-secondary-600 to-secondary-700 p-10 shadow-md md:w-[65vw] lg:w-[50vw]">
                  Welcome to BNMPC IT Club - where innovation meets excellence! 
                  We are a vibrant community of tech enthusiasts, programmers, 
                  and digital creators dedicated to pushing the boundaries of 
                  technology. Our club fosters a collaborative environment where 
                  students can explore, learn, and master various aspects of 
                  information technology. From coding workshops to hackathons, 
                  from web development to artificial intelligence, we provide 
                  a platform for every tech-savvy mind to shine and grow.
                </div>
              </div>
              <div className="self-end">
                <h2 className="title my-2 text-right text-primary-200/80">
                  Our Vision & Mission
                </h2>
                <div className="w-[90vw] self-end rounded-lg bg-secondary-600 p-10 text-left shadow-md md:w-[65vw] lg:w-[50vw]">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary-350 mb-2">Vision</h3>
                      <p>
                        To become the leading IT community that empowers students 
                        with cutting-edge technological knowledge and skills, 
                        preparing them for the digital future.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-350 mb-2">Mission</h3>
                      <p>
                        We strive to create an inclusive space where technology 
                        enthusiasts can collaborate, innovate, and transform ideas 
                        into reality through workshops, competitions, and real-world 
                        projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="title my-2 text-left text-primary-200/80">
                  What We Do
                </h2>
                <div className="w-[90vw] rounded-lg bg-gradient-to-br from-secondary-600 to-secondary-700 p-10 shadow-md md:w-[65vw] lg:w-[50vw]">
                  <ul className="ml-4 list-[circle] marker:text-primary-150 space-y-2">
                    <li>Organize technical workshops and seminars</li>
                    <li>Host coding competitions and hackathons</li>
                    <li>Conduct project showcases and tech talks</li>
                    <li>Provide mentorship and career guidance</li>
                    <li>Build innovative tech solutions for real-world problems</li>
                    <li>Foster collaboration with industry professionals</li>
                    <li>Create a network of tech enthusiasts and innovators</li>
                  </ul>
                </div>
              </div>
              <div className="self-end">
                <h2 className="title my-2 text-right text-primary-200/80">
                  Join The Revolution
                </h2>
                <div className="w-[90vw] self-end rounded-lg bg-secondary-600 p-10 text-left shadow-md md:w-[65vw] lg:w-[50vw]">
                  Whether you're a beginner taking your first steps into coding or 
                  an experienced developer looking to expand your horizons, BNMPC 
                  IT Club welcomes you! Join us in this exciting journey of 
                  technological exploration and be part of Technobit'26 - our 
                  flagship event that brings together the brightest minds in 
                  technology for an unforgettable experience of innovation, 
                  competition, and growth.
                </div>
              </div>
            </div>

            {/* Go To ITC & Join ITC Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-16 mb-6">
              <Link
                href="https://bnmpc-itc.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border-2 border-primary-200/40 bg-gradient-to-r from-primary-200/15 to-primary-150/15 text-primary-200 text-lg font-bold tracking-wider hover:bg-primary-200/25 hover:border-primary-200/70 hover:shadow-lg hover:shadow-primary-200/20 transition-all duration-300"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                Go To ITC
                <FaExternalLinkAlt className="text-sm opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
              <Link
                href="https://bnmpc-itc-recruitment.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border-2 border-secondary-400/60 bg-gradient-to-r from-secondary-500/20 to-secondary-400/15 text-secondary-200 text-lg font-bold tracking-wider hover:bg-secondary-400/30 hover:border-secondary-400 hover:shadow-lg hover:shadow-secondary-400/20 transition-all duration-300"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                JOIN ITC
                <FaExternalLinkAlt className="text-sm opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ITCPage;
