# InventAnalyticsCase
Case Interview for Invent Analytics 

- Workflow
	- I analyze the case and postman requests.
	- Come up with a database design and ER diagram by analyzing the requirements and given examples. 
	- After ER diagram and abstract design of my database is decided, I chose my technologies, methodologies. (Model First Development)
	- I have implemented my project on Bottom-Up Development. 
		- First decides which functionalities related with the Book and which are related with the User
		- Create repositories -> services -> controllers -> routers 
		- After implementing core functionalities, implement error handling middlewares and express-validators
	- Currently I am going to upload my case, but I will try to deploy my project for easier testing. 
-  **Database Design Constraints and Assumptions** 
	- Why did I choose to make the **id** field an auto-generated primary key in the **PastOwnership** table instead of defining `userId` and `bookId` as a composite key?
		- The reason is the possibility that a user might borrow the same book again at different times. For this reason, I did not set the **{userId, bookId}** pair as a composite primary key, as it would disrupt the structure of the table.
	- **pastOwnership** table is for **many-to-many** relationship between books and users to show the past owned books. It is automatically going to be stored in the conjunction table, it also stores additional information which is score value. Thus, additional table for this relation is required.
	- Accessing information about a book (e.g., its name and average rating) is expected to be a much more frequent operation compared to borrowing or returning a book. Since there is no need to store additional information about the currently owned books, I will handle this relationship as a one-to-many association by storing the `currentOwnerId` directly in the `Book` table. This approach is both feasible and efficient for a read-heavy system. By avoiding a junction table and additional join queries, this method improves performance and simplifies data retrieval.
- **DDL Files**
	- **Book Creation Script**
		CREATE TABLE IF NOT EXISTS public."Books"
		(
		    id integer NOT NULL DEFAULT nextval('"Books_id_seq"'::regclass),
		    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
		    score double precision NOT NULL DEFAULT '-1'::double precision,
		    "ownerCount" integer NOT NULL DEFAULT 0,
		    "currentOwnerId" integer,
		    "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
		    "updatedAt" timestamp with time zone NOT NULL DEFAULT now(),
		    CONSTRAINT "Books_pkey" PRIMARY KEY (id),
		    CONSTRAINT "Books_currentOwnerId_fkey" FOREIGN KEY ("currentOwnerId")
		        REFERENCES public."Users" (id) MATCH SIMPLE
		        ON UPDATE CASCADE
		        ON DELETE SET NULL
		)
		TABLESPACE pg_default;
		
		ALTER TABLE IF EXISTS public."Books"
		    OWNER to postgres;
	- **User Table Creation Script**
		CREATE TABLE IF NOT EXISTS public."Users"
		(
		    id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
		    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
		    "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
		    "updatedAt" timestamp with time zone NOT NULL DEFAULT now(),
		    CONSTRAINT "Users_pkey" PRIMARY KEY (id)
		)
		TABLESPACE pg_default;
		ALTER TABLE IF EXISTS public."Users"
		    OWNER to postgres;
	- **PastOwnership Table Creation Script**
		CREATE TABLE IF NOT EXISTS public."PastOwnerships"
		(
		    id integer NOT NULL DEFAULT nextval('"PastOwnerships_id_seq"'::regclass),
		    "userId" integer,
		    "bookId" integer,
		    "userScore" double precision NOT NULL,
		    "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
		    "updatedAt" timestamp with time zone NOT NULL DEFAULT now(),
		    CONSTRAINT "PastOwnerships_pkey" PRIMARY KEY (id),
		    CONSTRAINT "PastOwnerships_bookId_fkey" FOREIGN KEY ("bookId")
		        REFERENCES public."Books" (id) MATCH SIMPLE
		        ON UPDATE CASCADE
		        ON DELETE CASCADE,
		    CONSTRAINT "PastOwnerships_userId_fkey" FOREIGN KEY ("userId")
		        REFERENCES public."Users" (id) MATCH SIMPLE
		        ON UPDATE CASCADE
		        ON DELETE CASCADE
		)
		TABLESPACE pg_default;
		ALTER TABLE IF EXISTS public."PastOwnerships"
		    OWNER to postgres;

- Software Architecture and Preferences
	- Node Version **v20.13.1**
	- **Typescript** configuration is used for error handling and robustness.
	- **Express-validator** is used for validating the format of upcoming requests
	- **PostgreSQL** is chosen because it is open source and works well with Sequelize and Node.Js. 
	- **Sequelize** is chosen as a ORM after I have done my research about given ORM tools. I have experience on Spring Boot and Dotnet Entity Framework Core more than the NodeJs and ExpressJs. My all NodeJs experience is with the PrismaORM, which is a quite different than the given options in the case. Thus, I have conducted a preliminary research about ORMs after I designed my database and analyze my requirements. I decided to move with the Sequelize, although TypeORM can be a better suit in terms of model definitions with a Typescript, Sequelize has a lots of built-in functionalities that I need like **transaction scope, rollback etc.**  for error free and atomic database operation. 
	- **MVC Pattern** is chosen. Because it divides the application into distinct layers, each responsible for a specific concern.
		- **Models**: Handle data and business logic (e.g., Sequelize models for database interaction).
		- **Controllers**: Serve as the first layer to process incoming HTTP requests and decide which services to call.
		- **Routers**: Map routes to controllers, ensuring clear and organized URL handling.
		- **Services**: Encapsulate the core business logic, making it reusable and independent of HTTP requests.
		- **Repositories**: Abstract database operations to promote reusability and make switching databases easier.
	- **DTO Pattern** is chosen after I have analyze the given request bodies and responses. First thing I notice is that the difference of responses when they fetched as a list or a singular. Another big difference is the how past and present books are fetched although they are a same model in the database. Thus, I have decided to add an additional layer to my models, which I have reached my goal by using DTO pattern. Thanks to this pattern, I have full control on my responses and better error handling.