import React from 'react';
import { FiHeart, FiShield, FiTruck, FiUsers } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Disclaimer Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-lg">
        <div className="flex">
          <div className="flex-1">
            <p className="text-sm text-blue-700">
              <strong>Educational Project Notice:</strong> This is a mock e-commerce project created for learning purposes. 
              The store, products, and information presented are not real and are used to demonstrate web development skills 
              using the MERN stack (MongoDB, Express.js, React, Node.js). The images, prices, and company details are fictional.
            </p>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-secondary mb-4">About Our Plant Shop</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're passionate about bringing the beauty and benefits of plants into your home.
          Our carefully curated collection of plants helps create healthier, happier spaces.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-semibold text-secondary mb-6">Our Mission</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Plant Shop, we believe that everyone deserves to experience the joy of nurturing plants.
              Our mission is to make plant parenthood accessible, educational, and enjoyable for everyone,
              from beginners to experienced gardeners.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We're committed to providing high-quality, ethically sourced plants and exceptional customer
              service to help you create your perfect indoor jungle.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold mb-2">Plants Sold</h3>
              <p className="text-3xl font-bold text-primary">5000+</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold mb-2">Happy Customers</h3>
              <p className="text-3xl font-bold text-primary">2000+</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold mb-2">Plant Species</h3>
              <p className="text-3xl font-bold text-primary">100+</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold mb-2">Years Active</h3>
              <p className="text-3xl font-bold text-primary">5+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <FiHeart className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Plant Care Expertise</h3>
          <p className="text-gray-600 text-sm">
            Expert advice and care tips for every plant we sell
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <FiShield className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Quality Guarantee</h3>
          <p className="text-gray-600 text-sm">
            All plants backed by our health guarantee
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <FiTruck className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Safe Shipping</h3>
          <p className="text-gray-600 text-sm">
            Carefully packaged and safely delivered
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <FiUsers className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Customer Support</h3>
          <p className="text-gray-600 text-sm">
            Dedicated support for all your plant needs
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-semibold text-secondary mb-6">Our Team</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Our team of plant enthusiasts and horticulture experts is dedicated to helping you find
          the perfect plants for your space and providing the knowledge you need to help them thrive.
        </p>
        <p className="text-gray-700 leading-relaxed">
          With combined experience of over 20 years in plant care and cultivation, we're here to share
          our passion and expertise with you.
        </p>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-secondary mb-6">Visit Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Store Hours</h3>
            <ul className="text-gray-700 space-y-2">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 5:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Contact Information</h3>
            <ul className="text-gray-700 space-y-2">
              <li>Email: hello@plantshop.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Green Street, Plant City, PC 12345</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;