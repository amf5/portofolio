import User from "../model/User.js"
import "dotenv/config.js"
// find user by id
export const findUserById=async(userId)=>{
    return await User.findById(userId);
}
// find user by id
export const findUser=async(userId)=>{
    return await User.findById(userId).select('+password');
}
// create user 
export const createUser=async(name,email, password)=>{
    return await User.create({name,email,password});

}
// update user
export const updateUser = async (
  userId,
  {
    cv,
    job,
    bio,
    location,
    linkedin,
    whatsapp,
    image,
    facebook,
    x,
    name,
    github,
    skills,
  } = {}
) => {
  const updated = {};

  const fields = {
    job,
    bio,
    location,
    linkedin,
    whatsapp,
    facebook,
    cv,
    x,
    image,
    name,
    github,
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

  // Add new skills to existing array without duplicates
  if (skills !== undefined && Array.isArray(skills) && skills.length > 0) {
    updateQuery.$addToSet = {
      skills: {
        $each: skills,
      },
    };
  }

  return await User.findByIdAndUpdate(
    userId,
    updateQuery,
    {
      new: true,
      runValidators: true,
    }
  );
};
export const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select('+password');
};

//find user protofolio
export const findUserProtofoli=async()=>{
  const createdAt = new Date(process.env.CREATED_AT);
  return await User.findOne({ createdAt }).select("-_id -createdAt -updatedAt");

}

// Remove skills from user
export const removeUserSkills = async (userId, skills = []) => {
  if (!Array.isArray(skills) || skills.length === 0) {
    return await User.findById(userId);
  }

  return await User.findOneAndUpdate(
    { _id: userId },
    {
      $pull: {
        skills: {
          $in: skills,
        },
      },
    },
    {
      returnDocument: "after",
      runValidators: false,
    }
  );
};