# DevOps Dashboard - Frontend App

Este es el repositorio correspondiente al **Frontend** del proyecto. La aplicación está construida usando **Vite + React** y está diseñada para levantarse mediante un único contenedor de Docker de forma rápida y sencilla.

---

## ⚡ Cómo Levantar la Aplicación

Para levantar y compilar la aplicación, abre tu terminal en la raíz del proyecto y ejecuta el siguiente comando:

```bash
docker compose up --build
```

Una vez que termine de compilar e iniciar, podrás acceder a la aplicación desde tu navegador:

* **URL local:** `http://localhost:3000`

---

## ⚙️ Conectividad con el Backend

Por defecto, la aplicación intentará conectarse a la API del backend en `http://localhost:5000`. 

Si necesitas cambiar esta dirección (por ejemplo, para apuntar a un servicio remoto o puerto diferente), edita la variable de entorno `VITE_API_URL` dentro del archivo [docker-compose.yml](file:///C:/Users/anton/OneDrive/Escritorio/Taller%20DevOps/frontend-devops/docker-compose.yml):

```yaml
    environment:
      - VITE_API_URL=http://tu-direccion-backend:puerto
```

---

## 📁 Archivos Clave de Infraestructura

* [Dockerfile](file:///C:/Users/anton/OneDrive/Escritorio/Taller%20DevOps/frontend-devops/Dockerfile): Configuración del contenedor Node.js para servir la página.
* [docker-compose.yml](file:///C:/Users/anton/OneDrive/Escritorio/Taller%20DevOps/frontend-devops/docker-compose.yml): Orquestador del contenedor del frontend y su red local (`app-network`).
* [simplificacion_infraestructura.md](file:///C:/Users/anton/OneDrive/Escritorio/Taller%20DevOps/frontend-devops/simplificacion_infraestructura.md): Guía de referencia para aplicar la misma simplificación de contenedores al Backend.
