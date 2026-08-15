import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    skills: {
      type: [String],
      required: [true, "Please provide at least one skill"],
      set: (skills) => {
        if (!Array.isArray(skills)) return skills;
        return skills.map((skill) =>
          typeof skill === "string" ? skill.trim() : skill
        );
      },
      validate: {
        validator: (skills) => {
          if (!Array.isArray(skills)) return false;

          return skills.every(
            (skill) =>
              typeof skill === "string" &&
              skill.length >= 2
          );
        },
        message: "Each skill must be at least 2 characters",
      },
    },

    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: [500, "Bio cannot exceed 500 characters"],
      default: "",
    },

    job: {
      type: String,
      trim: true,
      maxlength: [100, "Job title cannot exceed 100 characters"],
      default: "",
    },

    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
      default: "",
    },

    linkedin: {
      type: String,
      trim: true,
      default: "",
      match: [
        /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
        "Please provide a valid LinkedIn URL",
      ],
    },

    github: {
      type: String,
      trim: true,
      default: "",
      match: [
        /^(https?:\/\/)?(www\.)?github\.com\/.*$/,
        "Please provide a valid GitHub URL",
      ],
    },

    facebook: {
      type: String,
      trim: true,
      default: "",
      match: [
        /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/,
        "Please provide a valid Facebook URL",
      ],
    },

    whatsapp: {
      type: String,
      trim: true,
      default: "",
      match: [
        /^\+?[1-9]\d{1,14}$/,
        "Please provide a valid WhatsApp number with country code",
      ],
    },

    x: {
      type: String,
      trim: true,
      default: "",
      match: [
        /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.*$/,
        "Please provide a valid X/Twitter URL",
      ],
    },

    cv: {
      type: String,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.__v;

  return user;
};

const User = mongoose.model("User", userSchema);

export default User;