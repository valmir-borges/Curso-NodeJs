const multer = require('Multer')
const path = require('path')

//Destino para guardar as imagens
const imageStore = multer.diskStorage({//Método do Multer que salva as images
    destination: function (req,file,cb){
        let folder = ""//Onde será salvo, porém temos que saber se será salvo na pasta de usuários ou na pasta de Pets, por isso inicia vazia
        if(req.baseUrl.includes("users"))
        {
            folder = "users"
        }
        else if(req.baseUrl.includes("pets"))
        {
            folder = "pets"
        }
        cb(null, `public/images/${folder}`)//Local que será salvo
    },
    filename: function (req,file,cb){//Nome do arquivo
        cb(null, Date.now()+ String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
    }
})

const imageUpload = multer({//Salvando de fato a imagem
    storage: imageStore,//Passando as configurações
    fileFilter(req,file,cb){//Aplicando um filtro para que o sistema não aceite arquivos sem ser png ou jpg
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Por favor, envie somente arquivos png ou jpg!"))
        }
    cb(undefined, true)//Finalizando o cicblo
    }
})

module.exports = {imageUpload}