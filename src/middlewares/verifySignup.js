import Role from "../models/Role";
import User from "../models/User";

export const checkDuplicateUsernameEmail = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ message: "The user already exist" });

  const email = await User.findOne({ email: req.body.email });
  if (email)
    return res.status(400).json({ message: "The email already exist" });

  next();
};

export const checkRolesExisted = async (req, res, next) => {
  const roles = await Role.find({ name: { $in: req.body.roles } });
  const role = roles.map((role) => {
    return role.name;
  });

  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!role.includes(req.body.roles[i])) {
        console.log(req.body.roles[i]);
        return res
          .status(400)
          .json({ message: `Role ${req.body.roles[i]} does not exists` });
      }
    }
  }
  next();
};
