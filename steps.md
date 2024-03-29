## Steps

1. Create prisma models - DONE
2. Turn all the application to TS DONE
3. Create user.service using prisma to realize Crud and zod validations - DONE
4. Create task.service using prisma to realize Crud and zod validations - DONE
5. Create Api routes for user and task service in pages/api/ folder - DONE
6. Implement Next.Auth to authenticate the user - DONE
7. Create the auth.service.ts (on another branch) - DONE
8. Create a simple Signup and Login page - DONE
   8.5. Refactor the Next.Auth inspired in the rocketseat class (using signIn method and a custom form) - DONE
9. Create a simple create task page (simple task component) - DONE
   9.5 Refactor the code
10. Check the authorization of the user to create the tasks
11. Set the Get unique task api endpoint and Get all users tasks endpoint
12. Create the front-end pages styling with css and Mui.js
    12.5 Create the following task crud methods within the front end creation

- Login
- Signup
- Tasks dashboard view (crud and tasks list)
  - With filters
  - Crud
- Tasks kanban view (Optional)

13. Test all the user/task api endpoints

14. Adjust the jwt expire time
15. Decide if we're going to implement Prisma Adapter on the project or no
    15.5 If so, the prisma models will need to be adapted
16. Refactor the authorize function from [...nextAuth.ts]
