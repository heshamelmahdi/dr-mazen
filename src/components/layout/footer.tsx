export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-emerald-800 tracking-wider uppercase">
              About
            </h3>
            <p className="mt-4 text-base text-gray-500">
              Nutri-Nations's nutrition program provides personalized guidance and
              resources to help you achieve your health and wellness goals.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-emerald-800 tracking-wider uppercase">
              Contact
            </h3>
            <p className="mt-4 text-base text-gray-500">
              For any questions or support, please contact us at:
              <br />
              <a
                href="mailto:support@nutri-nations.com"
                className="text-emerald-600 hover:text-emerald-500"
              >
                support@nutri-nations.com
              </a>
            </p>
          </div>
          {/* <div>
            <h3 className="text-sm font-semibold text-emerald-800 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="/privacy"
                  className="text-base text-gray-500 hover:text-gray-700"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-base text-gray-500 hover:text-gray-700"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8">
          <p className="text-base text-gray-400 text-center">
            Site by <a href="https://www.whispyrai.com" target="_blank" className="underline hover:text-emerald-500">Whispyr AI</a>  © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
} 