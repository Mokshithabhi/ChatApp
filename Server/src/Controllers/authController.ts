import { LoginService, signupService } from "../Services/authService";
import { Request, Response } from "express";



export const login = async (req: Request, res: Response):Promise<void> => {
  try {

    const response = await LoginService(req.body,res)
    console.log(response)
    
     res.status(200).json(response)

  } catch (error) {
    const err = error as Error;
    console.log("Error in login controller", err.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    }) ;
  }
};

export const signup = async (req: Request, res: Response):Promise<void> => {
  try {
    const signupResponse = await signupService(req.body,res)

      res.status(200).json(signupResponse)
    // https://avatar-placeholder.iran.liara.run/

  } catch (error) {
    const err = error as Error;
    console.log("Error in signup controller", err.message);
    res.status(500).json({
      error: "Internal Server Error",
      message:err.message,
    });
  }
};

export const logout = (req: Request, res: Response) => {
  try{

     res.cookie("jwt","",{maxAge:0})
	 res.status(200).json('successfully logout')
  }
  catch (error) {
    console.log("Error in login controller", (error as Error).message);
    res.status(500).json({
      error: "Internal Server Error",
      message: (error as Error).message,
    });
  }
};
