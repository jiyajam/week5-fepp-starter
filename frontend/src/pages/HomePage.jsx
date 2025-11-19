import JobListing from "../components/JobListing";
import { useEffect, useState } from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/jobs");
        const data = await response.json();
        setJobs(data); // update the jobs state
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs(); // Run when page loads
  }, []); // Empty array = run only once

  return (
    <div className="home">
      <div className="job-list">
        {jobs.length === 0 && <p>No jobs found</p>}
        {jobs.length !== 0 &&
          jobs.map((job) => <JobListing key={job._id} {...job} />)}
      </div>
    </div>
  );
};

export default Home;
