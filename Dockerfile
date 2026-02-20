FROM php:8.2-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git \
    zip unzip \
    curl \
    libzip-dev \
    libonig-dev \
    libpng-dev \
    libpq-dev \
    cron \
    npm \
    nodejs \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN php artisan key:generate

RUN npm install && npm run prod

RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]