import { Request, Response } from "express";
import { clerkClient } from "../index";

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void>  => {
  const { userId } = req.params;
  const userData = req.body;
  console.log(userData)
  try{
    const user = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        userType: userData.publicMetadata.userType,
        settings: userData.publicMetadata.settings
      },
    })
    res.json({message: "User Updated Successfully", data: user});
  }catch(error){
    console.log(error);
    res.status(500).json({message: "Error Updating User", error})
  }
}
