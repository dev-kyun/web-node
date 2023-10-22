import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationAndUserAndOrganizationRole } from 'src/db/entity/organization-and-user-and-organization-role.entity';
import { Organization } from 'src/db/entity/organization.entity';
import { User } from 'src/db/entity/user.entity';
import { UserModule } from '../user/user.module';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, User, OrganizationAndUserAndOrganizationRole]), forwardRef(() => UserModule)],
  exports: [OrganizationService],
  providers: [OrganizationService],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
