import app from './app'
import './database'

const main = ()=>{
    app.listen(app.get("port"))
    console.log("el servidor web esta en el puerto : ", app.get("port") )
}


main()