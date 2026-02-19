export const metadata = {
  title: "Terms & Conditions | Technobit'26",
  description: "Terms and Conditions for Technobit'26 - BNMPC IT Club",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By registering for or participating in Technobit'26 (hereinafter referred to as "the Event"), organized by BNMPC IT Club (hereinafter referred to as "the Organizer"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not register for or participate in the Event.`,
  },
  {
    title: "2. Eligibility",
    content: `Participation in Technobit'26 is open to students currently enrolled in recognized educational institutions. Participants must provide accurate and truthful information during registration. The Organizer reserves the right to disqualify any participant found providing false information. Each participant may register only once. Duplicate registrations will be cancelled without notice.`,
  },
  {
    title: "3. Registration",
    content: `Registration must be completed through the official Technobit'26 website. Participants are responsible for maintaining the confidentiality of their login credentials. The Organizer is not responsible for any unauthorized access to a participant's account. Registrations are personal and non-transferable. A valid email address is required for registration and all event communications.`,
  },
  {
    title: "4. Event Participation Rules",
    content: `Participants must comply with all event-specific rules announced for each segment. All work submitted must be original and created solely by the participating individual or team. Plagiarism, copying, or any form of academic dishonesty will result in immediate disqualification. Participants must not engage in any activity that disrupts the smooth conduct of the event. Teams must consist of the specified number of members as required by the event rules.`,
  },
  {
    title: "5. Code of Conduct",
    content: `All participants are expected to maintain professional and respectful behavior throughout the event. Harassment, bullying, discrimination, or any form of inappropriate conduct towards other participants, organizers, or volunteers will result in immediate disqualification and possible reporting to relevant authorities. Use of offensive language, both in submissions and communications, is strictly prohibited. Participants must not attempt to deceive, cheat, or manipulate the event system or judging process in any manner.`,
  },
  {
    title: "6. Fees and Payments",
    content: `Registration fees, where applicable, are non-refundable unless the event is cancelled by the Organizer. Payment must be completed as instructed during the registration process. The Organizer reserves the right to change event fees with reasonable notice. Disputed payments must be reported within 48 hours of the transaction.`,
  },
  {
    title: "7. Intellectual Property",
    content: `Participants retain ownership of all original content submitted during the event. By submitting work, participants grant the Organizer a non-exclusive, royalty-free license to use, reproduce, and showcase the submissions for promotional and educational purposes, with appropriate attribution. Participants warrant that their submissions do not infringe upon any third-party intellectual property rights. The Organizer's name, logo, and branding materials are protected and may not be used without prior written permission.`,
  },
  {
    title: "8. Privacy and Data Protection",
    content: `Personal information collected during registration will be used solely for event administration, communication, and result announcements. The Organizer will not sell, trade, or otherwise transfer personal data to third parties without consent, except as required by law. Participants' contact details may be used to send event-related notifications and updates. By registering, participants consent to being photographed or filmed for event documentation and promotional purposes.`,
  },
  {
    title: "9. Judging and Results",
    content: `All judging decisions are final and binding. Participants may not challenge or appeal the judges' decisions. The Organizer reserves the right to modify judging criteria, award values, or categories at its sole discretion. In the event of a tie, the judges' decision will be final. Prize distribution will follow the schedule announced by the Organizer.`,
  },
  {
    title: "10. Disqualification",
    content: `The Organizer reserves the right to disqualify any participant for violation of these Terms and Conditions, unsportsmanlike behavior, technical tampering, submission of plagiarized work, use of prohibited tools or resources, or any other conduct deemed inappropriate by the Organizer. Disqualified participants will not be eligible for prizes and will forfeit any registration fees paid.`,
  },
  {
    title: "11. Liability Disclaimer",
    content: `The Organizer shall not be held liable for any technical failures, internet disruptions, or third-party service outages that may affect participation. Participants assume full responsibility for their participation, including any technical risks. The Organizer is not responsible for any loss, damage, or injury arising from participation in the event. Force majeure events that prevent the conduct of the event will not entitle participants to any refunds or compensation.`,
  },
  {
    title: "12. Modifications to Terms",
    content: `The Organizer reserves the right to modify these Terms and Conditions at any time. Participants will be notified of significant changes via email or official announcements on the website. Continued participation after such changes constitutes acceptance of the modified terms.`,
  },
  {
    title: "13. Governing Law",
    content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of the People's Republic of Bangladesh. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Dhaka, Bangladesh.`,
  },
  {
    title: "14. Contact",
    content: `For any queries regarding these Terms and Conditions, please contact us at bnmpc.itc@gmail.com or reach us through our official Facebook page at https://www.facebook.com/bnmpc.itc. Our address is Birshreshtha Noor Mohammad Public College, Peelkhana, Dhaka 1209.`,
  },
];

export default function TermsPage() {
  return (
    <main className="max-w-screen bg-primary-900 relative overflow-hidden text-primary-200">
      <section className="container-c mb-32 mt-36 min-h-screen w-full antialiased">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="GradText mb-4 text-5xl font-black md:text-6xl">
              Terms &amp; Conditions
            </h1>
            <p className="text-white/60 text-lg">
              Technobit&apos;26 &mdash; BNMPC IT Club
            </p>
            <p className="mt-2 text-sm text-white/40">
              Last updated: March 2026
            </p>
            <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-primary-350 to-transparent" />
          </div>

          {/* Intro */}
          <div className="mb-10 rounded-2xl border border-primary-350/20 bg-gradient-to-br from-secondary-700/40 to-secondary-600/20 p-6 text-white/70 leading-relaxed">
            <p>
              Welcome to Technobit&apos;26. Please read these Terms and Conditions
              carefully before registering for or participating in any event. These
              terms govern your use of the Technobit&apos;26 platform and your
              participation in any events organized by <strong className="text-primary-200">BNMPC IT Club</strong>.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className="rounded-2xl border border-primary-150/10 bg-gradient-to-br from-secondary-700/30 to-secondary-600/10 p-6 transition hover:border-primary-350/25"
              >
                <h2 className="mb-3 text-xl font-bold text-primary-200">
                  {section.title}
                </h2>
                <p className="text-white/65 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 text-center">
            <div className="mx-auto mb-6 h-px w-32 bg-gradient-to-r from-transparent via-primary-350 to-transparent" />
            <p className="text-white/50 text-sm">
              By registering for Technobit&apos;26, you acknowledge that you have read,
              understood, and agreed to these Terms and Conditions.
            </p>
            <p className="mt-2 text-white/40 text-sm">
              &copy; 2026 BNMPC IT Club. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
