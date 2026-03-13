import User from "../models/userModels.js";
import bcrypt from "bcrypt"
import createAccesstoken from "../libs/jtw.js"


export const register = async(req,res) => {
  
  try {
    const {usuario,email,password} = req.body;
    
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json({ message: ['El correo electrónico ya está en uso'] });

    const passwordHash = await bcrypt.hash(password, 10);
    
    const newuser = new User ({
      usuario,
      email,
      password: passwordHash
    });
    
    const userSave = await newuser.save();
    
    const token = await createAccesstoken({id: userSave._id});
    
    // Configurar cookie con opciones de seguridad
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 día
      path: '/'
    })
    
  
  res.json({
    id: userSave._id,
    email: userSave.email,
    usuario: userSave.usuario,
  })

  
} catch (error) {
  res.status(500).json({message: error.message})
  
}


};

export const login = async(req,res) => {
  const {email,password} = req.body;
  
  try {
    
    const userFound = await User.findOne({email});
    
    if(!userFound) return res.status(400).json({message:'User not found'});

    const isMatch = await bcrypt.compare(password, userFound.password);
        
    if(!isMatch) return res.status(401).json({message:'Invalid password'});
    
    const token = await createAccesstoken({id: userFound._id});
    
    // Configurar cookie con opciones de seguridad
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 día
      path: '/'
    })
    
    res.json({
      id: userFound._id,
      usuario: userFound.usuario,
      email: userFound.email,
    })
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/'
  });
  return res.json({message: 'Logged out successfully'})
};

export const profile = async(req,res) => {
  try {
    const userfound = await User.findById(req.user.id);
    
    if(!userfound) return res.status(404).json({message:'User not found'});
    
    return res.json({
      id: userfound._id,
      usuario: userfound.usuario,
      email: userfound.email,
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
