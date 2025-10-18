#!/bin/bash

echo "Starting application setup..."

# Simple sleep to ensure DB is ready (PostgreSQL healthcheck should handle this)
sleep 5

# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Install Faker (required for Laravel 12 factories)
composer require fakerphp/faker --dev

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate --force

# Seed the database  
php artisan db:seed --force

# Cache configuration
php artisan config:cache
php artisan route:cache

echo "✅ Application setup completed!"
