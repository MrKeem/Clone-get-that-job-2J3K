import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FindThatJobSideBar from "@/components/ProfessionalSideBar/FindThatJobSideBar";
import NavigateLine from "../images/job-detail-page/navigate-line.svg";
import CategoryIcon from "../images/job-detail-page/category-icon.svg";
import DollarSign from "../images/job-detail-page/dollarsign.svg";
import CalendarIcon from "../images/job-detail-page/calendar.svg";
import TimeIcon from "../images/job-detail-page/time.svg";
import ArrowLeft from "../images/job-detail-page/arrow-left-black.svg";
import followIcon from "@/images/getthatjob-page/followIcon.svg";
import pinkFollowIcon from "@/images/getthatjob-page/pinkFollowIcon.svg";
import moment from "moment";

moment().format();

function JobDetail() {
  const navigate = useNavigate();
  const [jobDetail, setJobDetail] = useState([]);
  const [companyFollowIds, setCompanyFollowIds] = useState([]);
  const { job_id } = useParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getJobDetail = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/jobs/${job_id}`);
      console.log(result.data.data);
      setJobDetail(result.data.data);
    } catch (error) {
      console.error(
        "Error: Failed to fetch job data for job_id:",
        job_id,
        error
      );
    }
  };

  useEffect(() => {
    getJobDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job_id]);

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/user/findthatjob");
  };

  const handleJobApplication = (event) => {
    event.preventDefault();
    navigate(`/user/jobs/apply/${job_id}`);
  };

  const createdAt = moment(jobDetail.opened_at).fromNow();

  const getCompanyFollow = async () => {
    try {
      const results = await axios.get(
        `http://localhost:4000/following/companyinfo`
      );
      const companyFollowIds = results.data.data.map((obj) => {
        return obj.recruiter_id;
      });
      setCompanyFollowIds(companyFollowIds);
    } catch (error) {
      console.error("Error: Failed to fetch company following", error);
    }
  };

  const followButton = (recruiterId) => {
    const isFollowing = companyFollowIds.includes(recruiterId);
    if (isFollowing) {
      return (
        <button className="flex flex-row">
          <div className="mx-1">
            <img src={pinkFollowIcon} />
          </div>
          <div className="pt-2 font-Inter">
            <button
              value={recruiterId}
              onClick={(event) => {
                handleUnfollow(event.target.value);
              }}
            >
              FOLLOWING
            </button>
          </div>
        </button>
      );
    } else {
      return (
        <button className="flex flex-row pr-4">
          <div className="mx-0">
            <img src={followIcon} />
          </div>
          <div className="pt-2 font-Inter">
            <button
              value={recruiterId}
              onClick={(event) => {
                handleFollow(event.target.value);
              }}
            >
              FOLLOW
            </button>
          </div>
        </button>
      );
    }
  };

  // FOLLOW LOGIC
  const handleFollow = async (event) => {
    const recruiterId = event;
    try {
      const data = {
        recruiterId: recruiterId,
      };
      await axios.post("http://localhost:4000/following/followcompany", data);
    } catch (error) {
      console.error("Error: unable to follow the company", error);
    }
    getCompanyFollow();
  };

  // UNFOLLOW LOGIC
  const handleUnfollow = async (event) => {
    const recruiterId = event;
    try {
      const data = {
        recruiterId: recruiterId,
      };
      await axios.post("http://localhost:4000/following/unfollowcompany", data);
    } catch (error) {
      console.error("Error: unable to unfollow the company", error);
    }
    getCompanyFollow();
  };

  useEffect(() => {
    getCompanyFollow();
  }, []);

  return (
    <>
      <div className="bg-Background min-h-screen overflow-x-hidden">
        <div className="flex flex-row font-Inter text-[16px]">
          <FindThatJobSideBar />

          <div className="ml-[350px] mt-[32px] wrapper overflow-x-auto">
            {/* BackButton */}
            <div className="flex flex-row">
              <img src={ArrowLeft} alt="arrow-left-black-icon" />
              <p className="uppercase cursor-pointer" onClick={handleBack}>
                Back
              </p>
            </div>

            {/* Section 1: Company Logo / Info / Apply Button1 */}
            <div className="mt-[16px]">
              <div className="flex flex-row">
                <div className="flex flex-row">
                  <div className="w-[74px] h-[74px] flex shrink-0 bg-white rounded-[8px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
                    <img src={jobDetail.company_logo} />
                  </div>
                  <div className="ml-[16px] flex flex-col">
                    <div className="font-Montserrat text-[24px] text-DarkGray font-normal leading-normal">
                      {jobDetail.company_name}
                    </div>
                    <div className="text-Gray hover:text-Pink">
                      {followButton(jobDetail.recruiter_id)}
                    </div>
                  </div>
                </div>
                <button className="ml-[500px] hover:bg-LightPink active:bg-DarkPink pt-4 justify-center flex flex-row text-white font-[500px] tracking-[1.25px] leading-[24px] rounded-2xl w-[173px] h-[56px] bg-Pink uppercase">
                  <img src={NavigateLine} alt="navigate-line" />
                  <div className="ml-[4px]" onClick={handleJobApplication}>
                    Apply now
                  </div>
                </button>
              </div>
            </div>

            {/*Job Title*/}
            <h1 className="text-[48px] mt-[16px] text-center font-Montserrat font-normal leading-normal">
              {jobDetail.job_title}
            </h1>

            {/* created at */}
            <div className="flex flex-row uppercase justify-center">
              <img src={TimeIcon} alt="time-icon" />
              <p className="ml-[4px] mr-[4px] text-[10px] text-Gray font-normal tracking-[1.5px] leading-normal">
                Posted {createdAt}
              </p>
            </div>

            {/* Job Highlight */}

            {/* Job Category */}
            <div className="mt-[16px] font-Montserrat flex flex-row justify-center">
              <div className="w-[281px] h-[77px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] border-DarkPink border-[1px] bg-white rounded-lg flex flex-col justify-center items-center">
                <div className="font-normal not-italic tracking-[0.15px]">
                  Category
                </div>
                <div className="flex flex-row items-center text-scale-[24px] not-italic font-normal leading-normal text-ellipsis">
                  <img
                    className="mr-[4px]"
                    src={CategoryIcon}
                    alt="category-icon"
                  />
                  <div>{jobDetail.category_name}</div>
                </div>
              </div>

              {/* Job Type */}
              <div className="ml-[32px] w-[281px] h-[77px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] border-DarkPink border-[1px] bg-white rounded-lg flex flex-col justify-center items-center">
                <div className="font-normal not-italic tracking-[0.15px]">
                  Type
                </div>
                <div className="flex flex-row items-center  text-[24px] not-italic font-normal leading-normal">
                  <img
                    className="mr-[4px]"
                    src={CalendarIcon}
                    alt="calendar-icon"
                  />
                  <div>{jobDetail.type_name}</div>
                </div>
              </div>

              {/* Job Salary */}
              <div className="ml-[32px] w-[281px] h-[77px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] border-DarkPink border-[1px] bg-white rounded-lg flex flex-col justify-center items-center">
                <div className="font-normal not-italic tracking-[0.15px]">
                  Salary
                </div>
                <div className="flex flex-row items-center  text-[24px] not-italic font-normal leading-normal">
                  <img
                    className="mr-[4px]"
                    src={DollarSign}
                    alt="dollar-sign"
                  />
                  <p>{jobDetail.salary_min}</p>
                  <p className="ml-1 mr-1">-</p>
                  <p>{jobDetail.salary_max}</p>
                </div>
              </div>
            </div>

            {/* Company Detail */}
            <div className="mt-[54px]">
              <h2 className="text-[24px] font-Montserrat text-DarkPink font-normal leading-normal">
                About Company
              </h2>
              <p className="w-[760px]">{jobDetail.about_company}</p>
            </div>
            <div className="mt-[16px]">
              <h2 className="text-[24px] font-Montserrat text-DarkPink font-normal leading-normal">
                About the job position
              </h2>
              <p className="w-[760px]">{jobDetail.about_job_position}</p>
            </div>
            <div className="mt-[16px]">
              <h2 className="text-[24px] font-Montserrat text-DarkPink font-normal leading-normal">
                Mandatory Requirements
              </h2>
              <p className="w-[760px]">{jobDetail.mandatory_requirement}</p>
            </div>
            <div className="mt-[16px]">
              <h2 className="text-[24px] font-Montserrat text-DarkPink font-normal leading-normal">
                Optional Requirements
              </h2>
              <p className="w-[760px]">{jobDetail.optional_requirement}</p>
            </div>

            {/* Apply Button */}
            <div className="flex flex-row justify-center items-center mt-[16px]">
              <button className="mt-[16px] hover:bg-LightPink active:bg-DarkPink pt-4 justify-center flex flex-row text-white font-[500px] tracking-[1.25px] leading-[24px] rounded-2xl w-[173px] h-[56px] bg-Pink uppercase">
                <img src={NavigateLine} alt="navigate-line" />
                <div className="ml-[4px]" onClick={handleJobApplication}>
                  Apply now
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetail;
