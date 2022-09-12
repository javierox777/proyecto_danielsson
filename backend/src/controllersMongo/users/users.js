import USERS from '../../modelMongo/users/users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const ctrls = {}


export const signup = async (req, res) => {
    const {
        name,
        lastName,
        email,
        password,
        address
    } = req.body
    const existUser = await USERS.findOne({email: email})
    if (existUser) {
        return(res.json({message: "error", body: "email is-already"}))
    }
    const newUser = new USERS({
        name,
        lastName,
        email,
        password,
        address
    })

    newUser.password = await bcrypt.hash(password, 10)
    await newUser.save()
    const token = jwt.sign({
        _id: newUser._id
    }, "secreta")
    res.json({message: "success", token: token, body: newUser})
}


export const allUsers = async (req, res) => {
    try {
         const data = await USERS.find() //.lean()
    res.json(data)
 
    } catch (error) {
        res.json(error)
    }}
  

export const signin = async (req, res) => {
    const {email, password} = req.body

    try {
        const existUser =await USERS.findOne({email: email})
        if (!existUser) {
            return(res.json({message: "usuario o password incorrecta"}))
        }
   
        const match = await bcrypt.compare(password, existUser.password )
        if (match) {
            const token = jwt.sign({
                _id: existUser._id
            }, "secreta")
            return(res.json({
                message: "bienvenido",
                token: token,
                ... existUser._doc
            }))
        }

        res.json({message: "id o password incorrectas"})
    } catch (error) {
        return(res.json(error))
    }


}
