import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


// schema is like a blueprint for building a home---it defines what fields a user must have//
const userSchema = new Schema({
  username: {
    // must be text//
    type: String,
    // cannot be empty//
    required: true,
    // username must be unique//
    unique: true,
    // removes spaces at beginning and at the end//
    trim: true,
    
  },
  email: {

    type: String,
    required: true,
    unique: true,
    // email has to have normal email characters and structure//
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    // has to have atleast 5 characters long//
    minlength:5,
    required: function () {
      // password is only required if user does not have a githubId//
      return !this.githubId;
    },
  },
  githubId: {
    type: String, 
    // user has to have unique githubId//
    unique: true,
    // but multiple users can have no Github ID--null--allows many null values//
    sparse: true,
  }
});

// middle ware that has to run before a user is saved----it encrypts passwords before storing them//
//hash user password//
userSchema.pre("save", async function (next) {
  // only hash a password if it exists-- is newp-- or changed//
  if (this.password && (this.isNew || this.isModified("password"))) {
    const saltRounds = 10;
    // the hash scrambles the password so hackers can not read it//
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
// continue to saving the user//
  next();
});

// custom method to compare and validate password for logging in //
  userSchema.methods.isCorrectPassword = async function (password) {
    // if a user has a password, compare it with what they have entered/typed//
    // if they don't enter password--as in GitHub user---then return false//
    return this.password? bcrypt.compare(password, this.password): false;
  };

  // create the User model from the schema above//
  const User = mongoose.model("User", userSchema);

  export default User;

