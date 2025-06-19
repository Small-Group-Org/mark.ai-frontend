import React from 'react';
import Navbar from '@/components/waitlist/layout/Navbar';
import Footer from '@/components/waitlist/layout/Footer';

const TermsConditions: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

      return (
      <div className="mark-pages min-h-screen text-white mt-4" style={{ backgroundColor: 'var(--dark-bg)' }}>
        <Navbar variant="home" />
        
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center text-[rgb(252 250 255)]">
            Mark.ai Terms & Conditions
          </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            <strong>Effective Date:</strong> {currentDate}
          </p>
          
          <p className="text-gray-300 mb-8">
            Welcome to Mark.ai! These Terms & Conditions ("Terms") govern your use of our website, platform, and services. By accessing or using Mark.ai, you agree to comply with these Terms and our Privacy Policy.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">1. Who We Are</h2>
            <p className="text-gray-300">
              Mark.ai is a Canadian technology company headquartered in Toronto, Ontario. We offer AI-powered tools that help users with content scheduling, strategy development, social media analytics, meeting summaries, and more.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">2. Eligibility</h2>
            <p className="text-gray-300">
              By using Mark.ai, you confirm that you are at least 18 years old or the age of majority in your jurisdiction, and have the legal capacity to enter into this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">3. Account Responsibilities</h2>
            <p className="text-gray-300 mb-4">You agree to:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Provide accurate and up-to-date information.</li>
              <li>Keep your account credentials confidential.</li>
              <li>Notify us immediately of unauthorized use.</li>
              <li>Not misuse, reverse-engineer, or disrupt the platform.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">4. User Content & AI Outputs</h2>
            <p className="text-gray-300 mb-4">
              You retain ownership of any content you upload to or create within Mark.ai. You grant us a license to use your content solely to operate and improve the service.
            </p>
            <p className="text-gray-300">
              Mark.ai uses AI tools to assist with generating content, insights, and summaries. These outputs are machine-generated and may not always be accurate or suitable. You are responsible for reviewing and validating all AI-generated content before use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">5. Payments & Subscriptions</h2>
            <p className="text-gray-300">
              Some features may require a paid subscription. Pricing, billing intervals, and refund terms will be clearly presented at the time of signup. You are responsible for keeping payment information current. Failure to pay may result in suspension or termination of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">6. Intellectual Property</h2>
            <p className="text-gray-300">
              All platform technology, branding, and content (excluding your content) is the intellectual property of Mark.ai or its licensors. You may not copy, distribute, or create derivative works without our prior written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">7. Acceptable Use</h2>
            <p className="text-gray-300 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Use the service for illegal, harmful, or fraudulent activity.</li>
              <li>Upload content that infringes on third-party rights.</li>
              <li>Bypass platform security or misuse the service.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">8. DMCA / Copyright Takedown</h2>
            <p className="text-gray-300">
              If you believe your intellectual property has been used on Mark.ai without authorization, please contact us at <a href="mailto:mark@hiremark.ai" className="text-purple-400 hover:text-purple-300">mark@hiremark.ai</a> with details. We will investigate and respond in accordance with applicable laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">9. Service Availability & Force Majeure</h2>
            <p className="text-gray-300">
              While we aim to maintain uninterrupted service, Mark.ai may experience downtime due to maintenance, outages, or events beyond our control (e.g., natural disasters, cyberattacks, governmental actions). We are not liable for any resulting damages or interruptions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">10. Disclaimers</h2>
            <p className="text-gray-300">
              Mark.ai is provided "as is" without warranties of any kind. We do not guarantee accuracy, completeness, or specific results from our services or AI-generated outputs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">11. Limitation of Liability</h2>
            <p className="text-gray-300">
              To the extent permitted by law, we are not liable for indirect, incidental, or consequential damages. Our total liability shall not exceed the fees paid by you in the past 12 months (if any).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">12. Governing Law</h2>
            <p className="text-gray-300">
              These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada. Any disputes shall be resolved in the courts of Toronto, Ontario.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">13. International Users</h2>
            <p className="text-gray-300">
              By using Mark.ai from outside Canada, you consent to having your data transferred to and processed in Canada and other applicable jurisdictions, subject to our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">14. AI Regulation Disclaimer</h2>
            <p className="text-gray-300">
              As global AI regulations evolve, Mark.ai reserves the right to update its practices and policies to remain compliant with applicable AI governance laws, including but not limited to the EU AI Act and Canada's proposed AIDA.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">15. Changes to These Terms</h2>
            <p className="text-gray-300">
              We may update these Terms occasionally. Continued use of the platform constitutes acceptance of the updated Terms. We will notify users of material changes via email or platform notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">16. Contact Us</h2>
            <div className="text-gray-300">
              <p className="mb-2">If you have any questions about these Terms or our services, contact:</p>
              <p className="mb-1"><strong>Mark.ai Legal Team</strong></p>
              <p className="mb-1">Toronto, Ontario, Canada</p>
              <p>📧 <a href="mailto:mark@hiremark.ai" className="text-purple-400 hover:text-purple-300">mark@hiremark.ai</a></p>
            </div>
          </section>
        </div>
      </div>
      
              <Footer />
    </div>
  );
};

export default TermsConditions; 