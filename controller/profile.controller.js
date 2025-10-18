import { connectToCatApi } from "../services/catApi.js";

export const Profile = async (req, res) => {
  const USER_DATA = {
    email: "ibrahimabdulquadri446@gmail.com",
    name: "Ibrahim Abdulquadri Abiodun",
    stack: "Node.js/Express",
  };
  try {
    const catFact = await connectToCatApi();
    res.status(200).json({
      status: "success",
      user: USER_DATA,
      timestamp: new Date().toISOString(),
      fact: catFact,
    });
  } catch (error) {
    res.status(503).json({
      status: "failed",
      message: "Cannot connect to Cat API service.",
    });
  }
};
