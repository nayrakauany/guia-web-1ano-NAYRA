#!/bin/bash

# Navigate to the Prisma directory
cd ../prisma

# Run the Prisma migrate command to apply migrations
npx prisma migrate deploy

# Optionally, you can run the seed script if you have one
# Uncomment the following line if you want to seed the database after migration
# npx prisma db seed

# Navigate back to the original directory
cd ../scripts

echo "Database migration completed successfully."