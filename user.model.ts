interface user {
  _id: String,
  name: String,
  email: String,
  profilePic: string,
  role: String,// 'student' | 'admin' | 'company' | 'college' | 'volunteer'
  // if student
  collageName: String,
  course: String,
  techStack: object, // []
  // if company
  website: String,
  overview: string,

  // collage
  location: string,
  description: string,
  password: String
}

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // ======================
    // Common Fields
    // ======================
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    profilePic: {
      type: String
    },

    roles: {
      type: [String],
      enum: [
        "student",
        "admin",
        "college",
        "company",
        "volunteer",
        "judge",
        "mentor",
        "sponsor",
        "alumni"
      ],
      required: true
    },

    isEmailVerified: {
      type: Boolean,
      default: false
    },

    // ======================
    // Student Profile
    // ======================
    studentProfile: {
      collegeType: {
        type: String,
        enum: ["registered", "external"]
      },

      collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // college user
      },

      collegeName: {
        type: String
      },

      course: String,

      techStack: [String],

      lookingForTeam: {
        type: Boolean,
        default: false
      }
    },

    // ======================
    // College Profile
    // ======================
    collegeProfile: {
      name: String,
      location: String,
      description: String,
      website: String,
      isVerified: {
        type: Boolean,
        default: false
      }
    },

    // ======================
    // Company / Sponsor Profile
    // ======================
    companyProfile: {
      companyName: String,
      website: String,
      overview: String,
      isVerified: {
        type: Boolean,
        default: false
      }
    },

    sponsorProfile: {
      organizationName: String,
      sponsorshipHistory: [
        {
          hackathonId: mongoose.Schema.Types.ObjectId,
          amount: Number
        }
      ]
    },

    // ======================
    // Volunteer / Mentor / Judge / Alumni
    // ======================
    volunteerProfile: {
      expertise: [String],
      available: Boolean
    },

    mentorProfile: {
      expertise: [String],
      availability: Boolean
    },

    judgeProfile: {
      expertise: [String],
      judgingHackathons: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Hackathon"
        }
      ]
    },

    alumniProfile: {
      collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      graduationYear: Number,
      currentCompany: String,
      willingToMentor: Boolean
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
