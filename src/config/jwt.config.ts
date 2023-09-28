import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
    refreshSecret: process.env.JWT_REFRESH,
    accessSecret: process.env.JWT_ACCESS,
}));
