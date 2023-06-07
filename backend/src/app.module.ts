import { MiddlewareConsumer, Module, NestModule, Global } from '@nestjs/common';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductcategoryController } from './productcategory/productcategory.controller';
import { ProductcategoryService } from './productcategory/productcategory.service';
import { ProductcategoryModule } from './productcategory/productcategory.module';
import { CustomerModule } from './customer/customer.module';
import { DtoProductcategoryModule } from './dto_productcategory/dto_productcategory.module';
import { DtoUserModule } from './dto_user/dto_user.module';
import { DtoProductModule } from './dto_product/dto_product.module';
import { DtoOrdersModule } from './dto_orders/dto_orders.module';
import { DtoAuthModule } from './dto_auth/dto_auth.module';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { CheckToken } from './token/token.middleware';
import { GuardModule } from './auth/guard.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { UserModule } from './user/user.module';

// @Global()
// @Module({
//   imports:[
//     DtoUserModule
//   ]
// })

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/gambar'),
    }),
    JwtModule.register({
      global: true,
    }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        models: [],
        autoLoadModels: true,
      }),
    }),
    ProductcategoryModule,
    CustomerModule,
    DtoProductcategoryModule,
    DtoUserModule,
    DtoProductModule,
    DtoOrdersModule,
    DtoAuthModule,
    GuardModule,
  ],
  controllers: [CustomerController, ProductcategoryController],
  providers: [CustomerService, ProductcategoryService, JwtService],
})
export class AppModule {}

//middleware

// export class AppModule implements NestModule{
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CheckToken)
//     .exclude('dto-auth/(.*)')
//     .forRoutes('*')
//   }
// }
