# Contact List Challenge

## Vercel link
  [Vercel app](https://contact-list-challenge-lun4tricks-projects.vercel.app/)

  
## ENV variables
  
  I send the env vars to your HR reqruiter via email

## Description
The Contact List Challenge is a web application that allows users to add, edit, and delete contacts in a contact list. The app is built using modern web technologies and is designed to be fast, responsive, and easy to use.
Both DB is containing only me as a contact at the moment, but feel free to add your contacts, with the provided ones in the challenge, or with your own.

## Features
- Add new contacts
- Edit existing contacts
- Delete contacts
- Responsive design
- Toast notifications for user interactions

## Tech Stack
- **Next.js 14**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Prisma**: ORM for database management.
- **React Query**: Data-fetching library for React.
- **Amazon S3**: Storage service for storing assets.
- **react-hot-toast**: Library for displaying toast notifications.
- **Vercel**: Hosting platform for deploying the app.
- **Vercel SQL DB**: Database service used for the app.
- **SQLite**: Alternative database option (code snippet provided for switching).

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Lun4trick/contact-list-challenge.git

2. Navigate To the project dir:
   ```bash
   cd contact-list-challenge
  
3. install dependencies:
   ```bash
   npm install

4. Start the dev server:
   ```bash
   npm run dev

## Additional Info About DB

The app currently uses Vercel SQL DB due to the limitations of using SQLite with Vercel. However, you can switch to SQLite by following these steps:

1. Update your `prisma/schema.prisma` file:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   //rest of the code...

2. Generate the prisma client:
   ```bash
   npx prisma generate