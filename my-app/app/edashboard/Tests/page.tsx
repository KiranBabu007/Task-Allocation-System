"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

// Import your images here
import pythonImage from "/public/python.jpeg";
import image2 from "/public/java.jpeg";
import image3 from "/public/AI.jpeg";
import image4 from "/public/React.jpeg";
import image5 from "/public/C.jpeg";
import image6 from "/public/JS.jpeg";

interface ThreeDCardDemoProps {
  imageSource: StaticImageData;
  description: string;
  heading: string;
  testRoute: string;
}

export function ThreeDCardDemo({ imageSource, description, heading, testRoute }: ThreeDCardDemoProps) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto max-w-sm h-auto rounded-xl px-2 py-1 border ">
        <CardItem
          translateZ="50"
          className="text-lg font-bold text-neutral-600 dark:text-white"
        >
          {heading}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-xs max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={imageSource}
            height={400}
            width={500}
            className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-4">
          <Link href={testRoute}>

            <CardItem
              translateZ={20}
              as="button"
              className="px-2 py-1 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Start Test
            </CardItem>
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}

const Page = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2 text-left">Test Your Skills</h1>
      <div className="flex flex-col ">
        <div className="flex justify-between w-full">
          <ThreeDCardDemo

            imageSource={pythonImage}
            description="Prepare thoroughly and practice diligently before your test."
            heading="Python Programming"
            testRoute="/edashboard/Tests/exams/python"
          />
          <div className="mx-2"></div>
          <ThreeDCardDemo
            imageSource={image2}
            description="Java programming language test. Be prepared for various concepts and challenges."
            heading="Java Programming"
            testRoute="/edashboard"
          />
          <div className="mx-2"></div>
          <ThreeDCardDemo
            imageSource={image3}
            description="Artificial Intelligence test. Demonstrate your knowledge and problem-solving skills."
            heading="Artificial Intelligence"
            testRoute="/edashboard"
          />
        </div>
        <div className="flex flex-nowrap justify-between w-full">
          <ThreeDCardDemo
            imageSource={image4}
            description="React.js test. Showcase your proficiency in building modern web applications."
            heading="React.js"
            testRoute="/edashboard"
          />
          <div className="mx-2"></div>
          <ThreeDCardDemo
            imageSource={image5}
            description="C programming language test. Prove your understanding of low-level programming concepts."
            heading="C Programming"
            testRoute="/edashboard"
          />
          <div className="mx-2"></div>
          <ThreeDCardDemo
            imageSource={image6}
            description="JavaScript test. Evaluate your skills in this versatile programming language."
            heading="JavaScript"
            testRoute="/edashboard"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;