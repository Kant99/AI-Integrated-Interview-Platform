import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1">
            <Link to="/" className="text-xl font-bold text-blue-600">
              MockInterview.ai
            </Link>
            <p className="mt-4 text-gray-600">
              Helping job seekers ace their interviews with AI-powered practice and feedback.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/#features" className="text-gray-600 hover:text-blue-600">Features</Link></li>
              <li><Link to="/#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</Link></li>
              <li><Link to="/#pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-600 hover:text-blue-600">Cookie Policy</Link></li>
              <li><Link to="/accessibility" className="text-gray-600 hover:text-blue-600">Accessibility</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <a href="mailto:support@mockinterview.ai" className="text-gray-600 hover:text-blue-600">
                  support@mockinterview.ai
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <a href="tel:+1-800-123-4567" className="text-gray-600 hover:text-blue-600">
                  +1-800-123-4567
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">123 Interview St, San Francisco, CA 94103</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {currentYear} MOCKINTERVIEW.AI. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm text-gray-500 hover:text-blue-600">
              Terms Of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
