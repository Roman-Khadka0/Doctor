const User = require("../models/userData");
const UserDetails = require("../models/userDetails");

// Controller to get user details
const getUserDetails = async (req, res) => {
    try {
        // Fetch name and email from the User model
        const user = await User.findById(req.user.id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

      // Fetch user details from the UserDetails model
      try{
          const userDetails = await UserDetails.findOne({ userId: req.user.id });

          res.json({
            status: "ok",
            data: {
              name: user.name, // Include name from User model
              email: user.email, // Include email from User model
              profilePicture: user.profilePicture, // Include profile picture from User model
              phone: userDetails.phone,
              gender: userDetails.gender,
              dob: userDetails.dob,
              address: userDetails.address,
              bloodGroup: userDetails.bloodGroup,
            },
          });
      } catch (error) {
        res.json({
            status: "ok",
            data: {
              name: user.name, // Include name from User model
              email: user.email, // Include email from User model
              phone: "",
              gender: "",
              dob: "",
              address: "",
              bloodGroup: "",
            },
          });
        }
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: "Failed to fetch user details" });
    }
  };

// Controller to create or update user details
const saveUserDetails = async (req, res) => {
  // Include bloodGroup in the destructuring of req.body
  const { name, email, phone, gender, dob, address, bloodGroup } = req.body;
  const profilePicture = req.file ? req.file.path : undefined; // Get the uploaded file's URL from Cloudinary

  try {
    // Update the User model for name, email, and profile picture
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (profilePicture) user.profilePicture = profilePicture; // Save profile picture URL
    await user.save();

    // Update or create user details in the UserDetails model
    const existingDetails = await UserDetails.findOne({ userId: req.user.id });

    if (existingDetails) {
      existingDetails.phone = phone;
      existingDetails.gender = gender;
      existingDetails.dob = dob;
      existingDetails.address = address;
      existingDetails.bloodGroup = bloodGroup; // Save blood group
      if (profilePicture) existingDetails.profilePicture = profilePicture; // Save profile picture in UserDetails model
      await existingDetails.save();
      res.json({ status: "ok", message: "User details updated successfully", data: { profilePicture } });
    } else {
      const userDetails = new UserDetails({
        userId: req.user.id,
        phone,
        gender,
        dob,
        address,
        bloodGroup, // Save blood group
        profilePicture,
      });
      await userDetails.save();
      res.json({ status: "ok", message: "User details saved successfully", data: { profilePicture } });
    }
  } catch (error) {
    console.error("Error saving user details:", error);
    res.status(500).json({ error: "Failed to save user details" });
  }
};

module.exports = { getUserDetails, saveUserDetails };