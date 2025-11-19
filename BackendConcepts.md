### Iteration 8: Backend and Proxy Insights

1. **Understanding the Virtual Field in Backend**

   - In the file `backend/models/jobModel.js`, explain the purpose of the following code snippet:
     ```javascript
     jobSchema.set('toJSON', {
       virtuals: true,
       transform: (doc, ret) => {
         ret.id = ret._id
         return ret
       },
     })
     ```
     **Question:** What does this code accomplish? Why is it useful in your application?
     **Answer:** From what we see,It lets mongoose document to be converted to json .The transform function runs on the converted object. ret.id = ret.\_id creates a more frontend-friendly id field, avoiding direct use of \_id.

2. **CORS Middleware**

   - In `backend/app.js`, explain the role of this line:

     ```javascript
     app.use(cors())
     ```

     **Question:** What is CORS, and why is it necessary for the application to include this middleware?

     **Answer:** Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources. The frontend runs on a different port (3000) than the backend (4000).Without CORS enabled, the browser would block requests from the frontend to the backend.CORS itself doesn't prevent requests, it selectively allows requests It prevents any random website from using your authenticated cookies to send an API request to your bank's website and do stuff like secretly withdraw money.

3. **Proxy Configuration in Frontend**
   - In `frontend/vite.config.js`, describe the purpose of the following configuration:
     ```javascript
     proxy: {
       "/api": {
         target: "http://localhost:4000",
         changeOrigin: true,
       },
     },
     ```
     **Question:** How does this proxy setting work, and what problems does it solve in the development environment?
     **Answer:**
     Vite proxy config Redirect /api requests to backend.Simplifies frontend-backend communication in a local development environment.
     Any HTTP request from the frontend that starts with /api is automatically redirected (proxied) to http://localhost:4000.
     In Home.jsx
     `const response = await fetch('/api/jobs')`
     This fetch call uses a relative URL: /api/jobs.
     The frontend server (Vite) intercepts any request that starts with /api because of your proxy configuration:
     `proxy: {"/api": {target: "http://localhost:4000"changeOrigin: true,},},`Vite forwards the request to http://localhost:4000/api/jobs.The backend responds, and Home.jsx receives the job data as if it came from the frontend server itself.
