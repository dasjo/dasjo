import React from 'react';
import IndexLayout from '../layouts';
import ContactForm from '../components/contact/ContactForm';

const ContactPage = () => (
  <IndexLayout pageTitle="Contact">
  <div className="row">
      <section>
        <h1>Contact</h1>
        <ContactForm />
      </section>
    </div>
  </IndexLayout>
);

export default ContactPage;
