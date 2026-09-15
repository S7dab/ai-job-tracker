import Job from "../models/job.js";

// crating job api
const createJob = async (req, res) => {
  try {
    const {
      company,
      position,
      location,
      status,
      applicationDate,
      jobUrl,
      notes,
    } = req.body;

    // checking all field required
    if (
      !company ||
      !position ||
      !location ||
      !status ||
      !applicationDate ||
      !jobUrl
    ) {
      return res
        .status(400)
        .json({ status: false, message: "Required fields are missing" });
    }
    // creating job on mongo data base
    const job = await Job.create({
      company,
      position,
      location,
      status,
      applicationDate,
      jobUrl,
      notes,
      user: req.userId,
    });

    res
      .status(201)
      .json({ status: true, message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

// handling get all job of user
const getAllJobs = async (req, res) => {
  try {
    const allJobs = await Job.find({ user: req.userId });

    res.status(200).json({ status: true, message: "all jobs", allJobs });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

// handle get one job by id
const getOneJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({ _id: id, user: req.userId });

    if (!job) {
      return res.status(404).json({ status: false, message: "Job not found" });
    }

    res.status(200).json({ status: true, job });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
    console.log("error", error);
  }
};

// handling update jobs of user
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      company,
      position,
      location,
      status,
      applicationDate,
      jobUrl,
      notes,
    } = req.body;

    const job = await Job.findOne({ _id: id, user: req.userId });

    // checking is job exist or not
    if (!job) {
      return res.status(404).json({ status: false, message: "Job not found" });
    }

    job.company = company ?? job.company;
    job.position = position ?? job.position;
    job.location = location ?? job.location;
    job.status = status ?? job.status;
    job.applicationDate = applicationDate ?? job.applicationDate;
    job.jobUrl = jobUrl ?? job.jobUrl;
    job.notes = notes ?? job.notes;

    await job.save();

    res
      .status(200)
      .json({ status: true, message: "Job updated successfully", job });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

// handling delete job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({ _id: id, user: req.userId });

    if (!job) {
      return res.status(404).json({ status: false, message: "Job not found" });
    }

    await Job.findByIdAndDelete(id);

    res
      .status(200)
      .json({ status: true, message: "Job deleted successfully", job });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

export { createJob, getAllJobs, getOneJobById, updateJob, deleteJob };
