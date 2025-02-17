import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import GoBack from "../componets/GoBack";
import Sem from "../componets/sem";

const Sub = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State for courses, selected course, semesters, and selected semester
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [selectedSem, setSelectedSem] = useState(null);

  // Fetch all courses on mount
  useEffect(() => {
    axios
      .post("https://pixel-classes.onrender.com/api/home/courses")
      .then((response) => {
        console.log("Courses API Response:", response.data);
        if (
          response.data.CourseList &&
          Array.isArray(response.data.CourseList)
        ) {
          setCourses(response.data.CourseList);
          setSelectedCourse(response.data.CourseList[0]); // Default to first course
        } else {
          console.error("Invalid Course List format");
        }
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  // Fetch semester data for the selected course
  useEffect(() => {
    if (!selectedCourse) return;

    axios
      .post("https://pixel-classes.onrender.com/api/home/QuePdf/")
      .then((response) => {
        console.log("Semesters API Response:", response.data);
        if (Array.isArray(response.data)) {
          const filteredSemesters = response.data.filter(
            (item) => item.course === selectedCourse.id
          );
          console.log("Filtered Semesters:", filteredSemesters);
          setSemesters(filteredSemesters);
        } else {
          console.error("Invalid semester data format");
        }
      })
      .catch((error) => console.error("Error fetching semesters:", error));
  }, [selectedCourse]);

  // Handle semester selection (toggle)
  const handleSemesterClick = (semester) => {
    setSelectedSem(semester === selectedSem ? null : semester);
    console.log("Selected Semester:", semester);
  };

  // Function to check authentication status
  const getUsernameFromCookies = () => {
    const username = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="))
      ?.split("=")[1];

    console.log("Username:", username);
    return username || null; // Return null if not found
  };

  // Handle subject click
  const handleLinkClick = (event, item) => {
    if (!getUsernameFromCookies()) {
      console.log("User not authenticated, redirecting to login...");
      event.preventDefault();
      navigate("/login");
    } else {
      navigate(`/ns?sub=datastructure&id=${item.id}`);
    }
  };

  return (
    <div className="text-center">
      <GoBack />
      <div className="bg-white p-4 w-full">
        <h1 className="text-4xl text-left font-bold">
          {selectedCourse?.name || "Loading..."}
        </h1>
        <h2 className="text-3xl text-left font-bold">Collations</h2>
      </div>
      <p className="mt-4 text-left pl-3 text-lg">Select your subject</p>

      {/* Semester Tabs */}
      <div className="z-1 rounded-t-lg mr-2 ml-2 mt-4 bg-white">
        <div className="block shadow-[inset_0px_4px_4px_rgba(0,0,0)] rounded-t-3xl">
          <div className="ml-2 p-4 mr-2 rounded-t-lg flex overflow-x-auto gap-6 w-full min-h-[50px] whitespace-nowrap">
            {selectedCourse?.number_sem > 0 ? (
              Array.from({ length: selectedCourse.number_sem }, (_, index) => (
                <button
                  className={`px-4 py-2 rounded-md shadow-md transition-all ${
                    selectedSem === index + 1
                      ? "shadow-lg border-2 border-black"
                      : "shadow-md border border-gray-300"
                  }`}
                  key={index}
                  onClick={() => handleSemesterClick(index + 1)}
                >
                  <Sem s={index + 1} />
                </button>
              ))
            ) : (
              <p className="text-gray-500">No semesters available</p>
            )}
          </div>
        </div>

        {/* Semester Content */}
        <div className="mt-6 space-y-4 p-4 h-dvh overflow-y-auto">
          {selectedSem
            ? semesters
                .filter((item) => Number(item.sem) === Number(selectedSem))
                .map((item, index) => (
                  <div
                    key={index}
                    className="block cursor-pointer"
                    onClick={(event) => {
                      console.log("Div clicked!", item); // Debugging
                      handleLinkClick(event, item);
                    }}
                  >
                    <div className="flex items-center justify-between p-4 bg-gray-200 shadow-md rounded-lg">
                      {/* Subject Icon */}
                      <img
                        src="https://thumbs.dreamstime.com/b/data-structures-algorithms-blue-gradient-concept-icon-problem-solving-programming-skill-abstract-idea-thin-line-illustration-248447079.jpg"
                        alt="Subject Icon"
                        className="shadow-[3px_3px_0px_0px_#065f46] w-12 h-12 mr-4"
                      />

                      {/* Subject Details */}
                      <span className="text-lg font-medium">
                        {item.name || "Unknown Subject"}
                      </span>
                      <p className="text-sm text-gray-600">
                        Semester {item.sem}
                      </p>
                      <p className="text-sm text-gray-600">Div-{item.div}</p>
                      <p className="text-sm text-gray-600">Year-{item.year}</p>
                    </div>
                  </div>
                ))
            : semesters.map((item, index) => (
                <div
                  key={index}
                  className="block cursor-pointer"
                  onClick={(event) => {
                    console.log("Div clicked!", item);
                    handleLinkClick(event, item);
                  }}
                >
                  <div className="flex items-center justify-between p-4 bg-gray-200 shadow-md rounded-lg">
                    {/* Subject Icon */}
                    <img
                      src="https://thumbs.dreamstime.com/b/data-structures-algorithms-blue-gradient-concept-icon-problem-solving-programming-skill-abstract-idea-thin-line-illustration-248447079.jpg"
                      alt="Subject Icon"
                      className="shadow-[3px_3px_0px_0px_#065f46] w-12 h-12 mr-4"
                    />
  
                    {/* Subject Details */}
                    <span className="text-lg font-medium">
                      {item.name || "Unknown Subject"}
                    </span>
                    <p className="text-sm text-gray-600">Semester {item.sem}</p>
                    <p className="text-sm text-gray-600">Div-{item.div}</p>
                    <p className="text-sm text-gray-600">Year-{item.year}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Sub;
