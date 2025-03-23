import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | NoteCraft AI</title>
        <meta
          name="description"
          content="Read the privacy policy for using NoteCraft AI."
        />
      </Head>
      <div className="container relative max-w-[75vw] mx-auto mt-24 px-4 py-10">
        <DashboardNavbar />
        <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p>
            At NoteCraft AI, we respect your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, and safeguard your data when using our
            platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">2. Information We Collect</h2>
          <p>
            We may collect personal and non-personal information, including but
            not limited to:
          </p>
          <ul className="list-disc pl-5">
            <li>Your name, email address, and account details.</li>
            <li>Usage data and interactions with our platform.</li>
            <li>Technical data such as IP address and browser type.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">
            3. How We Use Your Information
          </h2>
          <p>We use collected data to:</p>
          <ul className="list-disc pl-5">
            <li>Provide and improve NoteCraft AI’s services.</li>
            <li>Personalize user experience and customer support.</li>
            <li>Ensure security and prevent fraudulent activities.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">
            4. Data Sharing and Security
          </h2>
          <p>
            We do not sell or rent your personal data. Your information is
            stored securely and accessed only for necessary service-related
            purposes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">5. Cookies and Tracking</h2>
          <p>
            We may use cookies and similar technologies to improve user
            experience and track site usage. You can manage cookie settings
            through your browser.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">6. Third-Party Services</h2>
          <p>
            We may use third-party services for analytics and hosting. These
            services have their own privacy policies governing data handling.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">7. Your Rights</h2>
          <p>
            You have the right to access, modify, or request deletion of your
            personal data. Contact us for any such requests.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">
            8. Changes to Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy periodically. Continued use of
            NoteCraft AI after changes indicates acceptance of the new policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">9. Contact Us</h2>
          <p>
            For questions or concerns, please contact us at{" "}
            <a href="mailto:romil4business@gmail.com" className="underline">
              romil4business@gmail.com
            </a>
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
