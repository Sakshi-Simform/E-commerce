import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export interface FooterProps {
  focusOnSearch?: () => void;
  isDetailPage?: boolean;
}

export function Footer({ focusOnSearch, isDetailPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`bg-black shadow-md border-t border-gray-700 text-white px-6 py-6 w-full z-50 ${isDetailPage ? "fixed bottom-0 left-0 right-0" : "relative"
        }`}
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="max-w-[100rem] mx-auto flex flex-wrap justify-between gap-8">
        {/* Brand + Focus Button */}
        <div className="w-52 flex flex-col gap-3">
          <p className="text-3xl font-bold" role="heading" aria-level={1}>
            SmartBasket
          </p>
          {focusOnSearch && (
            <button
              onClick={focusOnSearch}
              className="text-gray-400 text-lg hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Focus on search input"
              type="button"
            >
              Focus on search
            </button>
          )}
          <button
            type="button"
            className="mt-1 px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Subscribe
          </button>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick Links" className="min-w-[150px]">
          <p className="font-semibold text-lg mb-2">Quick Links</p>
          <ul className="space-y-1 text-gray-400">
            {[
              { label: "About Us", href: "/" },
              { label: "Products", href: "#" },
              { label: "FAQ", href: "#" },
              { label: "Contact", href: "#" },
              { label: "Privacy Policy", href: "#" },
            ].map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="hover:text-white transition-colors"
                  tabIndex={0}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Info */}
        <section aria-labelledby="contact-info" className="min-w-[220px] text-gray-400">
          <p id="contact-info" className="font-semibold text-lg mb-2">
            Contact Us
          </p>
          <address className="not-italic space-y-1 mb-3">
            <a
              href="mailto:support@smartbasket.com"
              className="hover:text-white block"
              aria-label="Send email to support@smartbasket.com"
            >
              support@smartbasket.com
            </a>
            <a href="tel:+11234567890" className="hover:text-white block" aria-label="Call +1 123 456 7890">
              +1 (123) 456-7890
            </a>
            <p>123 Commerce St, City, Country</p>
          </address>
        </section>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-sm select-none">
        <div className="text-left w-full sm:w-auto mb-2 sm:mb-0">
          &copy; {currentYear} SmartBasket. All rights reserved
        </div>
        <div className="flex gap-6 text-white text-lg cursor-pointer">
          <a href="/" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition-colors">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}