 import React from 'react';
import Navbar from '@/components/waitlist/layout/Navbar';
import Footer from '@/components/waitlist/layout/Footer';

const PrivacyPolicy: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

      return (
      <div className="mark-pages min-h-screen text-white mt-6" style={{ backgroundColor: 'var(--dark-bg)' }}>
        <Navbar variant="home" />
        
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[rgb(252 250 255)]">
            Mark.ai Privacy Policy
          </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            <strong>Effective Date:</strong> {currentDate}
          </p>
          
          <p className="text-gray-300 mb-6">
            Mark.ai is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our services.
          </p>
          
          <p className="text-gray-300 mb-8">
            We are a Canadian company based in Toronto, Ontario, and we comply with the Personal Information Protection and Electronic Documents Act (PIPEDA). We also aim to meet international standards such as the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA).
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li><strong>Personal Identifiers:</strong> Name, email address, company name, and contact info.</li>
              <li><strong>Marketing Content:</strong> Posts, assets, campaign data, and scheduling information.</li>
              <li><strong>Usage Data:</strong> IP address, browser type, time zone, and interaction with the platform.</li>
              <li><strong>Third-Party Integrations:</strong> Data accessed from platforms you connect (e.g., Google Calendar, Slack, Meta, X).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">We use your data to:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Provide, operate, and improve our services.</li>
              <li>Customize your experience.</li>
              <li>Communicate service updates, summaries, and insights.</li>
              <li>Analyze usage patterns and service performance.</li>
              <li>Meet legal obligations.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">3. Consent & Withdrawal</h2>
            <p className="text-gray-300">
              By using Mark.ai, you consent to the collection, use, and disclosure of your information in accordance with this Privacy Policy. You may withdraw your consent at any time by contacting us at <a href="mailto:mark@hiremark.ai" className="text-purple-400 hover:text-purple-300">mark@hiremark.ai</a>. Note that withdrawing consent may impact your ability to use some features of the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">4. Cookies & Tracking Technologies</h2>
            <p className="text-gray-300">
              We use cookies and similar tracking technologies to enhance your experience, analyze usage, and deliver personalized content. You can manage your cookie preferences through your browser settings. Blocking cookies may impact certain functionalities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">5. Sharing Your Information</h2>
            <p className="text-gray-300 mb-4">We do not sell your personal data. We may share it:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>With trusted service providers (e.g., cloud hosting, analytics, APIs), bound by confidentiality agreements.</li>
              <li>As required by law, court order, or regulatory requirement.</li>
              <li>With your consent, for specific purposes (e.g., integrations with third-party platforms).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">6. AI-Powered Services</h2>
            <p className="text-gray-300">
              Mark.ai uses AI models to generate marketing content, analyze patterns, and summarize meetings. These AI systems may process your data to provide automated outputs. While we strive for accuracy, users should review AI-generated content for correctness and suitability before publishing or acting upon it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">7. International Data Transfers</h2>
            <p className="text-gray-300">
              Your data may be stored or processed outside your country, including in the United States and other jurisdictions. We take reasonable steps to ensure appropriate safeguards are in place (e.g., contracts, data handling standards).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">8. Data Retention & Security</h2>
            <p className="text-gray-300">
              We retain personal information only as long as necessary to fulfill the purposes outlined in this policy or to comply with legal obligations. We implement industry-standard technical and organizational security measures, but no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">9. Your Rights</h2>
            <p className="text-gray-300 mb-4">Depending on your location, you may have rights to:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Access and correct your data.</li>
              <li>Request data deletion or portability.</li>
              <li>Withdraw consent to processing.</li>
              <li>File a complaint with a privacy authority.</li>
            </ul>
            <p className="text-gray-300 mt-4">
              To exercise your rights, contact us at <a href="mailto:mark@hiremark.ai" className="text-purple-400 hover:text-purple-300">mark@hiremark.ai</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">10. Data Security and Retention</h2>
            <p className="text-gray-300">
              We implement industry-standard security measures to protect your information. Data is retained only as long as necessary for business, legal, or operational reasons.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">11. Children's Privacy</h2>
            <p className="text-gray-300">
              Mark.ai is not intended for use by individuals under the age of 16. We do not knowingly collect or process personal data from children. If we discover such data, we will delete it promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">12. Updates to This Policy</h2>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time. If material changes are made, we will notify users through the platform or via email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">13. Contact Us</h2>
            <div className="text-gray-300">
              <p className="mb-2">If you have questions about this Privacy Policy, contact:</p>
              <p className="mb-1"><strong>Mark.ai Privacy Team</strong></p>
              <p className="mb-1">Toronto, Ontario, Canada</p>
              <p>Email: <a href="mailto:mark@hiremark.ai" className="text-purple-400 hover:text-purple-300">mark@hiremark.ai</a></p>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 