import Link from "next/link";
import {
  FaCheck,
  FaRegLightbulb,
  FaPalette,
  FaDownload,
  FaUser,
} from "react-icons/fa";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";

export default function HomePage() {
  return (
    <div className="min-h-screen">
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
          <Link
            href="/register"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105"
          >
            Get Started - It&apos;s Free
          </Link>
          <Link
            href="/login"
            className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 rounded-full transition transform hover:scale-105"
          >
            Login
          </Link>
        </div>

        {/* Preview Image */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent" />
          <PlaceholderImage
            src="/preview-cv.png"
            alt="CV Builder Preview"
            width={1200}
            height={675}
            className="rounded-lg shadow-2xl mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need to Create a Stunning CV
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="text-blue-600 mb-4 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Professional CV Templates
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <PlaceholderImage
                  src={template.image}
                  alt={template.name}
                  width={400}
                  height={566}
                  className="w-full transition transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-200">
                      {template.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-gray-200 rounded-full">
                      <FaUser className="w-full h-full text-gray-400 p-2" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Professional Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who have already created their
            perfect CV
          </p>
          <Link
            href="/register"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105"
          >
            Create Your CV Now
          </Link>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: <FaRegLightbulb />,
    title: "Easy to Use",
    description:
      "Intuitive interface that guides you through the CV creation process step by step.",
  },
  {
    icon: <FaPalette />,
    title: "Beautiful Templates",
    description:
      "Choose from our collection of professionally designed templates.",
  },
  {
    icon: <FaDownload />,
    title: "Export Options",
    description: "Download your CV in PDF format, ready to send to employers.",
  },
  {
    icon: <FaCheck />,
    title: "ATS-Friendly",
    description: "Our templates are optimized for Applicant Tracking Systems.",
  },
  {
    icon: <FaPalette />,
    title: "Customizable",
    description: "Personalize colors, fonts, and layouts to match your style.",
  },
  {
    icon: <FaRegLightbulb />,
    title: "Real-time Preview",
    description: "See changes instantly as you edit your CV.",
  },
];

const templates = [
  {
    name: "Modern Professional",
    description:
      "Clean and contemporary design perfect for tech and creative roles",
    image: "/templates/modern.png",
  },
  {
    name: "Classic Elegant",
    description:
      "Traditional layout ideal for corporate and executive positions",
    image: "/templates/classic.png",
  },
  {
    name: "Minimal Creative",
    description:
      "Simple yet impactful design for standing out while staying professional",
    image: "/templates/minimal.png",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "Software Engineer",
    quote:
      "Thanks to this CV builder, I landed my dream job at a top tech company. The templates are modern and professional!",
    avatar: "/avatars/sarah.jpg",
  },
  {
    name: "Michael Chen",
    position: "Marketing Manager",
    quote:
      "The customization options are amazing. I could perfectly match my CV to my personal brand.",
    avatar: "/avatars/michael.jpg",
  },
  {
    name: "Emily Brown",
    position: "UX Designer",
    quote:
      "Creating a CV has never been easier. The interface is intuitive and the results are impressive!",
    avatar: "/avatars/emily.jpg",
  },
];
