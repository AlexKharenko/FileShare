import { Module, Global } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { FolderModule } from './folder.module';
import { FileModule } from './file.module';
import { SearchModule } from './search.module';
import { DbModule } from './db.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule,
    FolderModule,
    FileModule,
    SearchModule,
    DbModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AppModule {}
