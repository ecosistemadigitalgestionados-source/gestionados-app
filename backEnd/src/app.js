//preparamos y configuramos la API
//importamos lo que instalamos
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

//rutas
import formularioRuta from './rutas/formulario.routes.js'
import usuariosRuta from './rutas/usuarios.routes.js'
import authRuta from './rutas/auth.routes.js'


const app = express();

//middlewares
app.use(cors()); //le damos permiso a cualquier persona conectarse al backEnd
app.use(express.json()); //permite peticiones en formato json

//RUTAS
app.use('/api',formularioRuta);
app.use('/api',usuariosRuta);
app.use('/api',authRuta);


//RUTA DE prueba
app.get('/',(req,res)=>{
    res.json({mensaje:'BACK END GESTIONADOS FUNCIONANDO 🚀'})
})


export default app