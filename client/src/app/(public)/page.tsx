"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaRegLightbulb,
  FaPalette,
  FaDownload,
  FaUser,
  FaTachometerAlt,
  FaStar,
  FaQuestionCircle,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
          Create Your Professional CV in
          <span className="text-blue-600 block mt-2">Minutes</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Stand out from the crowd with our easy-to-use and customizable CV
          Builder. Choose from beautiful templates and create your perfect CV.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          {isLoading ? (
            <div className="inline-block bg-gray-100 text-gray-400 text-lg px-8 py-3 rounded-full">
              <span className="inline-block w-5 h-5 border-2 border-t-blue-600 border-gray-200 rounded-full animate-spin mr-2 align-middle"></span>
              Loading...
            </div>
          ) : isAuthenticated ? (
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105 gap-2"
            >
              <FaTachometerAlt className="text-lg" />
              My Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center bg-white hover:bg-gray-100 text-gray-800 text-lg px-8 py-3 rounded-full border border-gray-300 shadow-lg transition transform hover:scale-105"
              >
                <FaUser className="mr-2" />
                Login
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our CV Builder?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <FaRegLightbulb className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy to Use</h3>
              <p className="text-gray-600">
                Our intuitive interface makes CV creation simple and
                straightforward. No design skills required.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <FaPalette className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Beautiful Templates</h3>
              <p className="text-gray-600">
                Choose from a variety of professional templates designed to
                impress employers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <FaDownload className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">PDF Export</h3>
              <p className="text-gray-600">
                Download your CV as a professional PDF file ready to share with
                potential employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Professional CV Templates
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Choose from our wide variety of professionally designed templates to
            make your CV stand out
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Template 1 */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-80 bg-gray-100">
                <Image
                  src="/preview-cv.png"
                  alt="Modern CV Template"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="p-5 bg-white">
                <h3 className="text-xl font-bold mb-2">Modern</h3>
                <p className="text-gray-600 mb-4">
                  Clean, minimal design with a focus on skills and experience
                </p>
                <Link
                  href="/templates"
                  className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
                >
                  Use this template
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Template 2 */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-80 bg-gray-100">
                <Image
                  src="/preview-cv.png"
                  alt="Creative CV Template"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="p-5 bg-white">
                <h3 className="text-xl font-bold mb-2">Creative</h3>
                <p className="text-gray-600 mb-4">
                  Bold design with creative elements for visual fields
                </p>
                <Link
                  href="/templates"
                  className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
                >
                  Use this template
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Template 3 */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-80 bg-gray-100">
                <Image
                  src="/preview-cv.png"
                  alt="Professional CV Template"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="p-5 bg-white">
                <h3 className="text-xl font-bold mb-2">Professional</h3>
                <p className="text-gray-600 mb-4">
                  Traditional layout perfect for corporate applications
                </p>
                <Link
                  href="/templates"
                  className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
                >
                  Use this template
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/templates"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
            >
              View All Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Trusted by Job Seekers Worldwide
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10k+</div>
              <p className="text-blue-100">CVs Created</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">350+</div>
              <p className="text-blue-100">Companies Hiring</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <p className="text-blue-100">CV Templates</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">92%</div>
              <p className="text-blue-100">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            What Our Users Say
          </h2>{" "}
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. See what our users have
            achieved with our CV builder.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
              </div>{" "}
              <p className="text-gray-600 mb-4">
                &quot;Thanks to this CV builder, I landed my dream job within
                weeks! The templates are professional and the interface is so
                easy to use.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                  JD
                </div>
                <div>
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-sm text-gray-500">Marketing Manager</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
              </div>{" "}
              <p className="text-gray-600 mb-4">
                &quot;I was struggling to create a CV that highlighted my skills
                effectively. This platform made it simple and my CV now stands
                out from the crowd.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-3">
                  AS
                </div>
                <div>
                  <h4 className="font-bold">Anna Smith</h4>
                  <p className="text-sm text-gray-500">UX Designer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
              </div>{" "}
              <p className="text-gray-600 mb-4">
                &quot;The export options are fantastic. I could download my CV
                in PDF format and send it directly to employers. Received
                compliments on the design!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold mr-3">
                  RJ
                </div>
                <div>
                  <h4 className="font-bold">Robert Johnson</h4>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Create a professional CV in just three simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Choose a Template</h3>
              <p className="text-gray-600">
                Browse our collection of professionally designed CV templates
                and select the one that best suits your style.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Fill in Your Details</h3>
              <p className="text-gray-600">
                Add your personal information, work experience, education,
                skills and other relevant details to your CV.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Download & Share</h3>
              <p className="text-gray-600">
                Export your finished CV as a PDF file, ready to be sent to
                potential employers or shared online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Find answers to commonly asked questions about our CV builder
          </p>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-semibold flex items-center">
                  <FaQuestionCircle className="text-blue-600 mr-2" />
                  Is the CV Builder free to use?
                </h3>
                <p className="mt-2 text-gray-600">
                  We offer both free and premium plans. The free plan allows you
                  to create and download basic CVs, while the premium plan
                  unlocks all templates and advanced features.
                </p>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-semibold flex items-center">
                  <FaQuestionCircle className="text-blue-600 mr-2" />
                  Can I update my CV after creating it?
                </h3>
                <p className="mt-2 text-gray-600">
                  Yes! You can update your CV at any time. Log into your
                  account, access your saved CVs, and make any necessary changes
                  before downloading again.
                </p>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-semibold flex items-center">
                  <FaQuestionCircle className="text-blue-600 mr-2" />
                  What file formats can I download my CV in?
                </h3>
                <p className="mt-2 text-gray-600">
                  We currently support PDF downloads, which is the industry
                  standard format for sharing CVs. This ensures your CV looks
                  consistent across all devices.
                </p>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-semibold flex items-center">
                  <FaQuestionCircle className="text-blue-600 mr-2" />
                  How do I know which template is right for me?
                </h3>
                <p className="mt-2 text-gray-600">
                  The best template depends on your industry and personal style.
                  We recommend modern templates for creative fields and classic
                  designs for traditional industries. You can preview your CV in
                  different templates before deciding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Professional CV?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their
            dream jobs with our CV builder
          </p>
          <Link
            href="/register"
            className="inline-flex items-center bg-white hover:bg-gray-100 text-blue-600 text-lg px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
    </>
  );
}
