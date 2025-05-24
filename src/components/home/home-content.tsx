"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-background.jpg" 
            alt="Fresh vegetables and fruits" 
            fill 
            className="object-cover opacity-20"
            priority
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6">
            Transform Your Nutrition Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover personalized nutrition plans, delicious recipes, and expert guidance tailored to your health goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-full text-lg"
              asChild
            >
              <Link href="/program">Start Your Journey</Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 rounded-full text-lg"
              asChild
            >
              <Link href="/recipes">Explore Recipes</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Main Navigation Buttons */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-green-700 mb-12">
            Explore Your Nutrition Program
          </h2>
          
          <div className="grid grid-cols-3 gap-8">
            {/* Program Button */}
            <NavigationCard 
              title="Program Explanation" 
              description="Learn the fundamentals of nutrition through our educational videos"
              imageSrc="/images/program-icon.jpg"
              href="/program"
            />
            
            {/* Recipes Button */}
            <NavigationCard 
              title="Recipes" 
              description="Discover healthy and delicious recipes for your nutrition plan"
              imageSrc="/images/recipes-icon.jpg"
              href="/recipes"
            />
            
            {/* Q&A Button */}
            <NavigationCard 
              title="Q&A" 
              description="Find answers to common questions about nutrition and health"
              imageSrc="/images/qa-icon.jpg"
              href="/qna"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-green-700 mb-4">
            Features of Your Nutrition Program
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Designed to support your health journey with expert guidance and practical tools
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon="🎓"
              title="Educational Content"
              description="Learn at your own pace with our structured program and track your progress"
            />
            <FeatureCard 
              icon="🍲"
              title="Healthy Recipes"
              description="Browse a diverse collection of nutritious recipes with detailed nutritional information"
            />
            <FeatureCard 
              icon="❓"
              title="Expert Answers"
              description="Get personalized answers to your nutrition questions from our expert team"
            />
            <FeatureCard 
              icon="📱"
              title="Accessible Anywhere"
              description="Access your nutrition program on any device, anytime, anywhere"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-green-700 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Success stories from people who have transformed their lives through our nutrition programs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="This program completely changed my relationship with food. I've lost 15kg and feel amazing!"
              name="Sarah M."
              role="Program Member, 6 months"
              imageSrc="/images/testimonial-2.jpg"
            />
            <TestimonialCard
              quote="The recipes are delicious and so easy to follow. My whole family enjoys them now."
              name="Ahmed K."
              role="Program Member, 4 months"
              imageSrc="/images/testimonial-1.jpg"
            />
            <TestimonialCard
              quote="The personalized guidance helped me manage my diabetes naturally. Truly life-changing."
              name="Maged R."
              role="Program Member, 1 year"
              imageSrc="/images/testimonial-3.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Join our nutrition program today and start your journey toward better health and wellness.
          </p>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-full text-lg"
            asChild
          >
            <Link href="/program">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

interface NavigationCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}

function NavigationCard({ title, description, imageSrc, href }: NavigationCardProps) {
  // Simplified title for mobile
  const mobileTitle = title === "Program Explanation" ? "Program" : title;
  
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden h-full"
    >
      <Link href={href} className="block h-full">
        <div className="h-24 md:h-48 relative">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            className="object-cover"
          />
        </div>
        <div className="md:p-6 max-md:flex max-md:justify-center">
          <h3 className="text-xl md:text-xl font-semibold text-green-700 mb-2 md:pl-0 pl-0 text-left md:text-left">
            <span className="md:hidden text-base">{mobileTitle}</span>
            <span className="hidden md:inline">{title}</span>
          </h3>
          <p className="text-gray-600 hidden md:block">{description}</p>
          <div className="mt-4 flex justify-end">
            <span className="text-green-600 font-medium flex items-center">
              <span className="md:inline hidden">Explore</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 hidden md:block" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-lg shadow-sm h-full"
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-green-700 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
}

function TestimonialCard({ quote, name, role, imageSrc }: TestimonialCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col"
    >
      <div className="flex-grow">
        <svg className="h-8 w-8 text-green-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-gray-700 mb-4 italic">"{quote}"</p>
      </div>
      <div className="flex items-center mt-4">
        {/* <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
          <Image 
            src={imageSrc} 
            alt={name} 
            width={40} 
            height={40} 
            className="object-cover"
          />
        </div> */}
        <div>
          <p className="font-medium text-green-700">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </motion.div>
  );
} 