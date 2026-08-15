import Project from "../model/project.js"

// create project
export const createProject = async (userId,{
  name,
  description,
  framework,
  language,
 github,
  image,
  urlVideo = null,
}) => {
  return await Project.create({
   
    name,
    description,
    framework,
    language,
    userId,
    github,
    image,
    urlVideo,
  });
};

// update project
export const updateProject = async (
  projectId,
  userId,
  {
    name,
    description,
    framework,
    language,
    github,
    image,
    urlVideo,
  } = {}
) => {
  const updated = {};

  const fields = {
    name,
    description,
    github,
    image,
    urlVideo,
  };

  Object.keys(fields).forEach((key) => {
    if (fields[key] !== undefined) {
      updated[key] = fields[key];
    }
  });

  const updateQuery = {};

  if (Object.keys(updated).length > 0) {
    updateQuery.$set = updated;
  }

  if (
    framework !== undefined &&
    Array.isArray(framework) &&
    framework.length > 0
  ) {
    updateQuery.$addToSet = {
      ...updateQuery.$addToSet,
      framework: {
        $each: framework,
      },
    };
  }

  if (
    language !== undefined &&
    Array.isArray(language) &&
    language.length > 0
  ) {
    updateQuery.$addToSet = {
      ...updateQuery.$addToSet,
      language: {
        $each: language,
      },
    };
  }

  return await Project.findOneAndUpdate(
    {
      _id: projectId,
      userId: userId,
    },
    updateQuery,
    {
    returnDocument: "after",
    runValidators: true,
    }
  );
};

// remove from array language and framework 
export const removeFromProject = async (
  projectId,
  userId,
  {
    framework,
    language,
  } = {}
) => {
  const updateQuery = {};

  if (Array.isArray(framework) && framework.length > 0) {
    updateQuery.$pull = {
      ...updateQuery.$pull,
      framework: {
        $in: framework,
      },
    };
  }

  if (Array.isArray(language) && language.length > 0) {
    updateQuery.$pull = {
      ...updateQuery.$pull,
      language: {
        $in: language,
      },
    };
  }

  if (Object.keys(updateQuery).length === 0) {
    return await Project.findOne({
      _id: projectId,
      userId,
    });
  }

  return await Project.findOneAndUpdate(
    {
      _id: projectId,
      userId,
    },
    updateQuery,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
};

// get project by id
export const findProjectById=async(projectId)=>{
return await Project.findById(projectId).select("-_id");
}

// get all projects
export const findAllProjects = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [projects, totalProjects] = await Promise.all([
    Project.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Project.countDocuments(),
  ]);

  return {
    projects,
    pagination: {
      currentPage: page,
      limit,
      totalProjects,
      totalPages: Math.ceil(totalProjects / limit),
      hasNextPage: page < Math.ceil(totalProjects / limit),
      hasPreviousPage: page > 1,
    },
  };
};

// delete project by id
export const deleteProjectByIdAndUserId = async (projectId, userId) => {
  return await Project.findOneAndDelete({
    _id: projectId,
    userId: userId,
  });
};