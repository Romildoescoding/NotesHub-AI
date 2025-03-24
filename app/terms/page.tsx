import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar";

const TermsAndConditions = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions | NoteCraft AI</title>
        <meta
          name="description"
          content="Read the terms and conditions for using NoteCraft AI."
        />
      </Head>
      <div className="container relative max-w-[95vw] min-[600px]:max-w-[75vw] mx-auto mt-24 px-4 py-10">
        <DashboardNavbar />
        <h1 className="text-3xl font-semibold mb-6">Terms and Conditions</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to NoteCraft AI! These Terms and Conditions ({'"Terms"'})
            govern your use of the NoteCraft AI platform ({'"Service"'}). By
            accessing or using our Service, you agree to comply with and be
            bound by these Terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">2. User Accounts</h2>
          <p>
            To access certain features, you must create an account. You are
            responsible for maintaining the confidentiality of your account
            credentials and for all activities conducted under your account.
            NoteCraft AI does not have access to your password. Do not share
            your password with anyone claiming to be a representative of
            NoteCraft AI.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">3. Acceptable Use</h2>
          <span>
            You agree not to use NoteCraft AI for any unlawful or harmful
            purposes, including but not limited to:
          </span>
          <ul className="list-disc pl-5">
            <li>
              Disrupting or interfering with the functionality of the Service.
            </li>
            <li>
              Engaging in any activity that violates intellectual property
              rights.
            </li>
            <li>
              Attempting to gain unauthorized access to NoteCraft AI{"'"}s
              infrastructure or data.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
          <p>
            All content, features, and functionality available on NoteCraft AI,
            including but not limited to text, graphics, logos, and software,
            are the property of NoteCraft AI or its content suppliers and are
            protected under applicable intellectual property laws.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">5. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to
            NoteCraft AI at our discretion, without notice, if we determine that
            you have violated these Terms or engaged in activities harmful to
            the platform or other users.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
          <p>
            The Service is provided {'"as is"'} without warranties of any kind.
            NoteCraft AI shall not be liable for any direct, indirect,
            incidental, or consequential damages resulting from the use or
            inability to use the Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">7. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            Service after changes have been made constitutes acceptance of the
            updated Terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">8. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of India. Any disputes arising from these Terms shall be
            subject to the exclusive jurisdiction of Indian courts.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">9. Academic Integrity</h2>
          <p>
            By using NoteCraft AI, you acknowledge that the platform is intended
            to assist with productivity and learning. Users are responsible for
            ensuring that their use of the Service complies with their
            institution{"'"}s academic policies. NoteCraft AI is not liable for
            any academic misconduct resulting from misuse of the platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">
            10. Privacy and Data Security
          </h2>
          <p>
            We value your privacy. Our Privacy Policy outlines how we collect,
            use, and protect your data. By using NoteCraft AI, you consent to
            the collection and use of your information in accordance with our
            Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">11. Contact Us</h2>
          <p>
            For questions or concerns, please contact us at{" "}
            <a href="mailto:romil4business@gmail.com" className=" underline">
              romil4business@gmail.com
            </a>
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
