# Reto Técnico Backend 💻
Gestión productos bancarios.


---

### Requerimientos ⚙️
- Docker


---

### Instalación  🚀

- Clonar repositorio
  ```sh
      git clone https://github.com/CristianAlba75/TestBCS.git
  ```
- Ubicarse en la raíz del proyecto y ejecutar el siguiente comando para la creación de contenedores **backend**, **frontend** y **base de datos Mongo**.
  ```sh
      docker compose up --build -d
  ```
- Instalar requerimientos del proyecto.
  ```sh
      npm install
  ```
- Para conectarse a la base de datos se puede utilizar MongoDB Compass con los siguientes datos:
   ```sh
      mongodb://mongo:27017/nestjs-app
   ```
---
### Pruebas Unitarias 💣

Para ejecutar las pruebas unitarias ejecutar (debe estar ubicado el directorio backend o frontend respectivamente):

   ```sh
       jest
   ```
---