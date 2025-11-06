#!/bin/bash

# This script seeds the database with initial data.

# Load environment variables
source .env

# Run the Prisma seeding command
npx prisma db seed --preview-feature

echo "Database seeded successfully!"