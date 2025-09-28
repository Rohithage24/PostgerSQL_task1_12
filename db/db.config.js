import {PrismaClient} from '@prisma/client';
import { Query } from 'mongoose';
const prisma =new PrismaClient({
    log:['query'] 
});

export default prisma