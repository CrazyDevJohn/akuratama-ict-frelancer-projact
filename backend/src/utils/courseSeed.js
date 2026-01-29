import mongoose from "mongoose";
import "dotenv/config"
import Course from "../models/Course.js";


 const CARD_COLORS = [
  ["#b73bb1","#ef4238"],
  ["#24b6d0","#2f41e3"],
  ["#5f5682","#9c365a"],
  ["#3df759","#59cfdc"],
  ["#f73d36","#b138a8"],
]


      const courses = [
        // Grade 6
        {
          id: 1,
          grade: "grade6",
          title: "Grade 06 | Theory | January",
          description: "Introduction to computers and basic operations for Grade 6 students. Learn about computer hardware, software, and basic digital literacy.",
          price:1923,
          image: "https://i.ibb.co/LdLRgtR2/image.png",
          modules: 8,
          lessons: 24,
          duration: "6 Weeks",
          certificate: "Yes",
          features: [
            "Computer Basics & Hardware",
            "Introduction to Software",
            "File Management",
            "Internet Safety",
            "Basic Typing Skills",
            "Digital Citizenship",
          ],
          showTag: false, // Grade 6ට tag එක නෑ
        },

        // Grade 7
        {
          id: 3,
          grade: "grade7",
          title: "Grade 07 | Theory | January",
          description: "Understanding components of a computer system in depth. Explore operating systems, applications, and basic troubleshooting.",
          price:1923,
          image: "https://i.ibb.co/BVpdTGk0/image.png",
          modules: 10,
          lessons: 30,
          duration: "8 Weeks",
          certificate: "Yes",
          features: [
            "Computer Components",
            "Operating Systems",
            "Software Applications",
            "Basic Troubleshooting",
            "Network Fundamentals",
            "Data Management",
          ],
          showTag: false, // Grade 7ට tag එක නෑ
        },

        // Grade 8
        {
          id: 5,
          grade: "grade8",
          title: "Grade 08 | Theory | January",
          description: "How the internet works and safe browsing habits. Learn about web technologies, online communication, and cybersecurity basics.",
          price:1923,
          image: "https://i.ibb.co/wr6pxwfB/image.png",
          modules: 12,
          lessons: 36,
          duration: "10 Weeks",
          certificate: "Yes",
          features: [
            "Internet Fundamentals",
            "Web Browsers & Search",
            "Online Communication",
            "Cybersecurity Basics",
            "Social Media Safety",
            "Digital Footprint",
          ],
          showTag: false, // Grade 8ට tag එක නෑ
        },

        // Grade 9
        {
          id: 6,
          grade: "grade9",
          title: "Grade 09 | Theory | January",
          description: "Building logic and algorithms using flowcharts. Introduction to programming concepts and problem-solving techniques.",
          price:1923,
          image: "https://i.ibb.co/9HYft4xb/image.png",
          modules: 15,
          lessons: 45,
          duration: "12 Weeks",
          certificate: "Yes",
          features: [
            "Algorithm Design",
            "Flowchart Creation",
            "Problem Solving",
            "Programming Logic",
            "Pseudocode Writing",
            "Debugging Basics",
          ],
          showTag: false, // Grade 9ට tag එක නෑ
        },

        // Grade 10/11
        {
          id: 7,
          grade: "grade10-11",
          title: "Grade 10 | Theory Only | January",
          description: "Complete coverage of O/L syllabus with past papers. Comprehensive theory preparation for O/L ICT examination.",
          price:1923,
          image: "https://i.ibb.co/CKrWHCsp/image.png",
          modules: 18,
          lessons: 54,
          duration: "16 Weeks",
          certificate: "Yes",
          features: [
            "Full O/L Syllabus",
            "Past Paper Analysis",
            "Exam Strategies",
            "Theory Mastery",
            "Revision Techniques",
            "Mock Tests",
          ],
          showTag: false, // Grade 10/11ට දැන් tag එක නෑ (අලුතින් false කරා)
        },
        {
          id: 8,
          grade: "grade10-11",
          title: "Grade 10 | Paper Only | January",
          description: "Start coding with Python for O/L ICT. Practical programming skills for the O/L ICT practical paper.",
          price:1923,
          image: "https://i.ibb.co/F4BZ1kx9/image.png",
          modules: 12,
          lessons: 36,
          duration: "12 Weeks",
          certificate: "Yes",
          features: [
            "Python Basics",
            "Programming Logic",
            "Practical Exercises",
            "Paper Pattern",
            "Time Management",
            "Error Handling",
          ],
          showTag: false,
        },
        {
          id: 9,
          grade: "grade10-11",
          title: "Grade 10 | Theory + Paper | January",
          description: "HTML & CSS fundamentals for web design. Complete package covering both theory and practical aspects.",
          price:1923,
          image: "https://i.ibb.co/Kz3vNbsJ/image.png",
          modules: 25,
          lessons: 75,
          duration: "20 Weeks",
          certificate: "Yes",
          features: [
            "Complete Theory",
            "Practical Programming",
            "HTML & CSS",
            "Web Design Basics",
            "Full Syllabus",
            "Exam Preparation",
          ],
          showTag: false,
        },
        {
          id: 10,
          grade: "grade10-11",
          title: "Grade 11 | Theory Only | January",
          description: "Complete coverage of O/L syllabus with past papers. Advanced theory concepts for Grade 11 students.",
          price:1923,
          image: "https://i.ibb.co/XZWMz7xL/image.png",
          modules: 20,
          lessons: 60,
          duration: "18 Weeks",
          certificate: "Yes",
          features: [
            "Advanced Theory",
            "Complex Concepts",
            "Past Papers",
            "Exam Techniques",
            "Revision Plans",
            "Performance Tracking",
          ],
          showTag: false,
        },
        {
          id: 11,
          grade: "grade10-11",
          title: "Grade 11 | Paper Only | January",
          description: "Advanced Python programming for O/L ICT. Enhanced practical skills for the O/L examination.",
          price:1923,
          image: "https://i.ibb.co/XGJ8nzy/image.png",
          modules: 15,
          lessons: 45,
          duration: "14 Weeks",
          certificate: "Yes",
          features: [
            "Advanced Python",
            "Complex Programs",
            "Data Structures",
            "Problem Solving",
            "Efficiency Tips",
            "Debugging Skills",
          ],
          showTag: false,
        },
        {
          id: 12,
          grade: "grade10-11",
          title: "Grade 11 | Theory + Paper | January",
          description: "Complete package for Grade 11 ICT. Covers both advanced theory and practical programming.",
          price:1923,
          image: "https://i.ibb.co/fGKfRjbQ/image.png",
          modules: 30,
          lessons: 90,
          duration: "24 Weeks",
          certificate: "Yes",
          features: [
            "Full Grade 11 Syllabus",
            "Theory & Practical",
            "Advanced Concepts",
            "Exam Preparation",
            "Past Papers",
            "Mock Tests",
          ],
          showTag: false,
        },

        // Advanced Level
        {
          id: 13,
          grade: "al",
          title: "2026 Theory | January",
          description: "Comprehensive theory coverage for 2026 A/L batch. In-depth study of all theory components for A/L ICT.",
          price:1923         ,image: "https://i.ibb.co/VYTqpHFj/image.png",
          modules: 35,
          lessons: 105,
          duration: "30 Weeks",
          certificate: "Yes",
          features: [
            "Complete A/L Theory",
            "Advanced Concepts",
            "Case Studies",
            "Theoretical Analysis",
            "Research Methods",
            "Exam Strategies",
          ],
          showTag: true, // A/Lට පමණක් tag එක තියනවා
        },
        {
          id: 14,
          grade: "al",
          title: "2026 Paper | January",
          description: "Deep dive into computer networking concepts. Advanced practical applications and implementations.",
          price:1923         ,image: "https://i.ibb.co/zhLdZYYS/image.png",
          modules: 25,
          lessons: 75,
          duration: "22 Weeks",
          certificate: "Yes",
          features: [
            "Networking Concepts",
            "Practical Implementations",
            "Server Configuration",
            "Security Protocols",
            "Troubleshooting",
            "Advanced Programming",
          ],
          showTag: true,
        },
        {
          id: 15,
          grade: "al",
          title: "2026 Theory + Paper | January",
          description: "SQL and detailed database theory for A/L. Complete database management system concepts.",
          price:1923         ,image: "https://i.ibb.co/qLyfcdB5/image.png",
          modules: 40,
          lessons: 120,
          duration: "32 Weeks",
          certificate: "Yes",
          features: [
            "Database Theory",
            "SQL Programming",
            "DBMS Concepts",
            "Normalization",
            "Query Optimization",
            "Transaction Management",
          ],
          showTag: true,
        },
        {
          id: 16,
          grade: "al",
          title: "2026 Revision | January",
          description: "Comprehensive revision package for A/L ICT. Focus on exam preparation and time management.",
          price:1923         ,image: "https://i.ibb.co/M5Z6M6xm/image.png",
          modules: 20,
          lessons: 60,
          duration: "15 Weeks",
          certificate: "Yes",
          features: [
            "Intensive Revision",
            "Past Papers",
            "Time Management",
            "Exam Techniques",
            "Quick Recap",
            "Performance Tips",
          ],
          showTag: true,
        },
        {
          id: 17,
          grade: "al",
          title: "2027 Theory | January",
          description: "Comprehensive theory coverage for 2027 A/L batch. Updated syllabus with latest ICT trends.",
          price:1923         ,image: "https://i.ibb.co/JjhhM2mR/image.png",
          modules: 36,
          lessons: 108,
          duration: "30 Weeks",
          certificate: "Yes",
          features: [
            "Updated Syllabus",
            "Latest ICT Trends",
            "Advanced Theory",
            "Case Studies",
            "Research Papers",
            "Future Technologies",
          ],
          showTag: true,
        },
        {
          id: 18,
          grade: "al",
          title: "2027 Paper | January",
          description: "Advanced practical applications for 2027 A/L. Cutting-edge technologies and implementations.",
          price:1923         ,image: "https://i.ibb.co/QjqnR0ft/image.png",
          modules: 26,
          lessons: 78,
          duration: "22 Weeks",
          certificate: "Yes",
          features: [
            "Advanced Applications",
            "Latest Technologies",
            "Cloud Computing",
            "AI Basics",
            "IoT Concepts",
            "Cybersecurity",
          ],
          showTag: true,
        },
        {
          id: 19,
          grade: "al",
          title: "2027 Theory + Paper | January",
          description: "Complete package for 2027 A/L ICT. Both theory and practical aspects with updated content.",
          price:1923         ,image: "https://i.ibb.co/fdzmSd7V/image.png",
          modules: 45,
          lessons: 135,
          duration: "35 Weeks",
          certificate: "Yes",
          features: [
            "Complete Package",
            "Updated Content",
            "Theory & Practical",
            "Exam Focus",
            "Latest Trends",
            "Future Readiness",
          ],
          showTag: true,
        },
      ];

const coloredCards = courses.map(c => {
  const index = Math.floor(Math.random() * CARD_COLORS.length);
  return ({
    ...c,
    image: `linear-gradient(135deg,${CARD_COLORS[index][0]},${CARD_COLORS[index][1]})`
  })
})

const seeding = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);

        await Course.create(coloredCards);
        console.log("All data successfully deleted!");
    } catch (error) {
        console.log(error)
        
    }
}

seeding()