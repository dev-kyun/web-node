import { IsString } from 'class-validator';
import { ControllerMethodSpec, ControllerSpec, DefaultPathProvider } from '../../util/specs';
import { OrganizationId, OrganizationModel } from '../index';

export class OrganizationResponse implements Pick<OrganizationModel, 'organizationId' | 'name'> {
  organizationId!: OrganizationId;
  name!: string;
}

export class CreateOrganizationRequestDto implements Pick<OrganizationModel, 'name'> {
  @IsString()
  name!: string;
}

export class UpdateOrganizationRequestDto implements Pick<OrganizationModel, 'name'> {
  @IsString()
  name!: string;
}

const OrganizationController = new ControllerSpec({
  path: '/organizations',
});

export const OrganizationHttpSpec = {
  controller: OrganizationController,

  findOrgnizationById: new ControllerMethodSpec({
    controllerSpec: OrganizationController,
    method: 'GET',
    path: '/:organizationId',
    pathProvider: class {
      constructor(readonly organizationId: OrganizationId) {}
    },
    responseBody: OrganizationResponse,
  }),

  createUser: new ControllerMethodSpec({
    controllerSpec: OrganizationController,
    method: 'POST',
    path: '/',
    pathProvider: DefaultPathProvider,
    requestBody: CreateOrganizationRequestDto,
    responseBody: OrganizationResponse,
  }),
};
