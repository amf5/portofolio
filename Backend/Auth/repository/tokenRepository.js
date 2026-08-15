

import Token from "../model/token.js"


// get token by user Id
export const findTokenByUserId=async(userId)=>{
    return await Token.findOne({userId});

}
// delete token by userId
export const deleteTokenByUserId=async(userId)=>{
return await Token.findOneAndDelete({userId});
}
// create token
export const createToken=async(userId,refreshToken)=>{
    return await Token.create({userId,refreshToken});
}

// find token by refresh token 
export const findTokenbyRefreshToken=async(refreshToken)=>{
     return await Token.findOne({refreshToken});
}