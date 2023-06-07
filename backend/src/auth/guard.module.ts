import { Module } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from 'models';
import { AuthGuards } from './auth.guard';

@Module({
    imports: [SequelizeModule.forFeature([users])],
    controllers:[],
    providers:[
        {
            provide: APP_GUARD,
            useClass: AuthGuards
        },
        Reflector
    ],
})
export class GuardModule{}
